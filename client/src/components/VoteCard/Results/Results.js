import React from 'react';
import classNames from 'classnames';
import Progress from '../../UI/Progress/Progress';
import './Results.css';

const Results = ({answers, countVotes, userAnswer}) => {

  const maxCount = answers.reduce((acc, answer) => {
    return answer.count > acc ? answer.count : acc;
  }, 0);

  return (
    <ul className="Result">
      {answers.map(answer => {
        const width = 100 * (answer.count / countVotes);
        const percent = width.toFixed(1);
        const classes = classNames(
          'Results-item',
          {'Result-item_win': maxCount === answer.count}
        );
        return (

          <li className={classes} key={answer._id}>
            <div className="Result-answer">
              <label className="Result-label">
                <span className="Result-percent">{percent}%</span>
                <span className="Result-answer">{answer.answer} {userAnswer === answer._id &&
                <i className="material-icons Result-icon_type_choice">check_box</i>}</span>
              </label>
              <span className="Result-count">{answer.count}</span>
            </div>

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

export default Results;