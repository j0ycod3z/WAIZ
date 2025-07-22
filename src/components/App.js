import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from 'components/Home';
import Login from 'components/auth/Login';
import Logout from 'components/auth/Logout';
import Signup from 'components/auth/Signup';
import SignupWelcome from 'components/auth/SignupWelcome';
import Recovery from 'components/auth/Recovery';
import RecoveryMessage from 'components/auth/RecoveryMessage';
import RecoveryForm from 'components/auth/RecoveryForm';
import NewProject from 'components/project_admin/registry/Panel';

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
}//not fully fixed yet, still to test for other modules

export default App;
