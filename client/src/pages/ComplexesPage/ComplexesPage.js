import React from 'react';

import ComplexesList from '../../components/ComplexesList';
import NewComplex from '../../components/NewComplex';

import './complexespage.sass'

const ComplexesPage = () => {


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4">
          <ComplexesList></ComplexesList>
        </div>
        <div className="col-md-8">
          <NewComplex></NewComplex>
        </div>
      </div>
    </div>
  )
}

export default ComplexesPage;