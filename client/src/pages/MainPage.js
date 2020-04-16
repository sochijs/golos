import React, {useCallback, useEffect, useState} from 'react';
import {useHttp} from '../hooks/http.hook';
import {Helmet} from 'react-helmet';
import PublicVotes from '../components/PublicVotes/PublicVotes';
import Loader from '../components/UI/Loader/Loader';

const MainPage = () => {
  const {loading, request} = useHttp();
  const [votes, setVotes] = useState(null);

  const getVotes = useCallback(async () => {
    const {votes} = await request('/api/vote/', 'GET');

    setVotes(votes);
  }, [request]);

  useEffect(() => {
    getVotes();
  }, [getVotes]);

  return (
    <div className="page">
      <Helmet>
        <title>Главная страница</title>
      </Helmet>
      <h1 className="page-title">Главная страница</h1>
      {!loading && votes ? <PublicVotes votes={votes}/> : <Loader/>}
    </div>
  );
};

export default MainPage;