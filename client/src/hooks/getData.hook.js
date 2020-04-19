import {useContext, useCallback}from 'react';
import {useRequest} from './request.hook';
import AuthContext from '../context/auth.context';

export const useGetData = () => {
  
  const {request, loading}  = useRequest();

  const {token} = useContext(AuthContext);

  const getAllComplexes = useCallback(async () => {
    try {
      return request('/programs/complexes/', 'GET', null, { 'Authorization': `Bearer ${token}` });
      // setItems(response);
    } catch (error) {
      // emmiter.emmit('notyfi', error.message);
    }
  }, [request, token]);

  return {getAllComplexes, loading};
}

