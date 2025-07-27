// Base HTTP client using native fetch
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  status: number;
  success: boolean;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: Record<string, unknown>;
}

export interface FetchOptions extends RequestInit {
  timeout?: number;
  retries?: number;
  cache?: 'default' | 'no-cache' | 'reload' | 'force-cache' | 'only-if-cached';
}

class HttpClient {
  private baseURL: string;
  private defaultOptions: FetchOptions;

  constructor(baseURL: string = '', options: FetchOptions = {}) {
    this.baseURL = baseURL;
    this.defaultOptions = {
      timeout: 10000,
      retries: 3,
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };
  }

  private async fetchWithTimeout(
    url: string,
    options: FetchOptions = {}
  ): Promise<Response> {
    const { timeout = this.defaultOptions.timeout, ...fetchOptions } = options;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...this.defaultOptions,
        ...fetchOptions,
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  private async fetchWithRetry(
    url: string,
    options: FetchOptions = {}
  ): Promise<Response> {
    const { retries = this.defaultOptions.retries, ...fetchOptions } = options;
    
    let lastError: Error;

    for (let attempt = 0; attempt <= retries!; attempt++) {
      try {
        const response = await this.fetchWithTimeout(url, fetchOptions);
        
        if (response.ok) {
          return response;
        }
        
        // Don't retry on client errors (4xx)
        if (response.status >= 400 && response.status < 500) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        lastError = new Error(`HTTP ${response.status}: ${response.statusText}`);
      } catch (error) {
        lastError = error as Error;
        
        // Don't retry on certain errors
        if (error instanceof TypeError || (error as Error).name === 'AbortError') {
          throw error;
        }
      }

      // Wait before retry (exponential backoff)
      if (attempt < retries!) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }

    throw lastError!;
  }

  private handleError(error: unknown, url: string): ApiError {
    if (error instanceof TypeError) {
      return {
        message: 'Network error - check your internet connection',
        code: 'NETWORK_ERROR',
        details: { url, originalError: error.message },
      };
    }

    if ((error as Error).name === 'AbortError') {
      return {
        message: 'Request timeout',
        code: 'TIMEOUT_ERROR',
        details: { url },
      };
    }

    if (error instanceof Error) {
      const match = error.message.match(/HTTP (\d+):/);
      const status = match ? parseInt(match[1]) : undefined;
      
      return {
        message: error.message,
        status,
        code: status ? `HTTP_${status}` : 'UNKNOWN_ERROR',
        details: { url },
      };
    }

    return {
      message: 'Unknown error occurred',
      code: 'UNKNOWN_ERROR',
      details: { url, error },
    };
  }

  private async request<T>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<ApiResponse<T>> {
    const url = this.baseURL ? `${this.baseURL}${endpoint}` : endpoint;
    
    try {
      console.log(`🚀 ${options.method || 'GET'} ${url}`);
      const startTime = Date.now();
      
      const response = await this.fetchWithRetry(url, options);
      const duration = Date.now() - startTime;
      
      let data: T;
      const contentType = response.headers.get('content-type');
      
      if (contentType?.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text() as unknown as T;
      }

      console.log(`✅ ${options.method || 'GET'} ${url} - ${response.status} (${duration}ms)`);
      
      return {
        data,
        status: response.status,
        success: true,
        message: response.statusText,
      };
    } catch (error) {
      const duration = Date.now() - Date.now();
      console.error(`❌ ${options.method || 'GET'} ${url} (${duration}ms)`, error);
      
      throw this.handleError(error, url);
    }
  }

  // HTTP Methods
  async get<T = unknown>(endpoint: string, options: FetchOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T = unknown>(
    endpoint: string, 
    body?: unknown, 
    options: FetchOptions = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async put<T = unknown>(
    endpoint: string, 
    body?: unknown, 
    options: FetchOptions = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async delete<T = unknown>(endpoint: string, options: FetchOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  async patch<T = unknown>(
    endpoint: string, 
    body?: unknown, 
    options: FetchOptions = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
  }
}

// Create specialized clients for different APIs
export const dataDragonClient = new HttpClient('https://ddragon.leagueoflegends.com');

export const lolesportsApiClient = new HttpClient('https://esports-api.lolesports.com/persisted/gw', {
  headers: {
    'x-api-key': '0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z',
  },
});

export const feedClient = new HttpClient('https://feed.lolesports.com/livestats/v1');

// Internal API client (for Next.js API routes)
export const internalApiClient = new HttpClient('/api');

export default HttpClient;
