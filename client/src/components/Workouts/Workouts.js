import React, { useEffect, useState, useContext, useCallback } from 'react';

import AuthContext from '../../context/auth.context';
import { useRequest } from '../../hooks/request.hook';

import NewWorkout from '../NewWorkout';

const Workouts = ({ match }) => {

  const [isUpdate, setIsUpdate] = useState(false);

  const updateHandler = () => {
    setIsUpdate(!isUpdate);
  }

  const id = match.code;

  const { token } = useContext(AuthContext);

  const [items, setItems] = useState([]);

  const { request, loading } = useRequest();


  const getWorkouts = useCallback(async () => {
    try {
      const response = await request(`/clients/${id}`, 'GET', null, { 'Authorization': `Bearer ${token}` });
      console.log(response);
    } catch (error) {

    }
  }, [id])



  useEffect(() => {
    getWorkouts()
  }, [getWorkouts]);


  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-7'>
          </div>
        <div className='col-md-5'>
        <NewWorkout />
          </div>

      </div>
    </div>

  )
}

export default Workouts;