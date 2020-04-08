import React, { useState, useCallback, useEffect } from 'react';
import {useRequest} from './request.hook';



const useAuth = () => {

  const {loading, request, error } = useRequest();

  const [token, setToken] = useState(null);
  const [userId, setuserId] = useState(null);

  const login =  useCallback((jwtToken, user) => {
    setToken(jwtToken);
    setuserId(user);
    localStorage.setItem('userData', JSON.stringify({jwtToken, userId}));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('userData');
    setToken(null);
    setuserId(null);
  }, []);

  useEffect(() => {
    if(localStorage.getItem('userData')){
      const {jwtToken, userId} = JSON.parse(localStorage.getItem('userData'));
      setToken(jwtToken);
      setuserId(userId);
    }
  }, [])

  return {token, login, logout, error}
}