import { useEffect } from 'react';

export const useSEO = (seoData) => {
  useEffect(() => {
    if (seoData.title) {
      document.title = seoData.title;
    }

    Object.entries(seoData).forEach(([key, value]) => {
      if (key !== 'title' && value) {
        updateMetaTag('name', key, value);
      }
    });

    return () => {
      document.title = 'Balonmano Sariegos - Club de Balonmano en León';
    };
  }, [seoData]);

  const updateMetaTag = (attribute, name, content) => {
    let element = document.querySelector(`meta[${attribute}="${name}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, name);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };
};

export default useSEO;