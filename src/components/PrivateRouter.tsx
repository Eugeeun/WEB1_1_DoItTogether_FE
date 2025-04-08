import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouterProps {
  children: React.ReactNode;
}

const PrivateRouter: React.FC<PrivateRouterProps> = ({ children }) => {
  const token = localStorage.getItem('access_token');

  if (!token) {
    return <Navigate to='/' replace />;
  }

  return <>{children}</>;
};

export default PrivateRouter;
