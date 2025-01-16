import { useState } from 'react';

import { axiosPrivate } from '../../util/api.js';
import { useMinimartContext } from '../commons/useMinimartContext.js';

const useUpdateMinimartItem = () => {
    const { minimartDispatch } = useMinimartContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateItem = async (currentName, newName, newCost, newQuantity) => {
        setError(null);
        setLoading(true);

        const data = {
            name: newName, cost: newCost, quantity: newQuantity
        };

        await axiosPrivate
            .patch(`/admin/minimart/${currentName}`, data)
            .then((res) => {
                console.log(res.data);
                minimartDispatch({ type: 'UPDATE_ITEM', payload: { currentName, ...res.data } })
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

    return { error, loading, updateItem };

};

export default useUpdateMinimartItem;