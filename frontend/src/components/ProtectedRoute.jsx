import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuthContext } from '../hooks/auth/useAuthContext';

const ProtectedRoutes = ({ allowedRole }) => {
  const { user } = useAuthContext();
  console.log(user);
  return user && user.role === allowedRole ? <Outlet /> : <Navigate to="/login" />;
};
ProtectedRoutes.propTypes = {
  allowedRole: PropTypes.string.isRequired,
};

export default ProtectedRoutes;
