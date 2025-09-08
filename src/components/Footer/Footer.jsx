import React, { forwardRef } from 'react';
import './Footer.css';

const Footer = forwardRef(() => {
    return (
        <footer className="footer">
            <div className="footer__section logo-footer">
                <img
                    src="logo.png"
                    alt="Logo"
                    className="footer__logo-main"
                    width="140"
                    height="140"
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
                    <p>+34 666 666 666</p>
                </div>
                <div className="rrss-logo">
                    <img src="instagram.png" alt="Instagram" className="footer__icon" />
                    <img src="tiktok.png" alt="TikTok" className="footer__icon" />
                    <img src="youtube.png" alt="YouTube" className="footer__icon" />
                </div>
            </div>
        </footer>
    );
});

export default Footer;
