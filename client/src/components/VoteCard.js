import React from 'react';

export const VoteCard = ({vote, onSelectAnswer}) => {
  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Сделайте выбор</h1>
        <ul className="collection with-header">
          <li className="collection-header"><h4>{vote.title}</h4></li>
          {vote.answers.map(a => (
            <li className="collection-item" key={a._id} onClick={() => onSelectAnswer(vote._id, a._id)}>
              {a.answer}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
