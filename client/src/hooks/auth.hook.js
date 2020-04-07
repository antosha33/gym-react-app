import React, { useState } from 'react';
import {useRequest} from './request.hook';



const useAuth = () => {

  const {loading, request, error } = useRequest();

  const [token, setToken] = useState(null);

  const login = async () => {
    request('/login')
  }

  const logout = () => {

  }

  return {token, login, logout, error}
}