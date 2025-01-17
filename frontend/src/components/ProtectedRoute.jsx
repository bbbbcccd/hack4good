import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoutes = ({ user }) => {
  console.log(user.role);
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};
ProtectedRoutes.propTypes = {
  user: PropTypes.bool.isRequired,
};

export default ProtectedRoutes;
