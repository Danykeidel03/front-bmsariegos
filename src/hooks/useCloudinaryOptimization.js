import { useMemo } from 'react';

export const useCloudinaryOptimization = () => {
  const optimizeCloudinaryUrl = useMemo(() => {
    return (url, options = {}) => {
      if (!url || !url.includes('res.cloudinary.com')) {
        return url;
      }

      const {
        width = 800,
        height,
        quality = 'auto',
        format = 'auto',
        crop = 'limit',
        dpr = 'auto'
      } = options;

      const parts = url.split('/upload/');
      if (parts.length !== 2) return url;

      let transformations = [
        `f_${format}`,
        `q_${quality}`,
        `w_${width}`,
        `dpr_${dpr}`,
        `c_${crop}`
      ];

      if (height) {
        transformations.push(`h_${height}`);
      }

      return `${parts[0]}/upload/${transformations.join(',')}/${parts[1]}`;
    };
  }, []);

  const generateResponsiveSrcSet = useMemo(() => {
    return (url, baseWidth) => {
      if (!url || !baseWidth) return '';
      
      const mobile = Math.min(baseWidth, 480);
      const tablet = Math.min(baseWidth, 768);
      const desktop = baseWidth;
      const retina = Math.min(baseWidth * 2, 2048);
      
      const breakpoints = [mobile, tablet, desktop, retina]
        .filter((w, i, arr) => arr.indexOf(w) === i)
        .map(w => ({ width: w, descriptor: `${w}w` }));

      return breakpoints
        .map(bp => `${optimizeCloudinaryUrl(url, { width: bp.width, quality: bp.width <= 480 ? '65' : 'auto' })} ${bp.descriptor}`)
        .join(', ');
    };
  }, [optimizeCloudinaryUrl]);

  return {
    optimizeCloudinaryUrl,
    generateResponsiveSrcSet
  };
};