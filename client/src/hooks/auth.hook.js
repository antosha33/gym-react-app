import React, { useState, useCallback, useEffect } from 'react';
import {useRequest} from './request.hook';
import { set } from 'mongoose';



const useAuth = () => {


  const [token, setToken] = useState(null);
  const [userId, setuserId] = useState(null);
  const [ready, setReady] = useState(false);

  const login =  useCallback((jwtToken, user) => {
    setToken(jwtToken);
    setuserId(user);
    localStorage.setItem('userData', JSON.stringify({jwtToken, user}));
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
      setReady(true);
    }
  }, [])

  return {token, login, logout, ready, userId }
}

export default useAuth;