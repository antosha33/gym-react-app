import React from 'react';
import Routes from './pages/routes';
import {BrowserRouter as Router} from 'react-router-dom';
import './css/main.min.css';

function App() {

  return (
    <Router>
      <Routes isAuthenticated={false}/>
    </Router>
  );
}

export default App;
