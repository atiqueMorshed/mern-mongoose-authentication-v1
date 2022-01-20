import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/routing/screens/private-route.component';
import ForgotPasswordPage from './Pages/ForgotPasswordPage/forgot-password.page';
import LoginPage from './Pages/LoginPage/login.page';
import PrivatePage from './Pages/PrivatePage/private.page';
import RegisterPage from './Pages/RegisterPage/register.page';
import ResetPasswordPage from './Pages/ResetPasswordPage/reset-password.page';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/private-page"
          element={
            <PrivateRoute>
              <PrivatePage title="Props working" />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot" element={<ForgotPasswordPage />} />
        <Route path="/reset/:resetToken" element={<ResetPasswordPage />} />
      </Routes>
    </div>
  );
};

export default App;
