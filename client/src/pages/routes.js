import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AuthPage from './AuthPage';
import MainPage from './MainPage';
import ProgramsPage from './ProgramsPage';
import ComplexesPage from './ComplexesPage';
import Workouts from '../components/Workouts';


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
        <Route path="/clients/:code?" component={Workouts}>
        </Route>
        <Route path="/main">
          <MainPage />
        </Route>
        <Route path="/programs">
          <ProgramsPage />
        </Route>
        <Route path="/complexes/:id?" component={ComplexesPage}>
        </Route>
        <Redirect to="/main" />

      </Switch>
    )
  }
}

export default Routes;