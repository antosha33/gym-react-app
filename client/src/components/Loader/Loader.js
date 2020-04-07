import React from 'react';
import './loader.sass';


const Loader = ({loading}) => {

  const style = loading ? 'box active' : 'box';

  return (
    <div className={style}>
      <div className="content">
      </div>
    </div>
  )
}

export default Loader;