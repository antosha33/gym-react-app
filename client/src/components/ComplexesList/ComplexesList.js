import React, { useEffect, useCallback, useState, useContext} from 'react';
import {useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth.context';
import { useRequest } from '../../hooks/request.hook';
import { emmiter } from '../../components/Notification/Notification';

import ComplexesListItem from '../ComplexesListItem';
import Loader from '../Loader'

const ComplexesList = ({onItemSelectHanlder}) => {

  const { request, loading } = useRequest();
  const { token } = useContext(AuthContext);
  const [items, setItems] = useState([]);

  const getAllComplexes = useCallback(async () => {
    try {
      const response = await request('/programs/complexes/', 'GET', null, { 'Authorization': `Bearer ${token}` });
      setItems(response);
    } catch (error) {
      emmiter.emmit('notyfi', error.message);
    }
  }, [request])
  
  const history = useHistory();

  useEffect(() => {
    getAllComplexes()
  }, [getAllComplexes])

  if(loading){
    return <Loader loading={true} top={'30%'}></Loader>
  }

  return (
    <ul className="list-group">
      <li className="list-group-item d-flex justify-content-between align-items-center" onClick={()=>history.push('/complexes')}>
        Создать новый комплекс
    </li>
      {items.map((it) => {
        return <ComplexesListItem name={it.name} level={it.level} id={it.id} onItemSelectHanlder={onItemSelectHanlder} />
      })}
    </ul>
  )
}

export default ComplexesList;