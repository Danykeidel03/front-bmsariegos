import { useState } from 'react';
import { useCloudinaryOptimization } from '../../hooks/useCloudinaryOptimization';

const CloudinaryImage = ({ 
  src, 
  alt, 
  className, 
  width, 
  height,
  priority = false,
  quality = 'auto',
  format = 'auto',
  crop = 'limit',
  sizes = '100vw',
  ...props 
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { optimizeCloudinaryUrl, generateResponsiveSrcSet } = useCloudinaryOptimization();

  if (error || !src) {
    return (
      <div 
        className={`${className} image-placeholder`}
        style={{ 
          width: width || '100%', 
          height: height || 'auto',
          backgroundColor: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#999',
          fontSize: '12px'
        }}
      >
        {error ? 'Error' : 'Cargando...'}
      </div>
    );
  }

  const optimizedSrc = optimizeCloudinaryUrl(src, {
    width,
    height,
    quality,
    format,
    crop
  });

  const srcSet = generateResponsiveSrcSet(src, width);

  return (
    <img
      src={optimizedSrc}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={() => setError(true)}
      style={{
        opacity: loaded ? 1 : 1,
        transition: 'opacity 0.2s ease',
        ...props.style
      }}
      {...props}
    />
  );
};

export default CloudinaryImage;