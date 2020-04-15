import React from 'react';
import {nanoid} from 'nanoid';

import './Checkbox.css';

const Checkbox = ({type, children, label, ...attrs}) => {
  const id = nanoid();

  switch (type) {
    case 'radio':
      return (
        <span className="Checkbox">
          <input className="Checkbox-input"
                 type="radio"
                 id={id}
                 {...attrs}/>
          <label className="Checkbox-label Checkbox-label_type_radio" htmlFor={id}>
            <i className="Checkbox-i_radio"/>
            {children}</label>
        </span>
      );
    case 'checkbox':
      return (
        <span className="Checkbox">
          <input className="Checkbox-input"
                 type="checkbox"
                 id={id}
                 {...attrs}/>
          {label && <label className="Checkbox-label Checkbox-label_type_checkbox" htmlFor={id}>{label}</label>}
        </span>
      );
    default:
      return null;
  }
};

export default Checkbox;