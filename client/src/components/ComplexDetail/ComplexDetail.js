import React, { useEffect, useCallback, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth.context';
import { useRequest } from '../../hooks/request.hook';
import Loader from '../../components/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const ComplexDetail = ({ id, getAllComplexes }) => {

  const [data, setData] = useState(null);

  const { request, loading } = useRequest();

  const { token } = useContext(AuthContext);

  const history = useHistory()


  const getComplexItemDetail = useCallback(async () => {
    try {
      const response = await request(`/programs/complexes/${id}`, 'GET', null, { 'Authorization': `Bearer ${token}` });
      setData(response);
    } catch (error) {
      console.log('er', error);
    }
  }, [token, request, id]);


  const deleteComplex = async () => {
    try {
      await request(`/programs/complexes/delete`, 'POST', { id }, { 'Authorization': `Bearer ${token}` });
      history.push('/complexes');
      getAllComplexes();  
    } catch (error) {
      console.log('er', error);
    }
  }


  useEffect(() => {
    getComplexItemDetail();
  }, [getComplexItemDetail])

  if (loading) {
    return <Loader loading={true} top="30%" />
  }

  return (

    <div className="jumbotron item-copmlex">
      <div className="top-panel">
        <h3 className="display-3">{data && data.name}</h3>
        <div className="del-button" onClick={deleteComplex}><FontAwesomeIcon icon={faTrashAlt} size="2x" className="highlight" ></FontAwesomeIcon></div>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Упражнение</th>
            <th scope="col">Группа мышц</th>
            <th scope="col">Подходы</th>
            <th scope="col">Повторения</th>
            <th scope="col">Вес</th>
          </tr>
        </thead>
        <tbody>
          {data && data.exercises.map((it, index) => {
            return (<tr className="table-secondary">
              <td>{index + 1}. {it.name.name}</td>
              <td>{it.name.bodyPart}</td>
              <td>{it.approachCoantity}</td>
              <td>{it.repetitionsNumber}</td>
              <td>{it.weight}</td>
            </tr>)
          })}


        </tbody>
      </table>
    </div>


  )
}
export default ComplexDetail;