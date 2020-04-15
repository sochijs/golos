import React from 'react';
import {nanoid} from 'nanoid';
import classNames from 'classnames';
import './Input.css';

const Input = ({label, className, error, children, ...attrs}) => {
  const id = nanoid();
  const classes = classNames(
    'Input-input',
    className,
    {'Input-input_error': error}
  );

  return (
    <div className="Input">
      {label && <label className="Input-label" htmlFor={id}>{label}
        {attrs.required && <span className="Input-required">*</span>}
      </label>}

      <div className="Input-wrapper">
        <input
          className={classes}
          id={id}
          {...attrs}/>
        {children}
      </div>
      {error && <span className="Input-error">{error}</span>}
    </div>
  );
};

export default Input;