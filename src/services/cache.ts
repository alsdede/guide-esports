// Cache service for better performance and reduced API calls
export interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  key?: string;
}

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class CacheService {
  private cache = new Map<string, CacheEntry<unknown>>();
  private defaultTTL = 5 * 60 * 1000; // 5 minutes

  set<T>(key: string, data: T, ttl?: number): void {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL,
    };
    
    this.cache.set(key, entry);
    console.log(`📦 Cache SET: ${key} (TTL: ${entry.ttl}ms)`);
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key) as CacheEntry<T> | undefined;
    
    if (!entry) {
      console.log(`❌ Cache MISS: ${key}`);
      return null;
    }

    const isExpired = Date.now() - entry.timestamp > entry.ttl;
    
    if (isExpired) {
      this.cache.delete(key);
      console.log(`⏰ Cache EXPIRED: ${key}`);
      return null;
    }

    console.log(`✅ Cache HIT: ${key}`);
    return entry.data;
  }

  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;
    
    const isExpired = Date.now() - entry.timestamp > entry.ttl;
    if (isExpired) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }

  delete(key: string): boolean {
    const deleted = this.cache.delete(key);
    if (deleted) {
      console.log(`🗑️ Cache DELETE: ${key}`);
    }
    return deleted;
  }

  clear(): void {
    this.cache.clear();
    console.log('🧹 Cache CLEARED');
  }

  // Clean expired entries
  cleanup(): void {
    const now = Date.now();
    let cleaned = 0;
    
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key);
        cleaned++;
      }
    }
    
    if (cleaned > 0) {
      console.log(`🧹 Cache CLEANUP: ${cleaned} expired entries removed`);
    }
  }

  // Get cache statistics
  getStats() {
    const now = Date.now();
    let expired = 0;
    let active = 0;
    
    for (const entry of this.cache.values()) {
      if (now - entry.timestamp > entry.ttl) {
        expired++;
      } else {
        active++;
      }
    }
    
    return {
      total: this.cache.size,
      active,
      expired,
    };
  }

  // Auto-cleanup interval
  startAutoCleanup(intervalMs: number = 60000): () => void {
    const interval = setInterval(() => {
      this.cleanup();
    }, intervalMs);
    
    return () => clearInterval(interval);
  }
}

// Utility function to create cache keys
export function createCacheKey(...parts: (string | number | boolean)[]): string {
  return parts.map(part => String(part)).join(':');
}

// Cache decorator for async functions
export function cached<T extends unknown[], R>(
  fn: (...args: T) => Promise<R>,
  cacheKeyFn: (...args: T) => string,
  ttl?: number
): (...args: T) => Promise<R> {
  return async (...args: T): Promise<R> => {
    const key = cacheKeyFn(...args);
    
    // Try to get from cache first
    const cached = cacheService.get<R>(key);
    if (cached !== null) {
      return cached;
    }
    
    // Execute function and cache result
    const result = await fn(...args);
    cacheService.set(key, result, ttl);
    
    return result;
  };
}

export const cacheService = new CacheService();

// Start auto-cleanup on import
cacheService.startAutoCleanup();

export default CacheService;
