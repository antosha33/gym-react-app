import React,{useState, useCallback} from 'react';
import {Route, useHistory } from 'react-router-dom';
import { useGetData } from '../../hooks/getData.hook';
import { emmiter } from '../../components/Notification/Notification';

import ComplexesList from '../../components/ComplexesList';
import NewComplex from '../../components/NewComplex';
import ComplexDetail from '../../components/ComplexDetail';


import './complexespage.sass'

const ComplexesPage = () => {

  const history = useHistory();

  const [items, setItems] = useState([]);

  const { getAllComplexes : getComplexes, loading } = useGetData();

  const getAllComplexes = useCallback(async () => {
    try {
      const response = await getComplexes();
      setItems(response);
    } catch (error) {
      emmiter.emmit('notyfi', error.message);
    } 
  }, [getComplexes]);
  

  const onItemSelectHanlder = (id) => {
    history.push(`/complexes/${id}`)
  }

  return (
    <div className="container-fluid complexes-page">
      <div className="row">
        <div className="col-md-4">
          <ComplexesList 
            onItemSelectHanlder={onItemSelectHanlder}
            items={items}
            getAllComplexes={getAllComplexes}
            loading={loading}
            ></ComplexesList>
        </div>
        <div className="col-md-8">
          <Route path='/complexes'
                  exact
                 render={
                  () => {
                   return <NewComplex  getAllComplexes={getAllComplexes} />
                 }
                 }
          />
          <Route path='/complexes/:id'
                 render={
                   ({match}) => {
                    return <ComplexDetail id={match.params.id} getAllComplexes={getAllComplexes} />
                  }
                }
          />
        </div>
      </div>
    </div>
  )
}

export default ComplexesPage;