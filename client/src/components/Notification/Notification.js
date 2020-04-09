import React, { useState } from 'react';
import evEmmiter from '../../helpers/evEmmiter';
import './notification.sass';


export const emmiter = new evEmmiter();

const Notification = () => {

  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState('');

  const onShow = (msg) => {
    setMessage(msg);
    setIsActive(!isActive,);
    setTimeout(() =>setIsActive(false)
    , 1500);
  }

  emmiter.on('notify', onShow);

  const classes = isActive ? 'notification active' : 'notification';

    return(
    <>
      <div className = {classes}><span>{message}</span></div>
    </>
    )
}

export default Notification;