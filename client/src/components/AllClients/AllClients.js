import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useRequest } from '../../hooks/request.hook';
import { useHistory } from 'react-router-dom';
import { emmiter } from '../../components/Notification';
import AuthContext from '../../context/auth.context';
import Loader from '../Loader';
import Modal from 'react-awesome-modal';

const AllClients = ({ updater }) => {
  const [clients, setClients] = useState([]);
  const [modal, setModal] = useState({
    visible: true,
    id: null
  });
  const history = useHistory()
  const { request, loading } = useRequest();
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

  const onDeleteClient = async (id) => {
    setModal({
      ...modal,
      id,
      visible: true,
    });
  }
  const onDeleteConfirm = async () => {
    try {
      const response = await request('/clients/delete', 'POST', { id: modal.id }, { 'Authorization': `Bearer ${token}` });
      emmiter.emmit('notify', response.message);
      fetchedClients();
    } catch (e) {
      console.log(e)
    }
    setModal({
      id: null,
      visible: false,
    });
  }

  const onDeleteDeclined = async () => {
    setModal({
      id: null,
      visible: false,
    });
  }


  if (loading) {
    return <Loader loading={true} top={'30%'}></Loader>
  }

  if (!clients.length) {
    return <p className="center">Клиентов пока нет</p>
  }

  return (
    <>
      <div className="container">
        <Modal visible={modal.visible} display="inline-block" backgroundColor="none">
          <div class="modal">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Вы действительно хотите удалить клиента?</h5>
              </div>
              <div class="modal-body">
                <button type="button" class="btn btn-success" onClick={() => onDeleteConfirm()}>Удалить</button>
                <button type="button" class="btn btn-secondary" onClick={() => onDeleteDeclined()}>Отменить</button>
              </div>
            </div>
          </div>
        </div>
        </Modal>
      <div className="row">
        {clients.map(it => {
          return (
            <div className="col-lg-3" key={it._id}>
              <div className="card text-white bg-primary mb-3" style={{ 'maxwidth': '20rem' }}>
                <div className="card-wrapper" onClick={() => history.push(`clients/${it._id}`)}>
                  <div className="card-header"><div className="card-name"><h3>{it.name} {it.surname}</h3></div> <div className="card-logo"></div> </div>
                  <p className="card-text">Дата начала тренировок: {new Date(it.dateOfStart).toLocaleDateString()}</p>
                  <p className="card-text">Возраст: {it.age}</p>
                  <p className="card-text">Вес: {it.weight}</p>
                  <p className="card-text">Цель: {it.aim}</p>
                  <p className="card-text">Описание: {it.description}</p>
                </div>
                <button type="button" class="btn btn-danger" onClick={() => onDeleteClient(it._id)}>Удалить</button>
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