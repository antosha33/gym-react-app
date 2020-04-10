import React, { useState, useContext, useMemo } from 'react';
import { useRequest } from '../../hooks/request.hook';
import AuthContext from '../../context/auth.context';
import { emmiter } from '../../components/Notification';
import Loader from '../../components/Loader';


const CreateClient = ({update}) => {

  const initialInputValues = useMemo(() => (
    {
      name: '',
      surname: '',
      age: '',
      weight: '',
      aim: '',
      description: ''
    }), [])

    
  const { token } = useContext(AuthContext)

  const { request } = useRequest();

  const [showCreate, setShowCreate] = useState(false);


  const [values, setValues] = useState(initialInputValues);
  const [loader, setLoader] = useState(false);

  const showHandler = () => {
    setShowCreate(!showCreate);
  }

  const onchangeHandler = (ev) => {
    setValues({
      ...values,
      [ev.target.name]: ev.target.value
    })
  }

  const createHandler = async () => {
    setLoader(true);
    try {
      const response = await request('/clients/create', 'POST', { ...values }, { 'Authorization': `Bearer ${token}` });
      emmiter.emmit('notify', response.message);
      setShowCreate(false);
      setValues(initialInputValues);
      update();
      setLoader(false);
    } catch (error) {
      emmiter.emmit('notify', error.message);
    }
  }

  if(loader){
    return <Loader loading={true} top={'30%'}></Loader>
  }

  if (showCreate) {
    return (
      <>
        <button type="button" onClick={showHandler} className="btn btn-primary">Создать нового клиента</button>
        <div className="jumbotron">
          <h3 className="display-5"> Новый клиент! </h3>
          <form className="createClient">
            <div className="form-group">
              <label className="col-form-label col-form-label-sm" htmlFor="inputSmall">Имя</label>
              <input className="form-control form-control-sm" name="name" type="text" placeholder="Имя" onChange={onchangeHandler} value={values.name} />
            </div>
            <div className="form-group">
              <label className="col-form-label col-form-label-sm" htmlFor="inputSmall">Фамилия</label>
              <input className="form-control form-control-sm" name="surname" type="text" placeholder="Фамилия" onChange={onchangeHandler} value={values.surname} />
            </div>
            <div className="form-group">
              <label className="col-form-label col-form-label-sm" htmlFor="inputSmall">Возраст</label>
              <input className="form-control form-control-sm" name="age" type="text" placeholder="Возраст" onChange={onchangeHandler} value={values.age} />
            </div>
            <div className="form-group">
              <label className="col-form-label col-form-label-sm" htmlFor="inputSmall">Вес</label>
              <input className="form-control form-control-sm" name="weight" type="text" placeholder="Вес" onChange={onchangeHandler} value={values.weight} />
            </div>
            <div className="form-group">
              <label className="col-form-label col-form-label-sm" htmlFor="inputSmall">Цель</label>
              <input className="form-control form-control-sm" name="aim" type="text" placeholder="Цель" onChange={onchangeHandler} value={values.aim} />
            </div>
            <div className="form-group">
              <label className="col-form-label" htmlFor="inputDefault">Дополнительная ифнормация</label>
              <input type="text" className="form-control" name="description" placeholder="Дополнительная ифнормация" onChange={onchangeHandler} value={values.description} />
            </div>
            <button type="button" onClick={createHandler} className="btn btn-success">Создать</button>
          </form>

        </div>
      </>
    )
  } else {
    return (
      <button type="button" onClick={showHandler} className="btn btn-success">Создать нового клиента</button>
    )
  }
}

export default CreateClient;