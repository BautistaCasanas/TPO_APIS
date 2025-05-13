// src/components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';

function ProtectedRoute({ children }) {
    const { auth} = useContext(UserContext);
    let isAuthenticated = auth?.token;
  if (!isAuthenticated) {

    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
