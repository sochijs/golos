import React from 'react';
import 'materialize-css';
import {useRoutes} from './routes';
import {BrowserRouter as Router} from 'react-router-dom';
import Header from './components/Layout/Header/Header';

function App() {
  const routes = useRoutes();
  return (
    <Router>
      <Header/>
      <div className="content">
        {routes}
      </div>
    </Router>
  );
}

export default App;
