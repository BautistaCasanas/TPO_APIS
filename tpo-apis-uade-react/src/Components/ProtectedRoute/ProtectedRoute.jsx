// src/components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';

function ProtectedRoute({ children }) {
    const { isLogged} = useContext(UserContext);
    let isAuthenticated = isLogged();

  if (!isAuthenticated) {

    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
