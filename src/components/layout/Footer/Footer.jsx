import React, { forwardRef } from 'react';
import LocalOptimizedImage from '../../ui/LocalOptimizedImage/LocalOptimizedImage';
import SEOLink from '../../ui/SEOLink/SEOLink';
import './Footer.css';

const Footer = forwardRef(() => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__section logo-footer">
          <LocalOptimizedImage
            src="logo-245.webp"
            alt="Logo BM Sariegos"
            className="footer__logo-main"
            width={245}
            height={245}
            quality={75}
            sizes="245px"
          />
          <p className="footer__tagline">
            Club Balonmano Sariegos. El club con más fichas federativas de León.
          </p>
        </div>

        <nav className="footer__section info-footer" aria-label="Información adicional">
          <h3 className="footer__title">Información Adicional</h3>
          <ul className="footer__list">
            <li>
              <SEOLink href="/contacto">Contacto</SEOLink>
            </li>
            <li>
              <SEOLink href="/quienes-somos">Sobre Nosotros</SEOLink>
            </li>
            <li>
              <SEOLink href="/politica-privacidad">Política de Privacidad</SEOLink>
            </li>
            <li>
              <SEOLink href="/terminos-condiciones">Términos y Condiciones</SEOLink>
            </li>
          </ul>
        </nav>

        <div className="footer__section rrss-footer">
          <h3 className="footer__title">Contacto</h3>
          <div className="info-club">
            <p>Sariegos, León</p>
            <p>
              <SEOLink href="tel:+34608108320">+34 608 10 83 20</SEOLink>
            </p>
            <p>
              <SEOLink href="tel:+34695048796">+34 695 04 87 96</SEOLink>
            </p>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Club Balonmano Sariegos. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
});

export default Footer;
