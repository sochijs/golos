import React, {useCallback, useEffect, useState} from 'react';
import {useHttp} from '../hooks/http.hook';
import {useParams} from 'react-router';
import {VoteCard} from '../components/VoteCard';
import {PoolCard} from '../components/PoolCard';
import io from 'socket.io-client';

let socket;

export const VotePage = () => {
  const {loading, request} = useHttp();
  const voteId = useParams().id;
  const [vote, setVote] = useState(null);
  const [userVoted, setUserVoted] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);
  const [isDateExpired, setIsDateExpired] = useState(false);
  const END_POINT = 'http://localhost:5000';

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
    socket = io(END_POINT);
    socket.emit('join', {voteId});
    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [END_POINT, voteId]);

  useEffect(() => {
    socket.on('userChoice', ({vote}) => {
      console.log('vote', vote);
      setVote(vote);
    });
  }, [vote]);

  useEffect(() => {
    getVote();
  }, [getVote]);

  const onSelectAnswerHandler = async (voteId, answerId) => {
    if (userAnswer === answerId) {
      return false;
    }

    try {
      const {vote, userAnswerId} = await request('/api/vote/choice', 'POST', {voteId, answerId});
      setVote(vote);
      setUserVoted(true);
      setUserAnswer(userAnswerId);
      setIsDateExpired(new Date() >= new Date(vote.expired));

      socket.emit('choice', {vote, voteId, userAnswerId});
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