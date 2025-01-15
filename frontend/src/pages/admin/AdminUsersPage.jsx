import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export default function AdminUsersPage() {
  // Mock data for users
  const [users, setUsers] = useState([
    { id: 1, username: "john_doe", role: "resident", suspended: false },
    { id: 2, username: "admin_user", role: "admin", suspended: false },
    { id: 3, username: "jane_smith", role: "resident", suspended: true },
  ]);

  const [newUser, setNewUser] = useState({ username: "", role: "resident" });
  const [open, setOpen] = useState(false);

  const handleAddUser = () => {
    setUsers([...users, { id: users.length + 1, ...newUser, suspended: false }]);
    setNewUser({ username: "", role: "resident" });
    setOpen(false);
  };

  const suspendUser = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, suspended: !user.suspended } : user
      )
    );
  };

  const resetPassword = (userId) => {
    alert(`Password reset for user ID: ${userId}`);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Manage Users
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add User
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={newUser.username}
            onChange={(e) =>
              setNewUser({ ...newUser, username: e.target.value })
            }
          />
          <TextField
            label="Role"
            fullWidth
            margin="normal"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddUser} color="primary">
            Add
          </Button>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                {user.suspended ? "Suspended" : "Active"}
              </TableCell>
              <TableCell>
                <Button onClick={() => suspendUser(user.id)}>
                  {user.suspended ? "Unsuspend" : "Suspend"}
                </Button>
                <Button onClick={() => resetPassword(user.id)}>
                  Reset Password
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}