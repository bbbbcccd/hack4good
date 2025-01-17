import { useState, useEffect } from 'react';

import { useAxiosPrivate } from '../auth/useAxiosPrivate.jsx';
import { useTransactionContext } from './useTransactionContext.js';

const useGetTransaction = () => {
  const axiosPrivate = useAxiosPrivate();
  const { transactionDispatch } = useTransactionContext();
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTransactionItems = async () => {
      await axiosPrivate
        .get('/user/transaction')
        .then((data) => {
          console.log(data);
          transactionDispatch({ type: 'GET_TRANSACTIONS', payload: data.data });
        })
        .catch((error) => {
          console.log(error);
          const message = error.response?.data ? `, ${error.response.data.error}` : '';
          setError(error.message + message);
        });
    };

    getTransactionItems();
  }, [transactionDispatch, axiosPrivate]);

  return { error };
};

export default useGetTransaction;
