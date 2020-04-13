import React from 'react';

import './PoolingResult.css';

const PoolingResult = ({answers, onChange, newAnswerId, userAnswer}) => {

  const maxCount = answers.reduce((acc, answer) => {
    return answer.count > acc ? answer.count : acc;
  }, 0);

  return (
    <ul className="Pooling">
      {answers.map(answer => {
        const width = 100 * (answer.count / maxCount);
        const color = userAnswer === answer._id ? 'green' : 'blue';
        return (
          <li className="Pooling-item" key={answer._id}>
            <span className="Pooling-answer">
              {userAnswer !== answer._id &&
              <input className="Pooling-input"
                     type="radio"
                     id={answer._id}
                     name="answer"
                     onChange={() => onChange(answer._id)}/>}
              <label className="Pooling-label" htmlFor={answer._id}>
                <i className="Pooling-i_radio"/>
                <span className="Pooling-answer">{answer.answer}</span>
                {userAnswer === answer._id && ' - Ваш голос'}
                <span className="Pooling-count">{answer.count}</span>
              </label>
            </span>

            <div className={`progress ${color} lighten-5`}>
              <div className={`determinate ${color}`} style={{width: `${width}%`}}/>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default PoolingResult;