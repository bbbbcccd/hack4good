import { useState, useEffect } from 'react';

import { axiosPrivate } from '../../util/api/axios.js/axios.js';
import { useTransactionContext } from './useTransactionContext.js';

const useGetTransaction = () => {
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
  }, [transactionDispatch]);

  return { error };
};

export default useGetTransaction;
