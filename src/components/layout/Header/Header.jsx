import React, { forwardRef, useEffect, useState } from 'react';
import LocalOptimizedImage from '../../ui/LocalOptimizedImage/LocalOptimizedImage';
import './Header.css';

const SOCIOS_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfdQ2WouLYkxJJexZFqckbwHUiYi0UGE2X-sMWuPmBjFFk8uw/viewform';

const NAV_LINKS = [
  { href: '/quienes-somos', label: 'Quiénes Somos' },
  { href: '/noticias', label: 'Noticias' },
  { href: '/equipos', label: 'Equipos' },
  { href: '/tienda', label: 'Tienda' },
  { href: '/contacto', label: 'Contacto' },
];

const Header = forwardRef(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen]);

  const isActive = (href) => currentPath === href || currentPath.startsWith(`${href}/`);

  return (
    <header className="site-header">
      <div className="header-topbar">
        <div className="header-topbar__inner">
          <span>Club Balonmano Sariegos · León</span>
        </div>
      </div>
      <div className="header">
        <div className="logoTeam">
          <a href="/" aria-label="Ir al inicio - BM Sariegos">
            <LocalOptimizedImage
              src="logo-123.webp"
              alt="Logo BM Sariegos"
              className="header__logo"
              width={123}
              height={123}
              priority={true}
              quality={75}
              sizes="123px"
            />
          </a>
        </div>
        <button
          type="button"
          className={`menuToggle ${isMenuOpen ? 'is-open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-controls="main-menu"
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          <span className="menuToggle__bar" aria-hidden="true"></span>
          <span className="menuToggle__bar" aria-hidden="true"></span>
          <span className="menuToggle__bar" aria-hidden="true"></span>
        </button>
        <nav
          id="main-menu"
          className={`menuOptions ${isMenuOpen ? 'active' : ''}`}
          aria-label="Principal"
        >
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={isActive(link.href) ? 'is-active' : undefined}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="menuOptions__cta">
              <a href={SOCIOS_URL} className="header-socios">
                Socios
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
});

export default Header;
