import { useState } from 'react';

import { useAxiosPrivate } from '../auth/useAxiosPrivate.jsx';
import { useAdminsContext } from './useAdminsContext.js';

const useAddAdmin = () => {
    const axiosPrivate = useAxiosPrivate();
    const { adminsDispatch } = useAdminsContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addAdmin = async (username, unhashedPw) => {
        setError(null);
        setLoading(true);

        const data = {
            username, unhashedPw
        };

        await axiosPrivate
            .post('/admin/admin', data)
            .then((res) => adminsDispatch({ type: 'ADD_ADMIN', payload: res.data }))
            .catch((error) => {
                console.log(error.response);
                const message = error.response?.data
                    ? `, ${error.response.data.error}`
                    : '';
                setError(error.message + message);
            });

        setLoading(false);
    }

    return { error, loading, addAdmin };

};

export default useAddAdmin;