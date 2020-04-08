import React from 'react';
import Routes from './pages/routes';
import { BrowserRouter as Router } from 'react-router-dom';
import './css/main.min.css';
import Notification from './components/Notification';
import AuthContext from "./context/auth.context";
import useAuth from './hooks/auth.hook';
import Loader from './components/Loader';


function App() {

  const { login, logout, token, userId, ready } = useAuth();
  const isAuthenticated = !! token;

  if(!ready){
    return <Loader loading={true} top={'30%'}/>
  }

  return (
    <>
      <Notification />
      <AuthContext.Provider value={{login, logout, token, userId}}>
        <Router>
          <Routes isAuthenticated={isAuthenticated} />
        </Router>
      </AuthContext.Provider>
    </>
  );
}

export default App;
