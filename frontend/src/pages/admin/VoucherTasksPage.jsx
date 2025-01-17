import { useEffect, useState } from 'react';
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
import useGetVoucherTask from '../../hooks/commons/useGetVoucherTask';
import useApproveTask from '../../hooks/admins/useApproveTask';
import useRejectTask from '../../hooks/admins/useRejectTask';
import { useVoucherTaskContext } from '../../hooks/commons/useVoucherTaskContext';

export default function VoucherTasksPage() {
  const [requests, setRequests] = useState([]);
  useGetVoucherTask();
  const { approveTask } = useApproveTask();
  const { rejectTask } = useRejectTask();
  const { voucherTaskState } = useVoucherTaskContext();

  const fetchTasks = async () => {
    setRequests(voucherTaskState.tasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleApprove = async (taskName, username) => {
    approveTask(username, taskName);
    fetchTasks();
  };

  const handleReject = async (taskName, username) => {
    rejectTask(username, taskName);
    fetchTasks();
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
          📊 Manage Requests
        </Typography>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Index</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Task Name</TableCell>
            <TableCell>Username</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((request, idx) => (
            <TableRow key={idx}>
              <TableCell>{++idx}</TableCell>
              <TableCell>{request.status}</TableCell>
              <TableCell>{request.date}</TableCell>
              <TableCell>{request.task_name}</TableCell>
              <TableCell>{request.username}</TableCell>
              <TableCell>
                {request.status === 'requested' && (
                  <>
                    <Button
                      onClick={() => handleApprove(request.task_name, request.username)}
                      color="primary"
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleReject(request.task_name, request.username)}
                      color="secondary"
                    >
                      Reject
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
