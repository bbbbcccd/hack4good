import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { useUsersContext } from "../../hooks/admins/useUsersContext";
import { useAdminsContext } from "../../hooks/admins/useAdminsContext";
import useGetAdmins from "../../hooks/admins/useGetAdmins";
import useGetUsers from "../../hooks/admins/useGetUsers";
import useDeleteUser from "../../hooks/admins/useDeleteUser";
import useDeleteAdmin from "../../hooks/admins/useDeleteAdmin";
import useUpdateAdmin from "../../hooks/admins/useUpdateAdmin";
import useUpdateUser from "../../hooks/admins/useUpdateUser";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../../components/CustomAlert";
import CustomModal from "../../components/CustomModal";
import { useState } from "react";

export default function AdminUsersPage() {
  const { usersState } = useUsersContext();
  const { adminsState } = useAdminsContext();
  const navigate = useNavigate();
  const { error: adminErrors } = useGetAdmins();
  const { error: userErrors } = useGetUsers();
  const { deleteUser, error: deleteUserError, loading: deleteUserLoading } = useDeleteUser();
  const { deleteAdmin, error: deleteAdminError, loading: deleteAdminLoading } = useDeleteAdmin();
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [currUser, setCurrUser] = useState({});
  const { updateAdmin } = useUpdateAdmin();
  const { updateUser } = useUpdateUser();

  const handleAddUser = () => {
    navigate("/admin/register");
  };

  const suspendUser = (user) => {
    if (user.role === "admin") {
      deleteAdmin(user.username);
    } else {
      deleteUser(user.username);
    }
  };

  const handleUpdate = (user) => {
    setIsOpenEdit(true);
    setCurrUser(user);
  };

  const update = (user) => {
    return (newUsername, newPassword, phoneNumber, vouchers) => {
      if (user.role === "admin") {
        updateAdmin(user.username, newUsername, newPassword);
      } else {
        updateUser(user.username, newUsername, newPassword, vouchers, phoneNumber);
      }
      setIsOpenEdit(false);
    };
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          backgroundColor: "#f0f4ff",
          borderRadius: "20px",
          padding: 3,
          textAlign: "center",
          marginBottom: 4,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "salmon" }}>
          👤 Manage Users
        </Typography>
      </Box>

      <CustomModal
        open={isOpenEdit}
        onClose={() => setIsOpenEdit(false)}
        onSubmit={update(currUser)}
        user={currUser}
      />

      {adminErrors && <CustomAlert severity="error" message={adminErrors} />}
      {userErrors && <CustomAlert severity="error" message={userErrors} />}
      {deleteAdminError && <CustomAlert severity="error" message={deleteAdminError} />}
      {deleteUserError && <CustomAlert severity="error" message={deleteUserError} />}

      <Box sx={{ mb: 4 }}>
        <Button variant="contained" color="primary" onClick={handleAddUser}>
          Add User
        </Button>
      </Box>

      {/* Admins Table */}
      <Paper sx={{ mb: 4, overflow: "hidden" }}>
        <Typography variant="h6" sx={{ p: 2, backgroundColor: "aliceblue", fontWeight: "bold" }}>
          Administrators
        </Typography>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#fafafa" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Username</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminsState.admins.map((user) => (
              <TableRow key={user.username} sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell align="right">
                  <Button
                    disabled={deleteAdminLoading}
                    onClick={() => suspendUser(user)}
                    color="error"
                    sx={{ mr: 1 }}
                  >
                    Suspend
                  </Button>
                  <Button onClick={() => handleUpdate(user)} color="primary">
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Users Table */}
      <Paper sx={{ overflow: "hidden" }}>
        <Typography variant="h6" sx={{ p: 2, backgroundColor: "aliceblue", fontWeight: "bold" }}>
          Users
        </Typography>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#fafafa" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Username</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersState.users.map((user) => (
              <TableRow key={user.username} sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell align="right">
                  <Button
                    disabled={deleteUserLoading}
                    onClick={() => suspendUser(user)}
                    color="error"
                    sx={{ mr: 1 }}
                  >
                    Suspend
                  </Button>
                  <Button onClick={() => handleUpdate(user)} color="primary">
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
