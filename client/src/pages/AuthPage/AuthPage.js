import React, { useState } from 'react';
import { useRequest } from '../../hooks/request.hook';
import Loader from '../../components/Loader';
import { emmiter } from '../../components/Notification'

import './authPage.sass';

const AuthPage = () => {

  const [authData, setAuthData] = useState({
    login:'',
    password:'',
  });

  const { request, loading } = useRequest();

  const onChanheHandler = (ev) => {
    setAuthData({
      ...authData,
      [ev.target.name]: ev.target.value,   
    })
  }

  const registerHandler = async(ev) => {
    ev.preventDefault();
    try {
      const response = await request('/auth/register', 'POST', {...authData});
      emmiter.emmit('notify', response.message);
    } catch (error) {
      emmiter.emmit('notify', error.message);
    }
  }

  const loginHandler = async(ev) => {
    ev.preventDefault();
    try {
      const response = await request('/auth/login', 'POST', {...authData});
      const data = await response.json();
      
    } catch (error) {
      emmiter.emmit('notify', error.message);
    }

  }

  return (

    <form className="main-auth">

    <Loader loading={loading}></Loader>
      <div className="form-group">
        <label htmlFor="login">Логин</label>
        <input type="text"
         name="login"
        className="form-control"
        id="login"
        aria-describedby="login"
        placeholder="Ваш логин"
        required
        value = {authData.login}
        onChange={onChanheHandler}
          />
      </div>
      <div className="form-group">
        <label htmlFor="password">Пароль</label>
        <input type="password"
        name="password"
        className="form-control"
        id="password"
        aria-describedby="password"
        placeholder="Ваш пароль"
        required
        value = {authData.password}
        onChange={onChanheHandler}/>
      </div>
      <div className="auth-buttons">
        <button type="submit" onClick={registerHandler} className="btn btn-primary">Регистрация</button>
        <button type="submit" onClick={loginHandler} className="btn btn-success">Войти</button>
      </div>
    </form>
  )
}

export default AuthPage;