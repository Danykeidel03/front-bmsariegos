const StructuredData = ({ type, data }) => {
  const schemas = {
    organization: {
      "@context": "https://schema.org",
      "@type": "SportsOrganization",
      "name": "Balonmano Sariegos",
      "description": "Club de Balonmano Sariegos en León",
      "url": "https://balonmanosariegos.com",
      "logo": "https://balonmanosariegos.com/logo.png",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Sariegos",
        "addressRegion": "León",
        "addressCountry": "ES"
      },
      "sport": "Handball",
      "sameAs": [
        "https://www.instagram.com/balonmanosariegos",
        "https://www.youtube.com/@balonmanosariegos",
        "https://www.tiktok.com/@balonmanosariegos"
      ],
      ...data
    },
    
    event: {
      "@context": "https://schema.org",
      "@type": "SportsEvent",
      "name": data?.name || "Partido de Balonmano",
      "description": data?.description || "Partido del Club Balonmano Sariegos",
      "startDate": data?.startDate,
      "location": {
        "@type": "Place",
        "name": data?.location || "Pabellón Deportivo Sariegos",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Sariegos",
          "addressRegion": "León",
          "addressCountry": "ES"
        }
      },
      "organizer": {
        "@type": "SportsOrganization",
        "name": "Balonmano Sariegos"
      },
      ...data
    },

    article: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": data?.title,
      "description": data?.description,
      "author": {
        "@type": "Organization",
        "name": "Balonmano Sariegos"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Balonmano Sariegos",
        "logo": {
          "@type": "ImageObject",
          "url": "https://balonmanosariegos.com/logo.png"
        }
      },
      "datePublished": data?.datePublished,
      "dateModified": data?.dateModified || data?.datePublished,
      ...data
    }
  };

  const schema = schemas[type] || schemas.organization;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default StructuredData;