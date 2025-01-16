import { useState } from 'react';

import { useAxiosPrivate } from '../auth/useAxiosPrivate.jsx';
import { useMinimartContext } from '../commons/useMinimartContext.js';

const useDeleteMinimartItem = () => {
    const axiosPrivate = useAxiosPrivate();
    const { minimartDispatch } = useMinimartContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteItem = async (name) => {
        setError(null);
        setLoading(true);

        await axiosPrivate
            .delete(`/admin/minimart/${name}`)
            .then(() => minimartDispatch({ type: 'DELETE_ITEM', payload: { name } }))
            .catch((error) => {
                console.log(error.response);
                const message = error.response?.data
                    ? `, ${error.response.data.error}`
                    : '';
                setError(error.message + message);
            });

        setLoading(false);
    }

    return { error, loading, deleteItem };

};

export default useDeleteMinimartItem;