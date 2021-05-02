import React from 'react';
import logo from '../../assets/images/logo-pomo.svg';
import Menu from '../Menu/Menu';
import './header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Pomo project logo" />
      </div>
      <Menu />
    </header>
  );
}

export default Header;
