import React, { useState, useEffect } from 'react';
import './CookieBanner.css';

const CookieBanner = () => {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const cookiesAccepted = localStorage.getItem('cookiesAccepted');
        if (!cookiesAccepted) {
            setShowBanner(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookiesAccepted', 'true');
        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <div className="cookie-banner">
            <div className="cookie-content">
                <p>
                    Utilizamos cookies técnicas necesarias para el funcionamiento de la web. 
                    <a href="/politica-privacidad"> Más información</a>
                </p>
                <button onClick={acceptCookies} className="cookie-accept">
                    Aceptar
                </button>
            </div>
        </div>
    );
};

export default CookieBanner;