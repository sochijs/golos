import React from 'react';

export const VoteItem = ({onSelectAnswer, answer, children}) => {
  return (
    <li className="collection-item" onClick={onSelectAnswer}>
      {children}
    </li>
  );
};