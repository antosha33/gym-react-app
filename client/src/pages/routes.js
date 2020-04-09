import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import AuthPage from './AuthPage';
import useAuth from '../hooks/auth.hook';
import Loader from '../components/Loader';

const Routes = ( {isAuthenticated}) => {

  if(!isAuthenticated){
    return (
      <Route to="/">
        <AuthPage></AuthPage>
      </Route>
    )
  }else{
    return(
      <Switch>
        <Route path="/peoples">
          <h1>Peoples</h1>
        </Route>
        <Redirect to="/main">
          <h1>Main</h1>
        </Redirect>
      </Switch>
    )
  }
}

export default Routes;