import React from 'react';
import {Link} from 'react-router-dom';
import {toDate} from '../../../utils/utils';
import './PublicVote.css';

const PublicVote = ({vote}) => {
  const {_id: id, title, votes, abstained, expired} = vote;

  return (
    <li className="PublicVote">
      <div className="PublicVote-title">
        <Link className="PublicVote-link" to={`/vote/${id}`}>{title}</Link>
        <div className="PublicVote-date">Активено до: {toDate(expired)}</div>
      </div>

      <div className="PublicVote-info">
        <span className="PublicVote-vote">Проголосовало: {votes}</span>
        <span className="PublicVote-vote">Воздержалось: {abstained}</span>
      </div>
    </li>
  );
};

export default PublicVote;