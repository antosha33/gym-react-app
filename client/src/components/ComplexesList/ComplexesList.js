import React, { useEffect} from 'react';
import {useHistory } from 'react-router-dom';


import ComplexesListItem from '../ComplexesListItem';
import Loader from '../Loader'

const ComplexesList = ({onItemSelectHanlder, items, getAllComplexes, loading}) => {
  
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