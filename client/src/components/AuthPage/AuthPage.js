import React, { useState } from 'react';
import { useRequest } from '../../hooks/request.hook';
import Loader from '../Loader';

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
      console.log(response);
    } catch (error) {
    }
  }

  return (
  
    <form className="main-auth">
    <Loader loading={loading}></Loader>
      <div className="form-group">
        <label htmlFor="login">Логин</label>
        <input type="text"
         name="login"
         class="form-control"
        id="login"
        aria-describedby="login"
        placeholder="Ваш логин"
        value = {authData.login}
        onChange={onChanheHandler}
          />
      </div>
      <div className="form-group">
        <label htmlFor="password">Пароль</label>
        <input type="password"
        name="password"
        class="form-control"
        id="password"
        aria-describedby="password"
        placeholder="Ваш пароль"
        value = {authData.password}
        onChange={onChanheHandler}/>
      </div>
      <div className="auth-buttons">
        <button type="submit" onClick={registerHandler} class="btn btn-primary">Регистрация</button>
        <button type="submit" class="btn btn-success">Войти</button>
      </div>
    </form>
  )
}

export default AuthPage;