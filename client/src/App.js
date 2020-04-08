import React from 'react';
import Routes from './pages/routes';
import {BrowserRouter as Router} from 'react-router-dom';
import './css/main.min.css';
import Notification, { emmiter } from './components/Notification';


function App() {

  return (
    <>
    <Notification/>
    <Router>
      <Routes isAuthenticated={false}/>
    </Router>
    </>
  );
}

export default App;
