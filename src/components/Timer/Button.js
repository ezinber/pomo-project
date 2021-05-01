import React from 'react';

function Button({ children, mode, handleClick, settings }) {
  const {color, slug} = settings;
  const isActive = mode.slug === slug;
  const classes = `timer__button ${isActive && 'timer__button_active'}`;

  const handleClickButton = () => {
    handleClick(settings);
  }

  return (
    <button
      style={{
        background: isActive ? color : 'none',
        color: isActive ? '#fff' : mode.color
      }}
      type="button"
      className={classes}
      onClick={handleClickButton}
    >
      {children}
    </button>
  );
}

export default Button;