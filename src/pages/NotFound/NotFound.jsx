import React from 'react';
import './NotFound.css';
import Seo from '../../components/ui/SEO/SEO';

const NotFound = () => {
  return (
    <>
      <Seo
        title="Página no encontrada - Balonmano Sariegos"
        description="La página que buscas no existe. Vuelve al inicio del Club de Balonmano Sariegos."
      />
      <div className="notfound-page">
        <div className="notfound-content">
          <p className="notfound-code" aria-hidden="true">
            404
          </p>
          <h1>Página no encontrada</h1>
          <p>La página que buscas no existe o ha sido movida.</p>
          <a href="/" className="home-btn">
            Volver al inicio
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
