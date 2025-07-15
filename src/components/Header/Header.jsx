import React, { forwardRef } from 'react';
import './Header.css';

const Header = forwardRef(() => {

  return (
    <div className="header">
      <div className='logoTeam'>
        <img
          src="logo.png"
          alt="Logo"
          className="header__logo"
          width="48px"
          height="48px"
        />
      </div>
      <div className='menuOptions'>
        <ul>
          <li>Socios</li>
          <li>Entradas</li>
          <li>Equipos</li>
          <li>Contacto</li>
        </ul>
      </div>
    </div>
  );
});

export default Header;