import { useState } from 'react';

import { useAxiosPrivate } from '../auth/useAxiosPrivate.jsx';
import { useUsersContext } from './useUsersContext.js';

const useUpdateUser = () => {
    const axiosPrivate = useAxiosPrivate();
    const { usersDispatch } = useUsersContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateUser = async (currentUsername, newUsername, newPassword, newVouchers, newPhoneNumber) => {
        setError(null);
        setLoading(true);

        const data = { username: newUsername, unhashedPw: newPassword, vouchers: newVouchers, phoneNumber: newPhoneNumber };

        await axiosPrivate
            .patch(`/admin/user/${currentUsername}`, data)
            .then((res) => {
                console.log(res.data);
                usersDispatch({ type: 'UPDATE_USER', payload: { currentUsername, ...res.data } })
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

    return { error, loading, updateUser };

};

export default useUpdateUser;