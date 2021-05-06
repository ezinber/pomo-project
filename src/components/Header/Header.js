import React from 'react';
import logo from '../../assets/images/logo-pomo.svg';
import Menu from '../Menu/Menu';
import './header.css';

function Header(props) {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Pomo project logo" />
      </div>
      <Menu {...props} />
    </header>
  );
}

export default Header;
