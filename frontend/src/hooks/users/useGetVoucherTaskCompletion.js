import { useState, useEffect } from 'react';

import { useAxiosPrivate } from '../auth/useAxiosPrivate.jsx';
import { useVoucherTaskCompletionContext } from '../commons/useVoucherTaskCompletionContext.js';

const useGetVoucherTaskCompletion = () => {
    const axiosPrivate = useAxiosPrivate();
    const { voucherTaskCompletionDispatch } = useVoucherTaskCompletionContext();
    const [error, setError] = useState(null);

    useEffect(() => {
        const getVoucherTaskCompletions = async () => {
            await axiosPrivate
                .get('/user/completion')
                .then((data) => {
                    console.log("Retrieved taskCompletions: ", data);
                    voucherTaskCompletionDispatch({ type: 'GET_TASK_COMPLETIONS', payload: data.data });
                })
                .catch((error) => {
                    console.log(error);
                    const message = error.response?.data
                        ? `, ${error.response.data.msg}`
                        : '';
                    setError(error.message + message);
                });
        };

        getVoucherTaskCompletions();
    }, [voucherTaskCompletionDispatch, axiosPrivate]);

    return { error };
};

export default useGetVoucherTaskCompletion;