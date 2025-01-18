import { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import PropTypes from "prop-types";

const AddVoucherModal = ({ open, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [reward, setReward] = useState(0);

  const handleChange = (handler) => {
    return (e) => {
      handler(e.target.value);
    };
  };

  const handleSubmit = () => {
    onSubmit(name, reward);
    setName("");
    setReward("");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
        }}
      >
        <Typography color="secondary">Enter task details</Typography>
        <TextField
          fullWidth
          label="Name"
          name="name"
          required
          value={name}
          onChange={handleChange(setName)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Reward"
          name="reward"
          required
          value={reward}
          onChange={handleChange(setReward)}
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
AddVoucherModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default AddVoucherModal;
