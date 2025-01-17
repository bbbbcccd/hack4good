import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  CardContent,
  Typography,
  InputAdornment,
  Button
} from "@mui/material";
import { Search } from '@mui/icons-material';
import StyledCard from "../../components/StyledCard";
import { ToastContainer, toast} from 'react-toastify';

import { useVoucherTaskContext } from '../../hooks/commons/useVoucherTaskContext';
import useGetVoucherTask from "../../hooks/commons/useGetVoucherTask";
import useCompleteTask from "../../hooks/users/useCompleteTask";
import { useAuthContext } from "../../hooks/auth/useAuthContext";

export default function UserVouchers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const getVoucherError = useGetVoucherTask().error;
  if (getVoucherError) console.error(getVoucherError);
  const { voucherTaskState } = useVoucherTaskContext();
  const { error, loading, completeTask } = useCompleteTask();
  const { user } = useAuthContext();

  // Notifications
  const notifySuccess = () => toast.success("Task completion requested!");
  const notifyError = () => toast.error("Error encountered:\n" + error.toString())

  // useEffects
  useEffect(() => {
    setFilteredTasks(voucherTaskState.tasks.filter(task =>
        task.name.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [voucherTaskState]);

  useEffect(() => {
    if (!loading && error) {
        notifyError();
    } else if (!loading && !error) {
        notifySuccess();
    }
    console.log(`loading: ${loading}, error: ${error}`);
  }, [loading, error])

  // Handlers
  const handleComplete = (task) => {
    return () => completeTask(user.username, task.name);
  }

  return (

    <Container maxWidth="lg" sx={{ py: 4 }}>
      <ToastContainer />
      <Box sx={{ mb: 4, display: "flex", flexDirection: "row" }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (<InputAdornment position="start"><Search size={20} style={{ marginRight: 8 }} /></InputAdornment>
            ),
            sx: {
              height: '100%'
            }
          }}
          sx={{"&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
            },
          }}
        />
      </Box>

      <Grid container spacing={3}>
        {filteredTasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={task.name}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {task.name}
                </Typography>
                <Typography variant="h5" color="primary" gutterBottom>
                  ${task.reward}
                </Typography>
                <Button onClick={handleComplete(task)} variant="contained" color="success">
                    Complete
                </Button>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
