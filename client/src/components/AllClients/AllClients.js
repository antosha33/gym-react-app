import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useRequest } from '../../hooks/request.hook';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth.context';

const AllClients = ({ updater }) => {
  const [clients, setClients] = useState([]);
  const history = useHistory()
  const { request } = useRequest();
  const { token } = useContext(AuthContext);
  const fetchedClients = useCallback(async () => {
    try {
      const response = await request('/clients/', 'GET', null, { 'Authorization': `Bearer ${token}` });
      setClients(response);
    } catch (e) {
      console.log(e);
    }
  }, [request, token, updater])

  useEffect(() => {
    fetchedClients();
  }, [fetchedClients]);

  if (!clients.length) {
    return <p className="center">Клиентов пока нет</p>
  }

  return (
    <>
      <div className="container">
        <div className="row">
          {clients.map(it => {
            return (
              <div className="col-lg-3" key={it._id}>
                <div className="card text-white bg-primary mb-3" onClick={() => history.push(`clients/${it._id}`)} style={{ 'maxwidth': '20rem' }}>
                  <div className="card-header"><div className="card-name"><h3>{it.name} {it.surname}</h3></div> <div className="card-logo"></div> </div>
                  <p className="card-text">Дата начала тренировок: {new Date(it.dateOfStart).toLocaleDateString()}</p>
                  <p className="card-text">Возраст: {it.age}</p>
                  <p className="card-text">Вес: {it.weight}</p>
                  <p className="card-text">Цель: {it.aim}</p>
                  <p className="card-text">Описание: {it.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
};

export default AllClients;