import React from 'react';
import { Navigate, Route } from 'react-router-dom';
type iProps = {
  children: JSX.Element;
};
const PrivateRoute = ({ children }: iProps) => {
  return localStorage.getItem('authToken') ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
