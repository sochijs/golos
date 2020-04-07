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

  const getVote = useCallback(async () => {
    try {
      const {vote, isVoted, userAnswerId} = await request(`/api/vote/${voteId}`, 'GET');
      setVote(vote);
      setUserVoted(isVoted);
      setUserAnswer(userAnswerId);
    } catch (e) {
    }

  }, [request, voteId]);

  useEffect(() => {
    getVote();
  }, [getVote]);

  if (loading) {
    return 'Loading...';
  }

  const onSelectAnswerHandler = async (voteId, answerId) => {
    try {
      const data = await request('/api/vote/choice', 'POST', {voteId, answerId});
      console.log('data', data);
      getVote();
    } catch (e) {
    }
  };
  console.log('userVoted', userVoted);
  return (
    <>
      {userVoted ?
        vote && <PoolCard vote={vote} onSelectAnswer={onSelectAnswerHandler}/> :
        vote && <VoteCard vote={vote} onSelectAnswer={onSelectAnswerHandler}/>}
    </>
  );
};