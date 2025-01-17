import { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import PropTypes from 'prop-types';

const CustomModal = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({ field1: '', field2: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({ field1: '', field2: '' });
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
          p: 4,
          borderRadius: 2,
        }}
      >
        <h2>Enter Details</h2>
        <TextField
          fullWidth
          label="Field 1"
          name="field1"
          value={formData.field1}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Field 2"
          name="field2"
          value={formData.field2}
          onChange={handleChange}
          margin="normal"
        />
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
CustomModal.propsTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default CustomModal;
