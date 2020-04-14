import React from 'react';
import classNames from 'classnames';
import Progress from '../UI/Progress/Progress';
import './Repooling.css';
import Icon from '../UI/Icon/Icon';

const Repooling = ({answers, onChange, countVotes, userAnswer}) => {

  const maxCount = answers.reduce((acc, answer) => {
    return answer.count > acc ? answer.count : acc;
  }, 0);

  const checkedHandler = (evt) => {
    evt.preventDefault();
    if (evt.which === 13 || evt.which === 32) {
      evt.target.click();
    }
  };

  return (
    <ul className="Repooling">
      {answers.map(answer => {
        const width = 100 * (answer.count / countVotes);
        const percent = width.toFixed(1);
        const classes = classNames(
          'Repooling-item',
          {'Repooling-item_win': maxCount === answer.count}
        );
        return (
          <li className={classes} key={answer._id}>
            {userAnswer !== answer._id ?
              <div className="Repooling-answer">
                <input className="Repooling-input"
                       type="radio"
                       id={answer._id}
                       name="answer"
                       onChange={() => onChange(answer._id)}/>
                <label
                  className="Repooling-label"
                  htmlFor={answer._id}
                  tabIndex="0"
                  onKeyPress={checkedHandler}>
                  <i className="Repooling-i_radio"/>
                  <span className="Repooling-percent">{percent}%</span>
                  <span className="Repooling-answer">{answer.answer}</span>
                </label>
                <span className="Repooling-count">{answer.count}</span>
              </div> :
              <div className="Repooling-answer">
                <label
                  className="Repooling-label Repooling-label_choice">
                  <span className="Repooling-percent">{percent}%</span>
                  <span className="Repooling-answer">{answer.answer} <Icon
                    className="Repooling-icon">check_box</Icon></span>
                </label>
                <span className="Repooling-count">{answer.count}</span>
              </div>}

            <Progress
              choice={userAnswer === answer._id}
              width={width}
              isWin={maxCount === answer.count}/>
          </li>
        );
      })}
    </ul>
  );
};

export default Repooling;