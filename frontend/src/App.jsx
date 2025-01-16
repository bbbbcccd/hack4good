// Dependencies
import { Routes, Route } from 'react-router-dom';
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
import AdminRequestsPage from './pages/admin/AdminRequestsPage';
import AdminInventoryPage from './pages/admin/AdminInventoryPage';
import AdminReportsPage from './pages/admin/AdminReportsPage';
import VoucherTasksPage from './pages/admin/VoucherTasksPage';
import Register from './pages/admin/RegisterPage';
// Components
import Navbar from './components/Navbar';
import SideMenu from './components/SideMenu/SideMenu';

import './App.css';

function App() {
  console.log('Server hosted at: ' + import.meta.env.VITE_SERVER_URL);
  axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
  axios.defaults.withCredentials = true;

  return (
    <>
      <Navbar />
      <div>
        <Routes>
          {/* Public/User Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/minimartold" element={<MinimartPage />} />
          <Route path="/minimart" element={<MinimartNew />} />

          {/* Admin Routes */}
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/vouchers" element={<VoucherTasksPage />} />
          <Route path="/admin/inventory" element={<AdminInventoryPage />} />
          <Route path="/admin/reports" element={<AdminReportsPage />} />
        </Routes>
      </div>
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <SideMenu />
        <Box sx={{ flexGrow: 1, marginTop: 5 }}>
          <Routes>
            {/* Public/User Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/users" element={<Users />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/minimartold" element={<MinimartPage />} />
            <Route path="/minimart" element={<MinimartNew />} />

            {/* Admin Routes */}
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/vouchers" element={<VoucherTasksPage />} />
            <Route path="/admin/inventory" element={<AdminInventoryPage />} />
            <Route path="/admin/reports" element={<AdminReportsPage />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
}

export default App;
