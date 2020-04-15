import React from 'react';
import {useHttp} from '../hooks/http.hook';
import {useHistory} from 'react-router';
import CreateVote from '../components/CreateVote/CreateVote';

export const CreatePage = () => {
  const history = useHistory();
  const {loading, request} = useHttp();

  const onSubmitHandler = async (title, answers, isPublic) => {
    try {
      const data = await request('/api/vote/create', 'POST', {title, answers, isPublic});
      history.push(`/vote/${data.vote._id}`);
    } catch (e) {
    }
  };

  return (
    <div className="page">
      <h1 className="page-title">Создать опрос</h1>
      <CreateVote onSubmit={onSubmitHandler} loading={loading}/>
    </div>
  );
};