import React, {useState} from 'react';
import {toDate} from '../../utils';
import Button from '../UI/Button/Button';
import Repooling from '../Repooling/Repooling';
import Pooling from '../Pooling/Pooling';

import './VoteCard.css';
import Icon from '../UI/Icon/Icon';

export const VoteCard = ({vote, onChoice, userVoted, userAnswer, userAbstained}) => {
  const [newAnswerId, setNewAnswerId] = useState(null);
  console.log('userAbstained', userAbstained);

  return (
    <>
      <div className="VoteCard">
        <div className="VoteCard-header">
          <h1 className="VoteCard-title">
            {vote.title}
          </h1>
          <span className="VoteCard-info VoteCard-info_type_date">Дата создания: {toDate(vote.date)}</span>
        </div>
        <div className="VoteCard-content">
          {userVoted ?
            <Repooling
              answers={vote.answers}
              countVotes={vote.votes}
              onChange={setNewAnswerId}
              newAnswerId={newAnswerId}
              userAnswer={userAnswer}/> :
            <Pooling
              answers={vote.answers}
              onChange={setNewAnswerId}/>
          }

          <div className="VoteCard-buttons">
            <Button
              className="Button_type_active"
              disabled={!!!newAnswerId}
              onClick={() => onChoice(vote._id, newAnswerId)}
            >Голосовать</Button>
            {userAbstained ?
              [<Button
                disabled
              >Вы воздержались от ответа</Button>,
                <Icon className="VoteCard-icon">check_box</Icon>] :
              <Button
                onClick={() => onChoice(vote._id, null, true)}
              >Воздержаться</Button>}
          </div>
        </div>
        <div className="VoteCard-footer">
          <span className="VoteCard-note">{vote.votes || vote.abstained ?
            `Проголосовало ${vote.votes} человек. Воздержались ${vote.abstained} человек.` :
            `Еще никто не голосовал, будьте первым!`
          }</span>
        </div>
      </div>
    </>
  );
};
