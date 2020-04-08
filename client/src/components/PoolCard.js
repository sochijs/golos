import React from 'react';
import {toDate} from '../utils';

export const PoolCard = ({vote}) => {

  const maxCount = vote.answers.reduce((acc, answer) => {
    return answer.count > acc ? answer.count : acc;
  }, 0);

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Результаты</h1>
        <ul className="collection with-header">
          <li className="collection-header">
            <h4>{vote.title}</h4>
            <div>Дата создания: {toDate(vote.date)}</div>
            <div>Всего голосов: {vote.votes}</div>
          </li>
          {vote.answers.map(a => {
            const width = 100 * (a.count / maxCount);
            const color = maxCount === a.count ? 'green' : 'blue';
            return (
              <li className="collection-item" key={a._id}>
                <div className={`progress ${color} lighten-5`}>
                  <div className={`determinate ${color}`} style={{width: `${width}%`}}/>
                </div>
                {a.answer} - {a.count}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
