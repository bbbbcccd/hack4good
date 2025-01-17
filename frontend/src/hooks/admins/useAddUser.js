import { useState } from 'react';

import { useAxiosPrivate } from '../auth/useAxiosPrivate.jsx';
import { useUsersContext } from './useUsersContext.js';

const useAddUser = () => {
    const axiosPrivate = useAxiosPrivate();
    const { usersDispatch } = useUsersContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addUser = async (username, unhashedPw, vouchers, phoneNumber) => {
        setError(null);
        setLoading(true);

        const data = {
            username, unhashedPw, vouchers, phoneNumber
        };

        await axiosPrivate
            .post('/admin/user', data)
            .then((res) => usersDispatch({ type: 'ADD_USER', payload: res.data }))
            .catch((error) => {
                console.log(error.response);
                const message = error.response?.data
                    ? `, ${error.response.data.error}`
                    : '';
                setError(error.message + message);
            });

        setLoading(false);
    }

    return { error, loading, addUser };

};

export default useAddUser;