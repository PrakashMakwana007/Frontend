// src/components/ProtectedRoute.jsx
import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { refreshAccessToken } from '../api/auth.api';

const ProtectedRoute = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { accessToken, refreshToken, user } = useSelector((state) => state.auth);
  const [isVerifying, setIsVerifying] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      setIsVerifying(true);
      
      //  console.log("access", accessToken);
        //  console.log("refresh", refreshToken);  
      if (accessToken) {
        // If we have an access token, consider the user authenticated
        setIsAuthenticated(true);
      } else if (refreshToken) {
        // If we have a refresh token, try to get a new access token
        try {
          await dispatch(refreshAccessToken(refreshToken)).unwrap();
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Token refresh failed:', error);
          setIsAuthenticated(false);
        }

      } else {
        // No tokens available, user is not authenticated
        setIsAuthenticated(false);
      }
      
      setIsVerifying(false);
    };

    verifyAuth();
  }, [accessToken, refreshToken, dispatch]);

  // Show loading spinner while verifying authentication
  if (isVerifying) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;