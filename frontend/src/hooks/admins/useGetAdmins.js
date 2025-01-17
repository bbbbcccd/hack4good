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
                    adminsDispatch({ type: 'GET_ADMINS', payload: data.data });
                })
                .catch((error) => {
                    console.log(error);
                    const message = error.response?.data
                        ? `, ${error.response.data.error}`
                        : '';
                    setError(error.message + message);
                });
        };

        getAdmins();
    }, [adminsDispatch, axiosPrivate]);

    return { error };
};

export default useGetAdmins;