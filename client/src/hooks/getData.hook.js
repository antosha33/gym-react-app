import {useContext, useCallback}from 'react';
import {useRequest} from './request.hook';
import AuthContext from '../context/auth.context';

export const useGetData = () => {
  
  const {request, loading}  = useRequest();

  const {token} = useContext(AuthContext);

  const getAllComplexes = useCallback(async () => {
    try {
      return request('/programs/complexes/', 'GET', null, { 'Authorization': `Bearer ${token}` });
    } catch (error) {
      throw new Error(error);
    }
  }, [request, token]);

  const getAllExercises = useCallback(async () => {
    try {
      return request('/programs/exercise/', 'GET', null, { 'Authorization': `Bearer ${token}` });
    } catch (error) {
      throw new Error(error);
    }
  }, [request, token]);

  return {getAllComplexes, getAllExercises, loading};
}

