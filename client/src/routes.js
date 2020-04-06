import React from 'react';
import {Redirect, Route, Switch} from 'react-router';
import {CreatePage} from './pages/CreatePage';
import {VotePage} from './pages/VotePage';

export const useRoutes = () => {
  return <Switch>
    <Route path="/create">
      <CreatePage/>
    </Route>
    <Route path="/vote/:id">
      <VotePage/>
    </Route>
    <Redirect to="/create"/>
  </Switch>;
};