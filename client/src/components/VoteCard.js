import React from 'react';

export const VoteCard = ({vote}) => {

  return (
    <>
      <h1>{vote.title}</h1>
      <ul>
        {vote.answers.map(a => (
          <li key={a._id}>
            {a.answer}
          </li>
        ))}
      </ul>
    </>
  );
};