import React from 'react';
import settingsIcon from '../../assets/icons/settings.svg';
import listIcon from '../../assets/icons/list.svg';
import './menu.css';

function Menu() {
  return (
    <nav className="menu">
      <ul className="menu__list">
        <li className="menu__item">
          <button
            aria-label="App settings"
            className="menu__button"
            type="button"
          >
            <img src={settingsIcon} alt="App settings" className="menu__icon" />
          </button>
        </li>
        <li className="menu__item">
          <button aria-label="Task list" className="menu__button" type="button">
            <img src={listIcon} alt="Task list" className="menu__icon" />
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;