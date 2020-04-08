import React from 'react';
import {toDate} from '../utils';
import {VoteItem} from './VoteItem';

export const VoteCard = ({vote, onSelectAnswer, userVoted, userAnswer}) => {

  const maxCount = vote.answers.reduce((acc, answer) => {
    return answer.count > acc ? answer.count : acc;
  }, 0);

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
          {vote.answers.map(answer => {
            if (userVoted) {
              const width = 100 * (answer.count / maxCount);
              const color = userAnswer === answer._id ? 'green' : 'blue';

              return (
                <VoteItem key={answer._id} onSelectAnswer={() => onSelectAnswer(vote._id, answer._id)} answer={answer}
                          color={color}>
                  <div className={`progress ${color} lighten-5`}>
                    <div className={`determinate ${color}`} style={{width: `${width}%`}}/>
                  </div>
                  {answer.answer} - {answer.count}
                  {userAnswer === answer._id && ` - Ваш выбор`}
                </VoteItem>
              );
            } else {
              return (
                <VoteItem key={answer._id} onSelectAnswer={() => onSelectAnswer(vote._id, answer._id)} answer={answer}>
                  {answer.answer}
                </VoteItem>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
};
