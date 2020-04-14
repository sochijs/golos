import React from 'react';
import classNames from 'classnames';
import Progress from '../UI/Progress/Progress';
import './PoolingResult.css';

const PoolingResult = ({answers, onChange, countVotes, userAnswer}) => {

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
    <ul className="PoolingResult">
      {answers.map(answer => {
        const width = 100 * (answer.count / countVotes);
        const percent = width.toFixed(1);
        const classes = classNames(
          'PoolingResult-item',
          {'PoolingResult-item_win': maxCount === answer.count}
        );
        return (
          <li className={classes} key={answer._id}>
            {userAnswer !== answer._id ?
              <div className="PoolingResult-answer">
                <input className="PoolingResult-input"
                       type="radio"
                       id={answer._id}
                       name="answer"
                       onChange={() => onChange(answer._id)}/>
                <label
                  className="PoolingResult-label"
                  htmlFor={answer._id}
                  tabIndex="0"
                  onKeyPress={checkedHandler}>
                  <i className="PoolingResult-i_radio"/>
                  <span className="PoolingResult-percent">{percent}%</span>
                  <span className="PoolingResult-answer">{answer.answer}</span>
                </label>
                <span className="PoolingResult-count">{answer.count}</span>
              </div> :
              <div className="PoolingResult-answer">
                <label
                  className="PoolingResult-label PoolingResult-label_choice">
                  <span className="PoolingResult-percent">{percent}%</span>
                  <span className="PoolingResult-answer">{answer.answer} <i
                    className="material-icons PoolingResult-icon_type_choice">check_box</i></span>
                </label>
                <span className="PoolingResult-count">{answer.count}</span>
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

export default PoolingResult;