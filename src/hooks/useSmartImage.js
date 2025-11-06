import { useMemo } from 'react';

export const useSmartImage = (src) => {
  const imageType = useMemo(() => {
    if (!src) return 'none';
    
    if (src.includes('res.cloudinary.com')) {
      return 'cloudinary';
    }
    
    if (src.startsWith('http') || src.startsWith('//')) {
      return 'external';
    }
    
    return 'local';
  }, [src]);

  const getOptimalComponent = () => {
    switch (imageType) {
      case 'cloudinary':
        return 'CloudinaryImage';
      case 'local':
        return 'LocalOptimizedImage';
      case 'external':
        return 'OptimizedImage';
      default:
        return null;
    }
  };

  const getOptimalProps = (baseProps) => {
    const { width, height, quality = 75, ...rest } = baseProps;
    
    switch (imageType) {
      case 'cloudinary':
        return {
          ...rest,
          width,
          height,
          quality,
          format: 'auto',
          crop: 'limit'
        };
      case 'local':
        return {
          ...rest,
          width,
          height,
          quality
        };
      default:
        return baseProps;
    }
  };

  return {
    imageType,
    getOptimalComponent,
    getOptimalProps
  };
};