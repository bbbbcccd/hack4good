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
import useGetVoucherTaskCompletion from '../../hooks/admins/useGetVoucherTaskCompletion';
import useApproveTask from '../../hooks/admins/useApproveTask';
// import useRejectTask from '../../hooks/admins/useRejectTask';
import { useVoucherTaskCompletionContext } from '../../hooks/commons/useVoucherTaskCompletionContext';

export default function VoucherTasksPage() {
  const [requests, setRequests] = useState([]);
  useGetVoucherTaskCompletion();
  const { approveTask } = useApproveTask();
  // const { rejectTask } = useRejectTask();
  const { voucherTaskCompletionState } = useVoucherTaskCompletionContext();

  const mockData = [
    { status: "requested", date: "2025-01-12", task_name: "Volunteer at kitchen", username: "resident" },
    { status: "completed", date: "2025-01-13", task_name: "Clean up after event", username: "alice" },
    { status: "completed", date: "2025-01-13", task_name: "Set up function", username: "bob" },
    { status: "requested", date: "2025-01-14", task_name: "Teach english lesson", username: "charlie" },
  ]

  // const fetchTasks = async () => {
  //   setRequests(voucherTaskCompletionState.tasks);
  // };

  useEffect(() => {
    // fetchTasks();
    if (voucherTaskCompletionState) setRequests(voucherTaskCompletionState.taskCompletions);
  }, [voucherTaskCompletionState]);

  const handleApprove = async (taskName, username) => {
    approveTask(username, taskName);
    // fetchTasks();
  };

  // const handleReject = async (taskName, username) => {
  //   rejectTask(username, taskName);
  //   // fetchTasks();
  // };
  function formatTimestampToDate(timestamp) {
    const createdAt = new Date(timestamp);
    return `${createdAt.toLocaleDateString()} at ${createdAt.toLocaleTimeString()}`;
  }

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
        <TableHead sx={{ backgroundColor: "lightgrey", boxShadow: 1 }} >
          <TableRow>
            <TableCell>Index</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Task Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell/>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((request, idx) => (
            <TableRow key={idx} sx={{backgroundColor: request.status == "requested" ? "lemonchiffon" : "ghostwhite" }}>
              <TableCell>{++idx}</TableCell>
              <TableCell>{request.status}</TableCell>
              <TableCell>{formatTimestampToDate(request.date)}</TableCell>
              <TableCell>{request.task_name}</TableCell>
              <TableCell>{request.username}</TableCell>
              <TableCell>
                {request.status === 'requested' && (
                  <>
                    <Button
                      onClick={() => handleApprove(request.task_name, request.username)}
                      variant="contained"
                      sx={{ backgroundColor: "olivedrab" }}
                    >
                      Approve
                    </Button>
                    {/* <Button
                      onClick={() => handleReject(request.task_name, request.username)}
                      color="secondary"
                    >
                      Reject
                    </Button> */}
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
