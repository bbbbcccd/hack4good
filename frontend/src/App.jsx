// Dependencies
import {
  Routes,
  Route,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";

// Layout
import { Box } from "@mui/material";

// User Pages
import Login from "./pages/Login";
import UserDashboard from "./pages/users/UserDashboard";
import MinimartNew from "./pages/users/MinimartNew";
import UserVouchers from "./pages/users/UserVouchers";

// Admin Pages
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminInventoryPage from "./pages/admin/AdminInventoryPage";
import AdminReportsPage from "./pages/admin/AdminReportsPage";
import VoucherTasksPage from "./pages/admin/VoucherTasksPage";
import Register from "./pages/admin/RegisterPage";

// Components
import SideMenu from "./components/SideMenu/SideMenu";
import ProtectedRoutes from "./components/ProtectedRoute";

import "./App.css";
import { useAuthContext } from "./hooks/auth/useAuthContext";

function App() {
  console.log("Server hosted at: " + import.meta.env.VITE_SERVER_URL);
  const { user } = useAuthContext();
  console.log(user);

  return (
    <Router>
      <Box sx={{ display: "flex", height: "100vh" }}>
        {user && <SideMenu />}
        <Box sx={{ flexGrow: 1 }}>
          <Routes>
            {!user && <Route path="/login" element={<Login />} />}

            {/* User Routes */}
            <Route element={<ProtectedRoutes allowedRole={"user"} />}>
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/minimart" element={<MinimartNew />} />
              <Route path="/vouchers" element={<UserVouchers />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<ProtectedRoutes allowedRole={"admin"} />}>
              <Route path="/admin/register" element={<Register />} />
              <Route path="/admin/users" element={<AdminUsersPage />} />
              <Route path="/admin/vouchers" element={<VoucherTasksPage />} />
              <Route path="/admin/inventory" element={<AdminInventoryPage />} />
              <Route path="/admin/reports" element={<AdminReportsPage />} />
            </Route>
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
