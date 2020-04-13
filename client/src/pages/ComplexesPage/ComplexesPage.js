import React, { useEffect, useCallback, useState, useContext } from 'react';
import {Route, useHistory } from 'react-router-dom';
import { useRequest } from '../../hooks/request.hook';
import AuthContext from '../../context/auth.context';
import { emmiter } from '../../components/Notification/Notification';

import ComplexesList from '../../components/ComplexesList';
import NewComplex from '../../components/NewComplex';
import ComplexDetail from '../../components/ComplexDetail';

import './complexespage.sass'

const ComplexesPage = ({ match }) => {
  const { request, loading } = useRequest();
  const [items, setItems] = useState([]);

  const { token } = useContext(AuthContext);
  const history = useHistory();

  const getAllComplexes = useCallback(async () => {
    try {
      const response = await request('/programs/complexes/', 'GET', null, { 'Authorization': `Bearer ${token}` });
      setItems(response);
    } catch (error) {
      emmiter.emmit('notyfi', error.message);
    }
  }, [request])

  const onItemSelectHanlder = (id) => {
    history.push(`/complexes/${id}`)
  }


  return (
    <div className="container-fluid complexes-page">
      <div className="row">
        <div className="col-md-4">
          <ComplexesList getAllComplexes={getAllComplexes} items={items} onItemSelectHanlder={onItemSelectHanlder}></ComplexesList>
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