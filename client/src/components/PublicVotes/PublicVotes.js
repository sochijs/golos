import React from 'react';
import {Link} from 'react-router-dom';
import PublicVote from './PublicVote/PublicVote';
import './PublicVotes.css';

const PublicVotes = ({votes}) => {
  return (
    <div className="PublicVotes">
      <div className="PublicVotes-wrapper">
        <div className="PublicVotes-title">Публичные вопросы</div>
        {votes.length === 0 ?
          <p>Пока нет публичный вопросов. Вы можете быть первым :) <Link to='/create'>Создать</Link></p> :
          <ul className="PublicVotes-list">
            {votes.map(vote => <PublicVote key={vote._id} vote={vote}/>)}
          </ul>}
      </div>
    </div>
  );
};

export default PublicVotes;