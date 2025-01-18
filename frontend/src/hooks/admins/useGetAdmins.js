import { useState, useEffect } from 'react';

import { useAxiosPrivate } from '../auth/useAxiosPrivate.jsx';
import { useAdminsContext } from './useAdminsContext.js';

const useGetAdmins = () => {
  const axiosPrivate = useAxiosPrivate();
  const { adminsDispatch } = useAdminsContext();
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAdmins = async () => {
      await axiosPrivate
        .get('/admin/admin')
        .then((data) => {
          const item = data.data.map((admin) => {
            return {
              username: admin.username,
              role: 'admin',
            };
          });
          adminsDispatch({ type: 'GET_ADMINS', payload: item });
        })
        .catch((error) => {
          console.log(error);
          const message = error.response?.data ? `, ${error.response.data.msg}` : '';
          setError(error.message + message);
        });
    };

    getAdmins();
  }, [adminsDispatch, axiosPrivate]);

  return { error };
};

export default useGetAdmins;
