import React, {useCallback, useEffect, useState} from 'react';
import {useHttp} from '../hooks/http.hook';
import {useParams} from 'react-router';
import {VoteCard} from '../components/VoteCard';

export const VotePage = () => {
  const {loading, request} = useHttp();
  const voteId = useParams().id;
  const [vote, setVote] = useState(null);

  const getVote = useCallback(async () => {
    try {
      const fetched = await request(`/api/vote/${voteId}`, 'GET');
      setVote(fetched);
    } catch (e) {
    }

  }, [request, voteId]);

  useEffect(() => {
    getVote();
  }, [getVote]);

  if (loading) {
    return 'Loading...';
  }

  const onSelectAnswerHandler = (voteId, answerId) => {
    console.log('voteId', voteId);
    console.log('answerId', answerId);
  };

  return (
    <>
      {!loading && vote && <VoteCard vote={vote} onSelectAnswer={onSelectAnswerHandler}/>}
    </>
  );
};