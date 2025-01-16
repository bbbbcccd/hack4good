import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './useAuthContext.jsx';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const logout = async () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return { logout };
};
