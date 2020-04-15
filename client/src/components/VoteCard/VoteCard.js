import React from 'react';
import Repooling from '../Repooling/Repooling';
import Pooling from '../Pooling/Pooling';
import Results from '../Results/Results';
import {toDate} from '../../utils/utils';
import {POOLING_STATE} from '../../utils/consts';
import './VoteCard.css';

const VoteCard = ({vote, poolingState, onSubmitChoice, answerId, isAbstained}) => {

  const renderState = () => {
    switch (poolingState) {
      case POOLING_STATE.REPOOLING:
        return (
          <Repooling
            voteId={vote._id}
            answers={vote.answers}
            countVotes={vote.votes}
            onSubmitChoice={onSubmitChoice}
            isAbstained={isAbstained}
            oldAnswerId={answerId}/>);
      case POOLING_STATE.RESULTS:
        return <Results answers={vote.answers} countVotes={vote.votes} userAnswer={answerId}/>;
      case POOLING_STATE.POOLING:
      default:
        return (
          <Pooling
            voteId={vote._id}
            answers={vote.answers}
            onSubmitChoice={onSubmitChoice}/>);
    }
  };

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
          {renderState()}
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

export default VoteCard;
