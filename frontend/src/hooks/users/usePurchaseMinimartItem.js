import { useState } from 'react';

import { useAxiosPrivate } from '../auth/useAxiosPrivate.jsx';
import { useTransactionContext } from './useTransactionContext.js';

const usePurchaseMinimartItem = () => {
  const axiosPrivate = useAxiosPrivate();
  const { transactionDispatch } = useTransactionContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const purchaseItem = async (username, itemName, quantity) => {
    setError(null);
    setLoading(true);

    const data = {
      username,
      itemName,
      quantity,
    };

    await axiosPrivate
      .post('/minimart/purchase', data)
      .then((res) => transactionDispatch({ type: 'PURCHASE_ITEM', payload: res.data }))
      .catch((error) => {
        console.log(error.response);
        const message = error.response?.data ? `, ${error.response.data.error}` : '';
        setError(error.message + message);
      });

    setLoading(false);
  };

  return { error, loading, purchaseItem };
};

export default usePurchaseMinimartItem;
