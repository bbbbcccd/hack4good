import { useState } from 'react';

import { axiosPrivate } from '../../util/api.js';
import { useMinimartContext } from '../commons/useMinimartContext.js';

const useAddMinimartItem = () => {
    const { minimartDispatch } = useMinimartContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addItem = async (name, cost, quantity) => {
        setError(null);
        setLoading(true);

        const data = {
            name, cost, quantity
        };

        await axiosPrivate
            .post('/minimart', data)
            .then((res) => minimartDispatch({ type: 'ADD_ITEM', payload: res.data }))
            .catch((error) => {
                console.log(error.response);
                const message = error.response?.data
                    ? `, ${error.response.data.error}`
                    : '';
                setError(error.message + message);
            });

        setLoading(false);
    }

    return { error, loading, addItem };

};

export default useAddMinimartItem;