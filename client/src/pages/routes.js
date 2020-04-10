import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AuthPage from './AuthPage';
import MainPage from './MainPage';
import ProgramsPage from './ProgramsPage';


const Routes = ({ isAuthenticated }) => {

  if (!isAuthenticated) {
    return (
      <Route to="/">
        <AuthPage></AuthPage>
      </Route>
    )
  } else {
    return (
      <Switch>
        <Route path="/clients/:code">
          <h1>Peoples</h1>
        </Route>
        <Route path="/main">
          <MainPage />
        </Route>
        <Route path="/programs">
          <ProgramsPage />
        </Route>
        <Redirect to="/main" />

      </Switch>
    )
  }
}

export default Routes;