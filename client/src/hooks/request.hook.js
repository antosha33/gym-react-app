import  { useState, useCallback} from 'react';

export const useRequest = () => {
const [loading, setLoading] = useState(false);
const [error, setError] = useState(true)

  const request = useCallback( async (url, method = 'GET', body=null, headers={}) => {
    setLoading(true);
    if(body){
      body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, {
        method,
        body,
        headers :{
          ...headers,
         'Content-Type': 'application/json;charset=utf-8',
        }  
      } )

      const data = await response.json();

      if(!response.ok){
        throw new Error(data.message);
      }
   
      setLoading(false);

      return data;
 
    } catch (error) {
      setError(error);
      setLoading(false);
      throw error;
    }

  }, [])

  return { request, error, loading };
}

