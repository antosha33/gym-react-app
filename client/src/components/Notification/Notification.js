import React, { useState, useCallback } from 'react';
import evEmmiter from '../../helpers/evEmmiter';
import './notification.sass';





export const emmiter = new evEmmiter();

let isCooldown = false;

const Notification = () => {

  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState('');
  
  const deBounce = (fnc) => {
    return function () {
      if (isCooldown) return;
      fnc.call(null, ...arguments);
      isCooldown = true;
      setTimeout(() => isCooldown = false, 1500)
    }
  };

  const onShow = (msg) => {
    setMessage(msg);
    setIsActive(!isActive);
    setTimeout(() => setIsActive(false)
      , 800);
  };

  emmiter.on('notify', deBounce(onShow));

  const classes = isActive ? 'notification active' : 'notification';

  return (
    <>
      <div className={classes}><span>{message}</span></div>
    </>
  )
}

export default Notification;