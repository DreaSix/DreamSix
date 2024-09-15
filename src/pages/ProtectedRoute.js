import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import {useAuth} from '../Context/AuthContext'

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth()
  console.log(isAuthenticated )
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
