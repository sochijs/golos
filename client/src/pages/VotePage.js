import React, {useCallback, useEffect, useState} from 'react';
import {useHttp} from '../hooks/http.hook';
import {useParams} from 'react-router';
import {VoteCard} from '../components/VoteCard';
import {PoolCard} from '../components/PoolCard';

let socket = null;

export const VotePage = () => {
  const {loading, request} = useHttp();
  const voteId = useParams().id;
  const [vote, setVote] = useState(null);
  const [userVoted, setUserVoted] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);
  const [isDateExpired, setIsDateExpired] = useState(false);
  const END_POINT = 'ws://localhost:8080';

  const getVote = useCallback(async () => {
    try {
      const {vote, isVoted, userAnswerId} = await request(`/api/vote/${voteId}`, 'GET');
      setVote(vote);
      setUserVoted(isVoted);
      setUserAnswer(userAnswerId);
      setIsDateExpired(new Date() >= new Date(vote.expired));
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

  const onSelectAnswerHandler = async (voteId, answerId) => {
    if (userAnswer === answerId) {
      return false;
    }

    try {
      const {vote, userAnswerId} = await request('/api/vote/choice', 'POST', {voteId, answerId});
      setUserVoted(true);
      setUserAnswer(userAnswerId);
      setIsDateExpired(new Date() >= new Date(vote.expired));

      socket.send(JSON.stringify({type: 'choice', message: {vote}}));
    } catch (e) {
    }
  };

  if (loading) {
    return 'Loading...';
  }

  if (vote && isDateExpired) {
    return <PoolCard vote={vote}/>;
  }

  return (
    <>
      {!loading && vote &&
      <VoteCard vote={vote} onSelectAnswer={onSelectAnswerHandler} userVoted={userVoted} userAnswer={userAnswer}/>}
    </>
  );
};