import React from 'react';
import './NotFound.css';
import SEO from '../../components/ui/SEO/SEO';

const NotFound = () => {
  return (
    <>
      <SEO
        title="Página no encontrada - Balonmano Sariegos"
        description="La página que buscas no existe. Vuelve al inicio del Club de Balonmano Sariegos."
      />
      <div className="notfound-page">
        <div className="notfound-content">
          <h1>404</h1>
          <h2>Página no encontrada</h2>
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
