// Dependencies
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

// Layout
import { Box } from '@mui/material';

// User Pages
import Login from './pages/Login';
import Users from './pages/users/Users';
import UserDashboard from './pages/users/UserDashboard';
import MinimartPage from './pages/users/MinimartPage';
import MinimartNew from './pages/users/MinimartNew';

// Admin Pages
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminInventoryPage from './pages/admin/AdminInventoryPage';
import AdminReportsPage from './pages/admin/AdminReportsPage';
import VoucherTasksPage from './pages/admin/VoucherTasksPage';
import Register from './pages/admin/RegisterPage';

// Components
import Navbar from './components/Navbar';
import SideMenu from './components/SideMenu/SideMenu';
import ProtectedRoutes from './components/ProtectedRoute';

import './App.css';
import { useAuthContext } from './hooks/auth/useAuthContext';

function App() {
  console.log('Server hosted at: ' + import.meta.env.VITE_SERVER_URL);
  axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
  axios.defaults.withCredentials = true;
  const { user } = useAuthContext();
  console.log(user);

  return (
    <>
      {/* <Navbar /> */}
      <Box sx={{ display: 'flex', height: '100vh' }}>
        {user && <SideMenu />}
        <Box sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/login" element={user ? <Navigate to={'/'} replace /> : <Login />} />

            {/* User Routes */}
            <Route element={<ProtectedRoutes user={user?.role === 'user'} />}>
              {/* TODO: the /users path should be for admins but ima leave it here for now*/}
              <Route path="/users" element={<Users />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/minimartold" element={<MinimartPage />} />
              <Route path="/minimart" element={<MinimartNew />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<ProtectedRoutes user={user?.role === 'admin'} />}>
              <Route path="/admin/register" element={<Register />} />
              <Route path="/admin/users" element={<AdminUsersPage />} />
              <Route path="/admin/vouchers" element={<VoucherTasksPage />} />
              <Route path="/admin/inventory" element={<AdminInventoryPage />} />
              <Route path="/admin/reports" element={<AdminReportsPage />} />
            </Route>
          </Routes>
        </Box>
      </Box>
    </>
  );
}

export default App;
