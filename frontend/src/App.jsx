// Dependencies
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

// User Pages
import Login from './pages/users/Login';
import Users from './pages/users/Users';
import UserDashboard from './pages/users/UserDashboard';
import MinimartPage from './pages/users/MinimartPage';
import MinimartNew from './pages/users/MinimartNew';

// Admin Pages
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminRequestsPage from './pages/admin/AdminRequestsPage';
import AdminInventoryPage from './pages/admin/AdminInventoryPage';
import AdminReportsPage from './pages/admin/AdminReportsPage';

// Components
import Navbar from './components/Navbar';

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
          <Route path="/minimart" element={<MinimartPage />} />
          <Route path="/minimart2" element={<MinimartNew />} />
          

          {/* Admin Routes */}
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/requests" element={<AdminRequestsPage />} />
          <Route path="/admin/inventory" element={<AdminInventoryPage />} />
          <Route path="/admin/reports" element={<AdminReportsPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
