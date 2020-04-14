import React from 'react';
import {Route, useHistory } from 'react-router-dom';


import ComplexesList from '../../components/ComplexesList';
import NewComplex from '../../components/NewComplex';
import ComplexDetail from '../../components/ComplexDetail';

import './complexespage.sass'

const ComplexesPage = () => {

  const history = useHistory();

  const onItemSelectHanlder = (id) => {
    history.push(`/complexes/${id}`)
  }


  return (
    <div className="container-fluid complexes-page">
      <div className="row">
        <div className="col-md-4">
          <ComplexesList 
            onItemSelectHanlder={onItemSelectHanlder}
            ></ComplexesList>
        </div>
        <div className="col-md-8">
          <Route path='/complexes'
                 component={ NewComplex }
                 exact
          />
          <Route path='/complexes/:id'
                 render={
                   ({match}) => {
                    return <ComplexDetail id={match.params.id} />
                  }
                }
          />
        </div>
      </div>
    </div>
  )
}

export default ComplexesPage;