import React from 'react';
import classNames from 'classnames';

const Icon = ({children, className, size}) => {

  const elemSize = size ? {fontSize: `${size}rem`} : null;

  const classes = classNames(
    'material-icons',
    'Icon',
    className
  );

  return <i className={classes} style={elemSize}>{children}</i>;
};

export default Icon;