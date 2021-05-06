import React, { useContext } from 'react';
import { TimerContext } from '../../../contexts/timerContext';
import './mode-button.css';

function ModeButton({ title, onClick, slug }) {
  const { executing } = useContext(TimerContext);
  const classes = `mods__button ${
    executing.slug === slug && 'mods__button_active'
  }`;

  const handleClick = () => {
    onClick(slug);
  };

  return (
    <li className="mods__item">
      <button className={classes} onClick={handleClick}>
        {title}
      </button>
    </li>
  );
}

export default ModeButton;
