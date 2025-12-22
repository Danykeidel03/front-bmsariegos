import { useState } from 'react';

const LocalOptimizedImage = ({ 
  src, 
  alt, 
  className, 
  width, 
  height,
  priority = false,
  _quality = 80,
  _sizes = "100vw",
  ...props 
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const getWebPSrc = (originalSrc) => {
    if (!originalSrc) return '';
    
    // Si ya es WebP, devolver tal como está
    if (originalSrc.endsWith('.webp')) return originalSrc;
    
    // Convertir extensión a WebP
    const lastDot = originalSrc.lastIndexOf('.');
    if (lastDot === -1) return originalSrc;
    
    return originalSrc.substring(0, lastDot) + '.webp';
  };

  const getFallbackSrc = (originalSrc) => {
    // Si es WebP, intentar encontrar el original
    if (originalSrc.endsWith('.webp')) {
      return originalSrc.replace('.webp', '.png');
    }
    return originalSrc;
  };

  if (error) {
    return (
      <div 
        className={`${className} image-error`} 
        style={{ 
          width: width || '100%', 
          height: height || 'auto',
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#666',
          fontSize: '12px'
        }}
      >
        Error al cargar imagen
      </div>
    );
  }

  const webpSrc = getWebPSrc(src);
  const fallbackSrc = getFallbackSrc(src);

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={fallbackSrc}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        style={{
          opacity: loaded ? 1 : 0.8,
          transition: 'opacity 0.3s ease',
          ...props.style
        }}
        {...props}
      />
    </picture>
  );
};

export default LocalOptimizedImage;