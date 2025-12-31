/**
 * Utility to lazy load CSS files on demand
 * Reduces initial bundle size by loading CSS only when needed
 */

const loadedStyles = new Set();

/**
 * Loads a CSS file asynchronously
 * @param {string} href - The path to the CSS file
 * @param {string} id - Unique identifier for the stylesheet
 * @returns {Promise} - Resolves when the stylesheet is loaded
 */
export const loadCSS = (href, id) => {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if (loadedStyles.has(id)) {
      resolve();
      return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.id = id;
    
    link.onload = () => {
      loadedStyles.add(id);
      resolve();
    };
    
    link.onerror = () => {
      reject(new Error(`Failed to load CSS: ${href}`));
    };
    
    document.head.appendChild(link);
  });
};

/**
 * Preloads a CSS file with low priority
 * @param {string} href - The path to the CSS file
 */
export const preloadCSS = (href) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'style';
  link.href = href;
  link.onload = function() {
    this.rel = 'stylesheet';
  };
  document.head.appendChild(link);
};

/**
 * Loads CSS with media attribute for async loading
 * @param {string} href - The path to the CSS file
 */
export const loadCSSAsync = (href) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.media = 'print'; // Load with low priority
  link.onload = function() {
    this.media = 'all'; // Apply styles after load
  };
  document.head.appendChild(link);
};
