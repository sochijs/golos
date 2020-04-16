import React from 'react';
import {Redirect, Route, Switch} from 'react-router';
import {CreatePage} from './pages/CreatePage';
import {VotePage} from './pages/VotePage';
import MainPage from './pages/MainPage';

export const useRoutes = () => {
  return <Switch>
    <Route path="/" exact>
      <MainPage/>
    </Route>
    <Route path="/create">
      <CreatePage/>
    </Route>
    <Route path="/vote/:id">
      <VotePage/>
    </Route>
    <Redirect to="/"/>
  </Switch>;
};