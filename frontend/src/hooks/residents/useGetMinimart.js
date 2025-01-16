import { useState, useEffect } from 'react';

import { axiosPrivate } from '../../util/api.js';
import { useMinimartContext } from './useMinimartContext.js';

// TODO: Add resident auth context
const useGetMinimart = () => {
    const { minimartDispatch } = useMinimartContext();
    const [error, setError] = useState(null);

    useEffect(() => {
        const getMinimartItems = async () => {
            await axiosPrivate
                .get('/minimart')
                .then((data) => {
                    console.log(data);
                    minimartDispatch({ type: 'GET_ITEMS', payload: data.data });
                })
                .catch((error) => {
                    console.log(error);
                    const message = error.response?.data
                        ? `, ${error.response.data.error}`
                        : '';
                    setError(error.message + message);
                });
        };

        getMinimartItems();
    }, [minimartDispatch]);

    return { error };
};

export default useGetMinimart;