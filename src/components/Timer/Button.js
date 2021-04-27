import React from 'react';

function Button({ children, mode, handleClick, settings, textColor }) {
  const {color, slug} = settings;
  const isActive = mode === slug;
  const classes = `timer__button ${isActive && 'timer__button_active'}`;

  const handleClickButton = () => {
    handleClick(slug);
  }

  return (
    <button
      style={{background: isActive ? color : '#fff', color: isActive ? '#fff' : textColor}}
      type="button"
      className={classes}
      onClick={handleClickButton}
    >{children}</button>
  );
}

export default Button;