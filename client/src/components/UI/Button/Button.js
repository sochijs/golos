import React from 'react';
import './Button.css';
import classNames from 'classname';

const Button = ({children, onClick, className, disabled, active}) => {

  const classes = classNames(
    'Button',
    className,
    {active}
  );

  return (
    <button className={classes}
            disabled={disabled}
            onClick={onClick}
    >{children}
    </button>
  );
};

export default Button;