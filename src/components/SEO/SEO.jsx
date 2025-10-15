import { useEffect } from 'react';

const SEO = ({ 
  title = 'Sariegos - Balonmano León - Balonmano Sariegos',
  description = 'Sariegos - Balonmano León - Club Balonmano Sariegos. El mejor equipo de handball de Sariegos y León con noticias, partidos y toda la información del club.',
  keywords = 'sariegos, sariegos león, balonmano león, balonmano leon, balonmano sariegos, sariegos balonmano, club sariegos, handball león, club balonmano león, equipo balonmano león',
  image = '/logo.png',
  url = window.location.href,
  type = 'website'
}) => {
  useEffect(() => {
    document.title = title;
    
    updateMetaTag('name', 'description', description);
    updateMetaTag('name', 'keywords', keywords);
    
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:image', image);
    updateMetaTag('property', 'og:url', url);
    updateMetaTag('property', 'og:type', type);
    updateMetaTag('property', 'og:site_name', 'Balonmano Sariegos');
    updateMetaTag('property', 'og:locale', 'es_ES');
    
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', title);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', image);
    
    updateMetaTag('name', 'robots', 'index, follow');
    updateMetaTag('name', 'author', 'Balonmano Sariegos');
    updateMetaTag('name', 'theme-color', '#119bc6');
  }, [title, description, keywords, image, url, type]);

  const updateMetaTag = (attribute, name, content) => {
    let element = document.querySelector(`meta[${attribute}="${name}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, name);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  return null;
};

export default SEO;