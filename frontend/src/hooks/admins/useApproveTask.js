import { useState } from 'react';

import { useAxiosPrivate } from '../auth/useAxiosPrivate.jsx';
import { useVoucherTaskCompletionContext } from '../commons/useVoucherTaskCompletionContext.js';

const useApproveTask = () => {
    const axiosPrivate = useAxiosPrivate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { voucherTaskCompletionDispatch } = useVoucherTaskCompletionContext();

    const approveTask = async (username, taskName) => {
        setError(null);
        setLoading(true);

        const data = {
            username, taskName
        };

        // TODO: Add context for voucher task completions
        await axiosPrivate
            .patch('/admin/task/approve', data)
            .then((res) => {
                console.log(res.data);
                voucherTaskCompletionDispatch({ type: "UPDATE_TASK_COMPLETION", payload: { ...res.data, status: "approved" } })
            })
            .catch((error) => {
                console.log(error.response);
                const message = error.response?.data
                    ? `, ${error.response.data.msg}`
                    : '';
                setError(error.message + message);
            });

        setLoading(false);
    }

    return { error, loading, approveTask };

};

export default useApproveTask;