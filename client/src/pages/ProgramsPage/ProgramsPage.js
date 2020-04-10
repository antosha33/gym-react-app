import React from 'react';
import Exercises from '../../components/Exercises';

import './exercisespage.sass'

const ProgramsPage = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6"></div>
        <div className="col-md-6">        <Exercises /></div>

      </div>
    </div>

  )
}

export default ProgramsPage;