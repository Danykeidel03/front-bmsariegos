import { useState } from 'react';

const OptimizedImage = ({ src, alt, className, priority = false, ...props }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onLoad={() => setLoaded(true)}
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