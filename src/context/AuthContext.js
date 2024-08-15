import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginApi, signup as signupApi } from '../api/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      if (localStorage.getItem('token')) {
        if (
          window.location.pathname === '/signup' ||
          window.location.pathname === '/login'
        ) {
          navigate('/');
        }
        setAuth(true);
      } else {
        setAuth(false);
        if (
          window.location.pathname !== '/signup' &&
          window.location.pathname !== '/login'
        ) {
          navigate('/login');
        }
      }
    };
    checkAuth();
  }, [navigate]);

  const login = async (data) => {
    try {
      const response = await loginApi(data);
      if (response.error) {
        setError(response.error);
        return;
      }

      localStorage.setItem('token', response.token);
      setAuth(true);
      setSuccess('Successfully loged in');
      setError('');
      navigate('/');
    } catch (error) {
      setAuth(false);
      throw error;
    }
  };

  const signup = async (data) => {
    try {
      const response = await signupApi(data);
      if (response.error) {
        setError(response.error);
        return;
      }
      localStorage.setItem('token', response.token);
      setAuth(true);
      setSuccess('Successfully loged in');
      setError('');
      navigate('/');
    } catch (error) {
      setAuth(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{ auth, login, logout, signup, error, success }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
