import React, {useCallback, useEffect, useState} from 'react';
import {useHttp} from '../hooks/http.hook';
import {useParams} from 'react-router';
import {VoteCard} from '../components/VoteCard/VoteCard';
import Results from '../components/Results/Results';

let socket = null;

export const VotePage = () => {
  const {loading, request} = useHttp();
  const voteId = useParams().id;
  const [vote, setVote] = useState(null);
  const [userVoted, setUserVoted] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);
  const [userAbstained, setUserAbstained] = useState(false);
  const [isDateExpired, setIsDateExpired] = useState(false);
  const END_POINT = 'ws://localhost:8080';

  const getVote = useCallback(async () => {
    try {
      const {vote, isVoted, userAnswerId, userAbstained} = await request(`/api/vote/${voteId}`, 'GET');
      setVote(vote);
      setUserVoted(isVoted);
      setUserAnswer(userAnswerId);
      setUserAbstained(userAbstained);
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

  const onSubmitChoiceHandler = async (voteId, answerId, abstained = false) => {

    if (userAnswer === answerId && !abstained) {
      return false;
    }

    try {
      const {vote, userAnswerId, userAbstained} = await request('/api/vote/choice', 'POST', {
        voteId,
        answerId,
        abstained
      });
      setVote(vote);
      setUserVoted(true);
      setUserAnswer(userAnswerId);
      setUserAbstained(userAbstained);
      setIsDateExpired(new Date() >= new Date(vote.expired));

      socket.send(JSON.stringify({type: 'choice', message: {vote}}));
    } catch (e) {
    }
  };

  if (loading) {
    return 'Loading...';
  }

  if (vote && isDateExpired) {
    return <Results answers={vote.answers} countVotes={vote.votes} userAnswer={userAnswer}/>;
  }

  return (
    <>
      {!loading && vote &&
      <VoteCard vote={vote}
                onChoice={onSubmitChoiceHandler}
                userVoted={userVoted}
                userAnswer={userAnswer}
                userAbstained={userAbstained}
                setUserAnswer={setUserAnswer}/>}
    </>
  );
};