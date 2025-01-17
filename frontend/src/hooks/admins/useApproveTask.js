import { useState } from 'react';

import { useAxiosPrivate } from '../auth/useAxiosPrivate.jsx';

const useApproveTask = () => {
    const axiosPrivate = useAxiosPrivate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const approveTask = async (username, taskName) => {
        setError(null);
        setLoading(true);

        const data = {
            username, taskName
        };

        await axiosPrivate
            .post('/admin/task/approve', data)
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