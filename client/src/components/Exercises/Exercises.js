import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useRequest } from '../../hooks/request.hook';
import AuthContext from '../../context/auth.context';
import { emmiter } from '../Notification/Notification';
import Loader from '../../components/Loader';

const Exercises = () => {

  const { request, loading } = useRequest();

  const { token } = useContext(AuthContext);

  const [inputValues, setInputValues] = useState({
    name: '',
    bodyPart: '',
  });

  const [exercises, setExercises] = useState([]);

  const onInputChangeHandler = (ev) => {

    setInputValues({
      ...inputValues,
      [ev.target.name]: ev.target.value.toUpperCase()
    })
  }

  const onSubmitHandler = async () => {
    try {
      const response = await request('/programs/exercise/create', 'POST', { ...inputValues }, { 'Authorization': `Bearer ${token}` });
      emmiter.emmit('notify', response.message);
      setInputValues({
        name: '',
        bodyPart: '',
      })
      getAllExercises();
    } catch (error) {
      emmiter.emmit('notify', error.message);
    }
  }

  const onDeleteHandler = async (ev) => {
    try {
      const response = await request('/programs/exercise/delete', 'POST', { id: ev.target.getAttribute('data-id') }, { 'Authorization': `Bearer ${token}` });
      getAllExercises();
      emmiter.emmit('notify', response.message);
    } catch (error) {
      emmiter.emmit('notify', error.message);
    }


  }

  const getAllExercises = useCallback(async () => {
    const response = await request('/programs/exercise/', 'GET', null, { 'Authorization': `Bearer ${token}` });
    setExercises(response);
  }, [token, request])

  useEffect(() => {
    getAllExercises()
  }, [getAllExercises]);

  if (loading) {
    return (
      <div className="jumbotron table-container loader">
        <Loader loading={true} top={'30%'}></Loader>
      </div>
    )
  }

  return (
    <div className="row">
      <div className="col-md-12"> <div className="jumbotron table-container">
        <h1 className="display-5">Упражнения</h1>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Упражнение</th>
              <th scope="col">Группа мышц</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-default">
              <td><input type="text" name="name" value={inputValues.name} className="form-control-plaintext" onChange={onInputChangeHandler} /></td>
              <td><input type="text" name="bodyPart" value={inputValues.bodyPart} className="form-control-plaintext" onChange={onInputChangeHandler} /></td>
              <td><button type="button" onClick={onSubmitHandler} className="btn btn-success" >Добавить</button></td>
            </tr>
            {exercises.map((it) => {
              return (
                <tr className="table-active" key={it._id}>
                  <td><p>{it.name}</p></td>
                  <td><p>{it.bodyPart}</p></td>
                  <td><button type="button" className="btn btn-danger" onClick={onDeleteHandler} data-id={it._id}>Удалить</button> </td>
                </tr>
              )
            })
            }
          </tbody>
        </table>
      </div >
      </div>
    </div>
  )
}

export default Exercises;