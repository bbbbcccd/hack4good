import { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const CustomModal = ({ open, onClose, onSubmit, user }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [vouchers, setVouchers] = useState(0);

  const handleChange = (handler) => {
    return (e) => {
      handler(e.target.value);
    };
  };

  const handleSubmit = () => {
    onSubmit(username, password, phoneNumber, vouchers);
    setUsername('');
    setPassword('');
    setPhoneNumber('');
    setVouchers(0);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
        }}
      >
        <Typography color="secondary">Enter new details</Typography>
        <TextField
          fullWidth
          label="Username"
          name="username"
          value={username}
          onChange={handleChange(setUsername)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="New Password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange(setPassword)}
          margin="normal"
        />
        {user.role === 'user' && (
          <TextField
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange(setPhoneNumber)}
            margin="normal"
          />
        )}
        {user.role === 'user' && (
          <TextField
            fullWidth
            label="Vouchers"
            name="vouchers"
            value={vouchers}
            onChange={handleChange(setVouchers)}
            margin="normal"
          />
        )}
        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
CustomModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  user: PropTypes.object,
};

export default CustomModal;
