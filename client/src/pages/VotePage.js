import React, {useCallback, useEffect, useState} from 'react';
import {useHttp} from '../hooks/http.hook';
import {useParams} from 'react-router';
import {VoteCard} from '../components/VoteCard';
import {PoolCard} from '../components/PoolCard';

export const VotePage = () => {
  const {loading, request} = useHttp();
  const voteId = useParams().id;
  const [vote, setVote] = useState(null);
  const [userVoted, setUserVoted] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);
  const [isDateExpired, setIsDateExpired] = useState(false);

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
    getVote();
  }, [getVote]);

  const onSelectAnswerHandler = async (voteId, answerId) => {
    if (userAnswer === answerId) {
      return false;
    }

    try {
      await request('/api/vote/choice', 'POST', {voteId, answerId});
      getVote();
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