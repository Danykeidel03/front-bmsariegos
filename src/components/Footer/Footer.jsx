import React, { forwardRef } from 'react';
import LocalOptimizedImage from '../LocalOptimizedImage/LocalOptimizedImage';
import './Footer.css';

const Footer = forwardRef(() => {
    return (
        <footer className="footer">
            <div className="footer__section logo-footer">
                <LocalOptimizedImage
                    src="logo.png"
                    alt="Logo BM Sariegos"
                    className="footer__logo-main"
                    width={140}
                    height={140}
                    quality={75}
                    sizes="140px"
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
                        <LocalOptimizedImage src="instagram.png" alt="Instagram" className="footer__icon" width={32} height={32} quality={70} sizes="32px" />
                    </a>
                    <a href="https://www.tiktok.com/@bmsariegos?_t=ZN-8zYVE2axXko&_r=1" target="_blank" rel="noopener noreferrer" className="no-underline">
                        <LocalOptimizedImage src="tiktok.png" alt="TikTok" className="footer__icon" width={32} height={32} quality={70} sizes="32px" />
                    </a>
                    <a href="https://youtube.com/@balonmanosariegos3521?si=IIi08w8o6mOhvQio" target="_blank" rel="noopener noreferrer" className="no-underline">
                        <LocalOptimizedImage src="youtube.png" alt="YouTube" className="footer__icon" width={32} height={32} quality={70} sizes="32px" />
                    </a>
                    <a href="https://x.com/bsariegos?s=21" target="_blank" rel="noopener noreferrer" className="no-underline">
                        <LocalOptimizedImage src="x.png" alt="X (Twitter)" className="footer__icon" width={32} height={32} quality={70} sizes="32px" />
                    </a>
                    <a href="https://www.esportplus.tv/category/64d211b808340ccc0bf2e000/sub-category/68cbe353edc81caf2f5909c5/" target="_blank" rel="noopener noreferrer" className="no-underline">
                        <LocalOptimizedImage src="esportplus.png" alt="EsportPlus TV" className="footer__icon" width={32} height={32} quality={70} sizes="32px" />
                    </a>
                </div>
            </div>
        </footer>
    );
});

export default Footer;
