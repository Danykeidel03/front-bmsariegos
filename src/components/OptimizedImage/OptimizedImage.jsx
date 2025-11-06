import { useState } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  className, 
  priority = false, 
  width, 
  height,
  sizes = "(max-width: 768px) 100vw, 50vw",
  quality = 80,
  ...props 
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const getOptimizedSrc = (originalSrc, w, q = quality) => {
    if (!originalSrc) return '';
    
    // Si es de Cloudinary, aplicar transformaciones
    if (originalSrc.includes('res.cloudinary.com')) {
      const parts = originalSrc.split('/upload/');
      if (parts.length === 2) {
        const transformations = [
          'f_auto',
          `q_${q}`,
          `w_${w}`,
          'c_limit',
          'dpr_auto'
        ].join(',');
        return `${parts[0]}/upload/${transformations}/${parts[1]}`;
      }
    }
    
    return originalSrc;
  };

  const generateSrcSet = (originalSrc) => {
    if (!width || !originalSrc) return '';
    
    const widths = [
      Math.round(width * 0.5),
      width,
      Math.round(width * 1.5),
      Math.round(width * 2)
    ].filter(w => w >= 100 && w <= 2048);
    
    return widths.map(w => `${getOptimizedSrc(originalSrc, w)} ${w}w`).join(', ');
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
          color: '#666'
        }}
      >
        Error al cargar imagen
      </div>
    );
  }

  return (
    <img
      src={getOptimizedSrc(src, width || 800)}
      srcSet={generateSrcSet(src)}
      sizes={sizes}
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
  );
};

export default OptimizedImage;