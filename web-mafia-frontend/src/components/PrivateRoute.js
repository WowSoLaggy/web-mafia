// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { user, token, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Или любой индикатор загрузки
  }

  if (!token) {
    return <Navigate to="/auth" />;
  }

  return user ? <Component {...rest} /> : <Navigate to="/auth" />;
};

export default PrivateRoute;
