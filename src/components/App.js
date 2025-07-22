<<<<<<< Updated upstream
import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
=======
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
>>>>>>> Stashed changes

import Home from 'components/Home';
import Login from 'components/auth/Login';
import Logout from 'components/auth/Logout';
import Signup from 'components/auth/Signup';
import SignupWelcome from 'components/auth/SignupWelcome';
import Recovery from 'components/auth/Recovery';
import RecoveryMessage from 'components/auth/RecoveryMessage';
import RecoveryForm from 'components/auth/RecoveryForm'
import NewProject from 'components/project_admin/registry/Panel';

<<<<<<< Updated upstream
class App extends React.Component
{
  render()
  {
    return (
      <Switch>
        <Route path='/login/:action?' component={Login} />
        <Route path='/logout' component={Logout} />
        <Route path="/projects/new" component={NewProject} />
        <Route path='/signup/welcome' component={SignupWelcome} />
        <Route path='/signup' component={Signup} />
        <Route path='/recovery_password/:token' component={RecoveryForm} />
        <Route path='/recovery_message/:type' component={RecoveryMessage} />
        <Route path='/recovery' component={Recovery} />
        <Route path='/app' component={Home} />
        <Redirect to='/app' />
      </Switch>
    );
  }
=======
function App() {
  return (
    <Routes>
      <Route path="/login/:action?" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/projects/new" element={<NewProject />} />
      <Route path="/signup/welcome" element={<SignupWelcome />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/recovery_password/:token" element={<RecoveryForm />} />
      <Route path="/recovery_message/:type" element={<RecoveryMessage />} />
      <Route path="/recovery" element={<Recovery />} />
      <Route path="/app/*" element={<Home />} />
      <Route path="*" element={<Navigate to="/app" replace />} />
    </Routes>
  );
>>>>>>> Stashed changes
}

export default App;
