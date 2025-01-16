import { useState } from 'react';

import { useAxiosPrivate } from '../auth/useAxiosPrivate.jsx';
import { useUsersContext } from './useUsersContext.js';

const useDeleteUser = () => {
    const axiosPrivate = useAxiosPrivate();
    const { usersDispatch } = useUsersContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteUser = async (username) => {
        setError(null);
        setLoading(true);

        await axiosPrivate
            .delete(`/admin/user/${username}`)
            .then(() => usersDispatch({ type: 'DELETE_user', payload: { username } }))
            .catch((error) => {
                console.log(error.response);
                const message = error.response?.data
                    ? `, ${error.response.data.error}`
                    : '';
                setError(error.message + message);
            });

        setLoading(false);
    }

    return { error, loading, deleteUser };

};

export default useDeleteUser;