import { useState, useEffect } from 'react';

import { useAxiosPrivate } from '../auth/useAxiosPrivate.jsx';
import { useUsersContext } from './useUsersContext.js';

const useGetUsers = () => {
    const axiosPrivate = useAxiosPrivate();
    const { usersDispatch } = useUsersContext();
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUsers = async () => {
            await axiosPrivate
                .get('/admin/user')
                .then((data) => {
                    console.log(data);
                    usersDispatch({ type: 'GET_USERS', payload: data.data });
                })
                .catch((error) => {
                    console.log(error);
                    const message = error.response?.data
                        ? `, ${error.response.data.error}`
                        : '';
                    setError(error.message + message);
                });
        };

        getUsers();
    }, [usersDispatch, axiosPrivate]);

    return { error };
};

export default useGetUsers;