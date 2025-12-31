/**
 * Vite plugin to load non-critical CSS asynchronously
 * Prevents render-blocking CSS and improves LCP
 */

export function asyncCSSPlugin() {
  return {
    name: 'vite-plugin-async-css',
    enforce: 'post',
    
    transformIndexHtml(html, { bundle }) {
      if (!bundle) return html;
      
      // Find CSS files
      const cssFiles = Object.keys(bundle).filter(
        fileName => fileName.endsWith('.css')
      );
      
      // Critical CSS patterns - should be loaded synchronously
      const criticalPatterns = [
        'critical',
        'index-', // Main app CSS
      ];
      
      const isCritical = (fileName) => {
        return criticalPatterns.some(pattern => fileName.includes(pattern));
      };
      
      // Separate critical and non-critical CSS
      const criticalCSS = cssFiles.filter(isCritical);
      const nonCriticalCSS = cssFiles.filter(f => !isCritical(f));
      
      // Generate preload + async load for non-critical CSS
      const asyncCSSLinks = nonCriticalCSS.map(fileName => {
        return `<link rel="preload" href="/assets/${fileName}" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/assets/${fileName}"></noscript>`;
      }).join('\n');
      
      // Add async CSS loading script
      const asyncLoadScript = `
<script>
  (function() {
    var links = document.querySelectorAll('link[rel="preload"][as="style"]');
    links.forEach(function(link) {
      link.addEventListener('load', function() {
        this.rel = 'stylesheet';
      });
    });
  })();
</script>`;
      
      // Insert before </head>
      html = html.replace('</head>', `${asyncCSSLinks}\n${asyncLoadScript}\n</head>`);
      
      return html;
    }
  };
}
