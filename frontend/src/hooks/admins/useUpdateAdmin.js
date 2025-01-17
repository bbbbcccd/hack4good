import { useState } from 'react';

import { useAxiosPrivate } from '../auth/useAxiosPrivate.jsx';
import { useAdminsContext } from './useAdminsContext.js';

const useUpdateUser = () => {
    const axiosPrivate = useAxiosPrivate();
    const { adminsDispatch } = useAdminsContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateAdmin = async (currentUsername, newUsername, newPassword) => {
        setError(null);
        setLoading(true);

        const data = { username: newUsername, unhashedPw: newPassword };

        await axiosPrivate
            .patch(`/admin/admin/${currentUsername}`, data)
            .then((res) => {
                console.log(res.data);
                adminsDispatch({ type: 'UPDATE_ADMIN', payload: { currentUsername, ...res.data } })
            })
            .catch((error) => {
                console.log(error.response);
                const message = error.response?.data
                    ? `, ${error.response.data.error}`
                    : '';
                setError(error.message + message);
            });

        setLoading(false);
    }

    return { error, loading, updateAdmin };

};

export default useUpdateUser;