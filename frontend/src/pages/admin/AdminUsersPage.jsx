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
} from '@mui/material';
import { useUsersContext } from '../../hooks/admins/useUsersContext';
import { useAdminsContext } from '../../hooks/admins/useAdminsContext';
import useGetAdmins from '../../hooks/admins/useGetAdmins';
import useGetUsers from '../../hooks/admins/useGetUsers';
import useDeleteUser from '../../hooks/admins/useDeleteUser';
import useDeleteAdmin from '../../hooks/admins/useDeleteAdmin';
import useUpdateAdmin from '../../hooks/admins/useUpdateAdmin';
import useUpdateUser from '../../hooks/admins/useUpdateUser';
import { useNavigate } from 'react-router-dom';
import CustomAlert from '../../components/CustomAlert';
import CustomModal from '../../components/EditModal';
import { useState } from 'react';

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
    navigate('/admin/register');
  };

  const suspendUser = (user) => {
    console.log(user);
    if (user.role === 'admin') {
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
      if (user.role === 'admin') {
        updateAdmin(user.username, newUsername, newPassword);
      } else {
        updateUser(user.username, newUsername, newPassword, vouchers, phoneNumber);
      }
      setIsOpenEdit(false);
    };
  };

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: '#f0f4ff',
          borderRadius: '20px',
          padding: 3,
          textAlign: 'center',
          margin: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'salmon' }}>
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
      <Button variant="contained" color="primary" onClick={handleAddUser}>
        Add User
      </Button>
      <TableContainer sx={{ mt: "2%" }} >
        <Typography>Admins</Typography>
        <Table sx={{ mb: "2%" }}>
          <TableHead>
            <TableRow sx ={{ backgroundColor: "lightgrey" }}>
              <TableCell>Username</TableCell>
              <TableCell>Role</TableCell>
              <TableCell/>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminsState.admins.map((user) => (
              <TableRow key={user.username}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button disabled={deleteUserLoading} onClick={() => suspendUser(user)}>
                    Suspend
                  </Button>
                  <Button onClick={() => handleUpdate(user)}>Update</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Typography>Users</Typography>
        <Table>
          <TableHead>
            <TableRow sx ={{ backgroundColor: "lightgrey" }}>
              <TableCell>Username</TableCell>
              <TableCell>Role</TableCell>
              <TableCell/>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersState.users.map((user) => (
              <TableRow key={user.username}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button disabled={deleteUserLoading} onClick={() => suspendUser(user)}>
                    Suspend
                  </Button>
                  <Button onClick={() => handleUpdate(user)}>Update</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
