import React from 'react';
import './loader.sass';


const Loader = ({loading, top}) => {

  const style = loading ? 'box active' : 'box';

  return (
    <div className={style} style={{top}}>
      <div className="content">
      </div>
    </div>
  )
}

export default Loader;