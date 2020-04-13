import React, { useEffect, useCallback } from 'react';
import {useHistory } from 'react-router-dom';

import ComplexesListItem from '../ComplexesListItem';

const ComplexesList = ({ getAllComplexes, items, onItemSelectHanlder, onShow }) => {

  const history = useHistory();

  useEffect(() => {
    getAllComplexes()
  }, [getAllComplexes])

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