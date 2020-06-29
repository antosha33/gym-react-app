import React, {useState} from 'react';

const ComplexesListItem = ({ name, level, id, onItemSelectHanlder }) => {


  let span;

  switch (level) {
    case 'Новичок':
      span = <span className="badge badge-danger">{level}</span>
      break;
    case 'Продолжающий':
      span = <span className="badge badge-warning">{level}</span>
      break;
    default:
      span = <span className="badge badge-success">{level}</span>
  }

  const onClickHandler = (ev) =>{
    onItemSelectHanlder(id);
    const li = document.querySelectorAll('.list-group-item.d-flex.justify-content-between');
    const arrLi = Array.prototype.slice.apply(li);
    arrLi.forEach((item) => {
      if(ev.target === item){
        item.classList.add('active');
      }else{
        item.classList.remove('active');
      }
    })
  }

  return (
    <li className='list-group-item d-flex justify-content-between align-items-center list-group-item-action'
     onClick={onClickHandler}
     >
      {name}
      {span}
    </li>
  )
}

export default ComplexesListItem;