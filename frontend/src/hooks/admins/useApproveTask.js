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

        // TODO: Add context for voucher task completions
        await axiosPrivate
            .patch('/admin/task/approve', data)
            .catch((error) => {
                console.log(error.response);
                const message = error.response?.data
                    ? `, ${error.response.data.error}`
                    : '';
                setError(error.message + message);
            });

        setLoading(false);
    }

    return { error, loading, approveTask };

};

export default useApproveTask;