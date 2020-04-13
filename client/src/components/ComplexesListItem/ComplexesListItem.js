import React from 'react';

const ComplexesListItem = ({ name, level, id, onItemSelectHanlder }) => {

  let span;

  switch (level) {
    case 'Новичок':
      span = <span class="badge badge-danger">{level}</span>
      break;
    case 'Продолжающий':
      span = <span class="badge badge-warning">{level}</span>
      break;
    default:
      span = <span class="badge badge-success">{level}</span>
  }

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => onItemSelectHanlder(id)}>
      {name}
      {span}
    </li>
  )
}

export default ComplexesListItem;