import React, { useState } from 'react';
import { useRequest } from '../hooks/request.hook';
import './authPage.sass';

const AuthPage = () => {

  const [authData, setAuthData] = useState({});


  const { request, loading } = useRequest();

  const registerHandler = () => {

  }

  return (
    <div className="main-auth">
      <div className="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div className="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div className="auth-buttons">
        <button type="button" class="btn btn-primary">Регистрация</button>
        <button type="button" class="btn btn-success">Войти</button>
      </div>
    </div>
  )
}

export default AuthPage;