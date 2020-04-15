import React, {useCallback, useEffect, useState} from 'react';
import {useHttp} from '../hooks/http.hook';
import {useParams} from 'react-router';
import VoteCard from '../components/VoteCard/VoteCard';
import Loader from '../components/UI/Loader/Loader';
import {POOLING_STATE} from '../utils/consts';

let socket = null;

const getCurrentPoolingState = (expired, isVoted) => {
  if (new Date() >= new Date(expired)) {
    return POOLING_STATE.RESULTS;
  }

  if (isVoted) {
    return POOLING_STATE.REPOOLING;
  }

  return POOLING_STATE.POOLING;
};

export const VotePage = () => {
  const {loading, request} = useHttp();
  const voteId = useParams().id;
  const [vote, setVote] = useState(null);
  const [poolingState, setPoolingState] = useState(POOLING_STATE.LOADING);
  const [answerId, setAnswerId] = useState(null);
  const [isAbstained, setIsAbstained] = useState(false);
  const END_POINT = 'ws://localhost:8080';

  const getVote = useCallback(async () => {
    try {
      const {vote, isVoted, answerId, isAbstained} = await request(`/api/vote/${voteId}`, 'GET');

      setPoolingState(getCurrentPoolingState(vote.expired, isVoted));
      setVote(vote);
      setAnswerId(answerId);
      setIsAbstained(isAbstained);
    } catch (e) {
    }

  }, [request, voteId]);

  useEffect(() => {
    socket = new WebSocket(END_POINT);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case 'userChoice':
          setVote(data.message.vote);
          break;
        default:
          break;
      }
    };

    return () => {
      socket.close();
    };
  }, [END_POINT]);

  useEffect(() => {
    getVote();
  }, [getVote]);

  const onSubmitChoiceHandler = async (voteId, newAnswerId, isAbstained = false) => {
    // На всякий случай проверим, хотя отправить данные нельзя
    if (answerId === newAnswerId && !isAbstained) {
      return false;
    }

    try {
      const {vote} = await request('/api/vote/choice', 'POST', {
        voteId,
        answerId: newAnswerId,
        isAbstained
      });

      setPoolingState(getCurrentPoolingState(vote.expired, true));
      setVote(vote);
      setAnswerId(newAnswerId);
      setIsAbstained(isAbstained);

      socket.send(JSON.stringify({type: 'choice', message: {vote}}));
    } catch (e) {
    }
  };

  const renderTitle = (poolingState) => {
    switch (poolingState) {
      case POOLING_STATE.RESULTS:
        return <div className="page-title">Результаты голосования</div>;
      default:
        return null;
    }
  };

  return (
    <div className="page">
      {renderTitle(poolingState)}
      {!loading && vote ?
        <VoteCard
          vote={vote}
          poolingState={poolingState}
          onSubmitChoice={onSubmitChoiceHandler}
          answerId={answerId}
          isAbstained={isAbstained}/> :
        <Loader/>}
    </div>
  );
};