import { useState, useEffect } from 'react';

import { useAxiosPrivate } from '../auth/useAxiosPrivate.jsx';
import { useUserDetailsContext } from './useUserDetailsContext.js';

const useGetUserDetails = () => {
    const axiosPrivate = useAxiosPrivate();
    const { userDetailsDispatch } = useUserDetailsContext();
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUserDetails = async () => {
            await axiosPrivate
                .get('/user')
                .then((data) => {
                    userDetailsDispatch({ type: 'GET_USER', payload: data.data });
                })
                .catch((error) => {
                    console.log(error);
                    const message = error.response?.data
                        ? `, ${error.response.data.msg}`
                        : '';
                    setError(error.message + message);
                });
        };

        getUserDetails();
    }, [userDetailsDispatch, axiosPrivate]);

    return { error };
};

export default useGetUserDetails;