import React from 'react';

function Button({ children, mode, handleClick, slug }) {
  const classes = `timer__button ${mode === slug && 'timer__button_active'}`;

  const handleClickButton = () => {
    handleClick(slug);
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={handleClickButton}
    >{children}</button>
  );
}

export default Button;