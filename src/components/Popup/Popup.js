import React from 'react';
import closeIcon from '../../assets/icons/close.svg';
import './popup.css';

function Popup({ opened, onClose, children }) {
  return (
    <div className={`popup ${opened && 'popup_open'}`}>
      <div className="popup__container">
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__close"
          onClick={onClose}
        >
          <img src={closeIcon} alt="Закрыть" />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Popup;
