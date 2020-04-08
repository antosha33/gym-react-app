import React from 'react';
import {Route, Switch} from 'react-router-dom';
import AuthPage from './AuthPage';

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
      <Route to="/main"></Route>
      <Route redirect="/"></Route>
      </Switch>
    )
  }
}

export default Routes;