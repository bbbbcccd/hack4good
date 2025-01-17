import React, { useEffect, useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Typography, Box } from "@mui/material";
import axios from 'axios';
import useGetVoucherTask from "../../hooks/commons/useGetVoucherTask";
import useApproveTask from '../../hooks/admins/useApproveTask';
import useRejectTask from '../../hooks/admins/useRejectTask';
import { useVoucherTaskContext } from "../../hooks/commons/useVoucherTaskContext";

export default function VoucherTasksPage() {
  const [requests, setRequests] = useState([]);
  useGetVoucherTask();
  const { approveTask } = useApproveTask();
  const { rejectTask } = useRejectTask();
  const { voucherTaskState } = useVoucherTaskContext();

  const fetchTasks = async () => {
    // try {
    //   const response = await axios.get('/task/complete');

    //   if (response.status != 200) {
    //     console.log('Error retrieving tasks: ', response.status, response.data);
    //   } else {
    //     setRequests(response.data);
    //   }
    // } catch (error) {
    //   console.error('Error fetching tasks: ', error);
    // }
    setRequests(voucherTaskState.tasks);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  // useEffect(() => {
  //   setRequests(voucherTaskState.tasks);
  // }, [voucherTaskState.tasks]);

  const handleApprove = async (taskName, username) => {
    // try {
    //   const response = await axios.patch('/task/approve', { taskName, username });
    //   if (response.status != 200) {
    //     console.log('Error approving task: ', response.data);
    //   } else {
    //     fetchTasks();
    //   }
    // } catch (error) {
    //   console.error("Error approving task: ", error);
    // }
    approveTask(username, taskName);
    fetchTasks();
  };

  const handleReject = async (taskName, username) => {
    // try {
    //   const response = await axios.patch('/task/reject', { taskName, username });
    //   if (response.status != 200) {
    //     console.log('Error rejecting task: ', response.data);
    //   } else {
    //     fetchTasks();
    //   }
    // } catch (error) {
    //   console.error("Error rejecting task: ", error);
    // }
    rejectTask(username, taskName);
    fetchTasks();
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Manage Requests
      </Typography>
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
                {request.status === "requested" && (
                  <>
                    <Button onClick={() => handleApprove(request.task_name, request.username)} color="primary">
                      Approve
                    </Button>
                    <Button onClick={() => handleReject(request.task_name, request.username)} color="secondary">
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