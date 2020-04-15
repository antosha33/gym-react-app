import React, { useEffect, useCallback, token, useState, useContext } from 'react';
import AuthContext from '../../context/auth.context';
import { useRequest } from '../../hooks/request.hook';
import Loader from '../../components/Loader';

const ComplexDetail = ({ id }) => {

  const [data, setData] = useState(null);

  const { request, loading } = useRequest();

  const { token } = useContext(AuthContext);

  const getComplexItemDetail = useCallback(async () => {
    try {
      const response = await request(`/programs/complexes/${id}`, 'GET', null, { 'Authorization': `Bearer ${token}` });
      setData(response);
    } catch (error) {
      console.log('er', error);
    }
  }, [token, request, id]);

  useEffect(() => {
    getComplexItemDetail();
  }, [getComplexItemDetail])

  if (loading) {
    return <Loader loading={true} top="30%" />
  }

  return (

    <div class="jumbotron item-copmlex">
      <h3 class="display-3">{data && data.name}</h3>
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
              <td>{index+1}. {it.name.name}</td>
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