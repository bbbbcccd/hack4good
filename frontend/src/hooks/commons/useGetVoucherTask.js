import { useState, useEffect } from 'react';

import { useAxiosPrivate } from '../auth/useAxiosPrivate.jsx';
import { useVoucherTaskContext } from './useVoucherTaskContext.js';

const useGetVoucherTask = () => {
    const axiosPrivate = useAxiosPrivate();
    const { voucherTaskDispatch } = useVoucherTaskContext();
    const [error, setError] = useState(null);

    useEffect(() => {
        const getVoucherTasks = async () => {
            await axiosPrivate
                .get('/task/tasks')
                .then((data) => {
                    console.log("Retrieved tasks: ", data);
                    voucherTaskDispatch({ type: 'GET_TASKS', payload: data.data });
                })
                .catch((error) => {
                    console.log("Error retrieving tasks: ", error);
                    const message = error.response?.data
                        ? `, ${error.response.data.error}`
                        : '';
                    setError(error.message + message);
                });
        };

        getVoucherTasks();
    }, [voucherTaskDispatch, axiosPrivate]);

    return { error };
};

export default useGetVoucherTask;