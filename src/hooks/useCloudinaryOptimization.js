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
        quality = 40,
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
      
      const breakpoints = [
        { width: Math.round(baseWidth * 0.5), descriptor: `${Math.round(baseWidth * 0.5)}w` },
        { width: baseWidth, descriptor: `${baseWidth}w` },
        { width: Math.round(baseWidth * 1.5), descriptor: `${Math.round(baseWidth * 1.5)}w` },
        { width: Math.round(baseWidth * 2), descriptor: `${Math.round(baseWidth * 2)}w` }
      ].filter(bp => bp.width <= 2048);

      return breakpoints
        .map(bp => `${optimizeCloudinaryUrl(url, { width: bp.width })} ${bp.descriptor}`)
        .join(', ');
    };
  }, [optimizeCloudinaryUrl]);

  return {
    optimizeCloudinaryUrl,
    generateResponsiveSrcSet
  };
};