/**
 * Utilities for prefetching and preloading resources
 * Improves perceived performance by loading resources ahead of time
 */

/**
 * Prefetch a route/component before navigation
 * @param {Function} importFn - Dynamic import function
 */
export const prefetchComponent = (importFn) => {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    requestIdleCallback(() => importFn());
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(() => importFn(), 1);
  }
};

/**
 * Prefetch multiple routes/components
 * @param {Array<Function>} importFns - Array of dynamic import functions
 */
export const prefetchComponents = (importFns) => {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    requestIdleCallback(() => {
      importFns.forEach(fn => fn());
    });
  } else {
    setTimeout(() => {
      importFns.forEach(fn => fn());
    }, 1);
  }
};

/**
 * Hook to prefetch routes on hover/focus
 * @param {Function} importFn - Dynamic import function
 */
export const usePrefetchOnInteraction = (importFn) => {
  const handleInteraction = () => {
    prefetchComponent(importFn);
  };

  return {
    onMouseEnter: handleInteraction,
    onFocus: handleInteraction
  };
};

/**
 * Prefetch data from API endpoint
 * @param {string} url - API endpoint URL
 * @param {Object} options - Fetch options
 */
export const prefetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
    
    if (response.ok) {
      // Cache the response in memory or use Cache API
      const data = await response.json();
      return data;
    }
  } catch (error) {
    // Silent fail for prefetching
    console.debug('Prefetch failed:', error);
  }
};

/**
 * Observer-based prefetching for components
 * Prefetches when component enters viewport
 */
export class PrefetchObserver {
  constructor() {
    this.observer = null;
    this.targets = new Map();
    
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const importFn = this.targets.get(entry.target);
              if (importFn) {
                prefetchComponent(importFn);
                this.observer?.unobserve(entry.target);
                this.targets.delete(entry.target);
              }
            }
          });
        },
        {
          rootMargin: '50px' // Start prefetching 50px before entering viewport
        }
      );
    }
  }

  observe(element, importFn) {
    if (this.observer && element) {
      this.targets.set(element, importFn);
      this.observer.observe(element);
    }
  }

  disconnect() {
    if (this.observer) {
      this.observer.disconnect();
      this.targets.clear();
    }
  }
}

/**
 * Preload critical resources
 */
export const preloadCriticalResources = () => {
  if (typeof window !== 'undefined') {
    // Preconnect to API domain
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = 'https://back-bmsariegos-production.up.railway.app';
    document.head.appendChild(preconnect);
    
    // DNS prefetch for Cloudinary
    const dnsPrefetch = document.createElement('link');
    dnsPrefetch.rel = 'dns-prefetch';
    dnsPrefetch.href = '//res.cloudinary.com';
    document.head.appendChild(dnsPrefetch);
  }
};

/**
 * Initialize smart prefetching based on connection
 */
export const initSmartPrefetch = () => {
  if (typeof window === 'undefined') return;
  
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  
  // Only prefetch on fast connections
  if (connection) {
    const effectiveType = connection.effectiveType;
    const saveData = connection.saveData;
    
    // Don't prefetch on slow connections or when data saver is on
    if (saveData || effectiveType === 'slow-2g' || effectiveType === '2g') {
      return false;
    }
  }
  
  return true;
};

/**
 * Warmup cache for common routes
 */
export const warmupCache = () => {
  if (!initSmartPrefetch()) return;
  
  // Wait for page to be fully loaded
  if (document.readyState === 'complete') {
    prefetchCommonRoutes();
  } else {
    window.addEventListener('load', prefetchCommonRoutes);
  }
};

const prefetchCommonRoutes = () => {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    requestIdleCallback(() => {
      // Prefetch common routes
      import('../pages/Teams/Teams');
      import('../pages/News/News');
      import('../pages/Matches/Matches');
    }, { timeout: 2000 });
  }
};
