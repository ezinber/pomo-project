import React from 'react';
import './timer-control-button.css';

function TimerControlButton({ onClick, action, icon }) {
  return (
    <button type="button" className="timer__control-button" onClick={onClick}>
      <img src={icon} alt={`Timer ${action}`} className="timer__control-icon" />
    </button>
  );
}

export default TimerControlButton;
