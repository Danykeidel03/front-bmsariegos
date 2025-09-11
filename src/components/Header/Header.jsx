import React, { forwardRef, useState } from 'react';
import OptimizedImage from '../OptimizedImage/OptimizedImage';
import './Header.css';

const Header = forwardRef(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="header">
      <div className='logoTeam'>
        <a href="/">
          <OptimizedImage
            src="logo.png"
            alt="Logo BM Sariegos"
            className="header__logo"
            width={140}
            height={140}
            priority={true}
            quality={85}
          />
        </a>
      </div>
      <button
        className='menuToggle'
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        ☰
      </button>
      <div className={`menuOptions ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          <li><a href='https://docs.google.com/forms/d/e/1FAIpQLSfl0oxDg7twPZwtHJjXVFvkbbEabbiX0ISSD-j5fnmxwAMSnQ/viewform?pli=1'>Socios</a></li>
          <li><a href="#entradas" aria-label="Información sobre entradas">Entradas</a></li>
          <li><a href="/quienes-somos">Quiénes Somos</a></li>
          <li><a href="/noticias">Noticias</a></li>
          <li><a href="/equipos">Equipos</a></li>
          <li><a href="/contacto">Contacto</a></li>
        </ul>
      </div>
    </div>
  );
});

export default Header;