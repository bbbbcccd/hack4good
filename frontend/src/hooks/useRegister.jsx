import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './useAuthContext.jsx';
import { useAxiosPrivate } from './useAxiosPrivate.jsx';

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const register = async (username, password, user, phoneNumber) => {
    setLoading(true);
    setError(null);

    const data =
      user === 'admin'
        ? { username: username, unhashedPw: password }
        : {
            username: username,
            unhashedPw: password,
            phoneNumber: phoneNumber,
          };

    await axiosPrivate
      // conditional selection of the backend endpoint based on user/admin
      .post(`/admin/${user}`, data)
      .then((res) => {
        navigate('/dashboard');
      })
      .catch((error) => {
        console.log(error);

        if (error.response?.status === 403) {
          dispatch({ type: 'LOGOUT' });
          navigate('/login');
        }

        const message = error.response?.data ? `, ${error.response.data.msg}` : '';
        setError(error.message + message);
      });

    setLoading(false);
  };

  return { register, loading, error };
};
