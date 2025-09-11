import React, { forwardRef } from 'react';
import OptimizedImage from '../OptimizedImage/OptimizedImage';
import './Footer.css';

const Footer = forwardRef(() => {
    return (
        <footer className="footer">
            <div className="footer__section logo-footer">
                <OptimizedImage
                    src="logo.png"
                    alt="Logo BM Sariegos"
                    className="footer__logo-main"
                    width={140}
                    height={140}
                    quality={85}
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
                <div className="rrss-logo">
                    <a href="https://www.instagram.com/balonmanosariegos?igsh=MXJveWU0ZnljcTduYw==" target="_blank" rel="noopener noreferrer" className="no-underline">
                        <OptimizedImage src="instagram.png" alt="Instagram" className="footer__icon" width={32} height={32} />
                    </a>
                    <a href="https://www.tiktok.com/@bmsariegos?_t=ZN-8zYVE2axXko&_r=1" target="_blank" rel="noopener noreferrer" className="no-underline">
                        <OptimizedImage src="tiktok.png" alt="TikTok" className="footer__icon" width={32} height={32} />
                    </a>
                    <a href="https://youtube.com/@balonmanosariegos3521?si=IIi08w8o6mOhvQio" target="_blank" rel="noopener noreferrer" className="no-underline">
                        <OptimizedImage src="youtube.png" alt="YouTube" className="footer__icon" width={32} height={32} />
                    </a>
                    <a href="https://x.com/bsariegos?s=21" target="_blank" rel="noopener noreferrer" className="no-underline">
                        <OptimizedImage src="x.png" alt="X (Twitter)" className="footer__icon" width={32} height={32} />
                    </a>
                </div>
            </div>
        </footer>
    );
});

export default Footer;
