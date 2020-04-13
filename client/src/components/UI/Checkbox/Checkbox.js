import React from 'react';
import {nanoid} from 'nanoid';

import './Checkbox.css';

const Checkbox = ({type, onChange, children, name}) => {
  const id = nanoid();

  switch (type) {
    case 'radio':
      return (
        <span className="Checkbox">
          <input className="Checkbox-input"
                 type="radio"
                 id={id}
                 name={name}
                 onChange={onChange}/>
          <label className="Checkbox-label" htmlFor={id}>
            <i className="Checkbox-i_radio"/>
            {children}</label>
        </span>
      );
    default:
      return null;
  }
};

export default Checkbox;