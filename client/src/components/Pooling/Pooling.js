import React from 'react';
import Checkbox from '../UI/Checkbox/Checkbox';

import './Pooling.css';

const Pooling = ({answers, onChange}) => {
  return (
    <ul className="Pooling">
      {answers.map(answer => (
        <li className="Pooling-item" key={answer._id}>
          <Checkbox
            type="radio"
            name="answer"
            onChange={() => onChange(answer._id)}
          >{answer.answer}</Checkbox>
        </li>
      ))}
    </ul>
  );
};

export default Pooling;