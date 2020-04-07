import React from 'react';
import {toDate} from '../utils';

export const PoolCard = ({vote, onSelectAnswer}) => {
  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Сделайте выбор</h1>
        <ul className="collection with-header">
          <li className="collection-header">
            <h4>{vote.title}</h4>
            <div>Дата создания: {toDate(vote.date)}</div>
            <div>Всего голосов: {vote.votes}</div>
          </li>
          {vote.answers.map(a => {
            const width = 100 * (a.count / vote.votes);
            return (
              <li className="collection-item" key={a._id} onClick={() => onSelectAnswer(vote._id, a._id)}>
                <div className="progress">
                  <div className="determinate" style={{width: `${width}%`}}/>
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
