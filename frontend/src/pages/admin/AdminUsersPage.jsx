import {
  Table,
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
import { useNavigate } from 'react-router-dom';
import CustomAlert from '../../components/CustomAlert';

export default function AdminUsersPage() {
  // Mock data for users
  const { usersState } = useUsersContext();
  const { adminsState } = useAdminsContext();
  const navigate = useNavigate();
  const { error: adminErrors } = useGetAdmins();
  const { error: userErrors } = useGetUsers();
  const { deleteUser, error: deleteUserError, loading: deleteUserLoading } = useDeleteUser();
  const { deleteAdmin, error: deleteAdminError, loading: deleteAdminLoading } = useDeleteAdmin();

  const handleAddUser = () => {
    navigate('/admin/register');
  };

  const suspendUser = (user) => {
    if (user.role === 'admin') {
      deleteAdmin(user.username);
    } else {
      deleteUser(user.username);
    }
  };

  const update = (userId) => {
    alert(`Password reset for user ID: ${userId}`);
  };

  return (
    <Box>
      {adminErrors && <CustomAlert severity="error" message={adminErrors} />}
      {userErrors && <CustomAlert severity="error" message={userErrors} />}
      {deleteAdminError && <CustomAlert severity="error" message={deleteAdminError} />}
      {deleteUserError && <CustomAlert severity="error" message={deleteUserError} />}
      <Typography variant="h4" gutterBottom>
        Manage Users
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAddUser}>
        Add User
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {adminsState.admins.map((user) => (
            <TableRow key={user.username}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Button disabled={deleteAdminLoading} onClick={() => suspendUser(user)}>
                  Suspend
                </Button>
                <Button onClick={() => update(user.id)}>Update</Button>
              </TableCell>
            </TableRow>
          ))}
          {usersState.users.map((user) => (
            <TableRow key={user.username}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Button disabled={deleteUserLoading} onClick={() => suspendUser(user.id)}>
                  Suspend
                </Button>
                <Button onClick={() => update(user.id)}>Update</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
