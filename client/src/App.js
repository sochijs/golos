import React from 'react';
import 'materialize-css';
import {useRoutes} from './routes';
import {BrowserRouter as Router} from 'react-router-dom';
import {Navbar} from './components/Navbar';

function App() {
  const routes = useRoutes();
  return (
    <Router>
      <Navbar/>
      <div className="container">
        {routes}
      </div>
    </Router>
  );
}

export default App;
