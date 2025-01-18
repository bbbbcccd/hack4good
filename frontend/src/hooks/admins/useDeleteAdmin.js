import { useState } from 'react';

import { useAxiosPrivate } from '../auth/useAxiosPrivate.jsx';
import { useAdminsContext } from './useAdminsContext.js';

const useDeleteAdmin = () => {
    const axiosPrivate = useAxiosPrivate();
    const { adminsDispatch } = useAdminsContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteAdmin = async (username) => {
        setError(null);
        setLoading(true);

        await axiosPrivate
            .delete(`/admin/admin/${username}`)
            .then(() => adminsDispatch({ type: 'DELETE_ADMIN', payload: { username } }))
            .catch((error) => {
                console.log(error.response);
                const message = error.response?.data
                    ? `, ${error.response.data.msg}`
                    : '';
                setError(error.message + message);
            });

        setLoading(false);
    }

    return { error, loading, deleteAdmin };

};

export default useDeleteAdmin;