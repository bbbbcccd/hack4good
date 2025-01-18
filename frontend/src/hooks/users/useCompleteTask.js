import { useState } from 'react';

import { useAxiosPrivate } from '../auth/useAxiosPrivate.jsx';

const useCompleteTask = () => {
    const axiosPrivate = useAxiosPrivate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const completeTask = async (username, taskName) => {
        setError(null);
        setLoading(true);

        const data = {
            username, taskName
        };

        // TODO: Add context for voucher task completions
        await axiosPrivate
            .post('/user/complete', data)
            .catch((error) => {
                console.log(error.response);
                const message = error.response?.data
                    ? `, ${error.response.data.msg}`
                    : '';
                setError(error.message + message);
            });

        setLoading(false);
    }

    return { error, loading, completeTask };

};

export default useCompleteTask;