// Authentication service
import { internalApiClient } from './http-client';
import { cacheService } from './cache';

export interface User {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  balance: number;
  verified: boolean;
  createdAt: string;
  preferences: {
    language: 'pt' | 'en';
    currency: string;
    notifications: boolean;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  acceptTerms: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordReset {
  token: string;
  newPassword: string;
}

class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly USER_KEY = 'user_data';

  // Login
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await internalApiClient.post<AuthResponse>('/auth/login', credentials);
    
    // Store tokens and user data
    this.storeAuthData(response.data);
    
    return response.data;
  }

  // Register
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await internalApiClient.post<AuthResponse>('/auth/register', data);
    
    // Store tokens and user data
    this.storeAuthData(response.data);
    
    return response.data;
  }

  // Logout
  async logout(): Promise<void> {
    try {
      // Call server logout if token exists
      const token = this.getToken();
      if (token) {
        await internalApiClient.post('/auth/logout');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local data
      this.clearAuthData();
    }
  }

  // Refresh token
  async refreshToken(): Promise<AuthResponse | null> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return null;
    }

    try {
      const response = await internalApiClient.post<AuthResponse>('/auth/refresh', {
        refreshToken,
      });
      
      this.storeAuthData(response.data);
      return response.data;
    } catch (error) {
      console.error('Token refresh failed:', error);
      this.clearAuthData();
      return null;
    }
  }

  // Get current user
  async getCurrentUser(): Promise<User | null> {
    // Try to get from cache first
    const cachedUser = this.getUserFromStorage();
    if (cachedUser) {
      return cachedUser;
    }

    // Fetch from server if no cache
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      const response = await internalApiClient.get<User>('/auth/me');
      this.storeUser(response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch current user:', error);
      return null;
    }
  }

  // Update user profile
  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await internalApiClient.patch<User>('/auth/profile', data);
    
    // Update cached user data
    this.storeUser(response.data);
    
    return response.data;
  }

  // Change password
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await internalApiClient.post('/auth/change-password', {
      currentPassword,
      newPassword,
    });
  }

  // Request password reset
  async requestPasswordReset(data: PasswordResetRequest): Promise<void> {
    await internalApiClient.post('/auth/forgot-password', data);
  }

  // Reset password with token
  async resetPassword(data: PasswordReset): Promise<void> {
    await internalApiClient.post('/auth/reset-password', data);
  }

  // Email verification
  async verifyEmail(token: string): Promise<void> {
    await internalApiClient.post('/auth/verify-email', { token });
    
    // Refresh user data
    const user = await this.getCurrentUser();
    if (user) {
      this.storeUser(user);
    }
  }

  // Resend verification email
  async resendVerificationEmail(): Promise<void> {
    await internalApiClient.post('/auth/resend-verification');
  }

  // Token management
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUserFromStorage(): User | null {
    if (typeof window === 'undefined') return null;
    
    const userData = localStorage.getItem(this.USER_KEY);
    if (!userData) return null;
    
    try {
      return JSON.parse(userData);
    } catch {
      return null;
    }
  }

  private storeAuthData(authData: AuthResponse): void {
    if (typeof window === 'undefined') return;

    localStorage.setItem(this.TOKEN_KEY, authData.token);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, authData.refreshToken);
    this.storeUser(authData.user);
    
    // Clear any cached data that might be user-specific
    cacheService.clear();
  }

  private storeUser(user: User): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  private clearAuthData(): void {
    if (typeof window === 'undefined') return;

    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    
    // Clear all cached data
    cacheService.clear();
  }

  // Check if token is expired (basic check)
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      // Decode JWT token (basic implementation)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp * 1000; // Convert to milliseconds
      return Date.now() >= expiry;
    } catch {
      // If we can't decode, assume it's expired
      return true;
    }
  }

  // Auto-refresh token if needed
  async ensureValidToken(): Promise<boolean> {
    if (!this.isAuthenticated()) {
      return false;
    }

    if (this.isTokenExpired()) {
      const refreshed = await this.refreshToken();
      return !!refreshed;
    }

    return true;
  }

  // Two-factor authentication
  async enableTwoFactor(): Promise<{ qrCode: string; secret: string }> {
    const response = await internalApiClient.post<{ qrCode: string; secret: string }>('/auth/2fa/enable');
    return response.data;
  }

  async confirmTwoFactor(token: string, secret: string): Promise<{ backupCodes: string[] }> {
    const response = await internalApiClient.post<{ backupCodes: string[] }>('/auth/2fa/confirm', {
      token,
      secret,
    });
    return response.data;
  }

  async disableTwoFactor(token: string): Promise<void> {
    await internalApiClient.post('/auth/2fa/disable', { token });
  }

  async verifyTwoFactor(token: string): Promise<AuthResponse> {
    const response = await internalApiClient.post<AuthResponse>('/auth/2fa/verify', { token });
    this.storeAuthData(response.data);
    return response.data;
  }
}

export const authService = new AuthService();
export default AuthService;
