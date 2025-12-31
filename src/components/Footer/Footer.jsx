import React, { forwardRef } from 'react';
import LocalOptimizedImage from '../LocalOptimizedImage/LocalOptimizedImage';
import './Footer.css';

const Footer = forwardRef(() => {
    return (
        <footer className="footer">
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
            </div>

            <div className="footer__section info-footer">
                <h3 className="footer__title">Información Adicional</h3>
                <ul className="footer__list">
                    <li><a href="/contacto">Contacto</a></li>
                    <li>Sobre Nosotros</li>
                    <li><a href="/politica-privacidad">Política de Privacidad</a></li>
                    <li><a href="/terminos-condiciones">Términos y Condiciones</a></li>
                </ul>
            </div>

            <div className="footer__section rrss-footer">
                <div className="info-club">
                    <p>Sariegos, León</p>
                    <p>+34 608 10 83 20</p>
                    <p>+34 695 04 87 96</p>
                </div>
            </div>
        </footer>
    );
});

export default Footer;
