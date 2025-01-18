import { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import useGetVoucherTaskCompletion from "../../hooks/admins/useGetVoucherTaskCompletion";
import useGetVoucherTask from "../../hooks/commons/useGetVoucherTask";
import useApproveTask from "../../hooks/admins/useApproveTask";
import { useVoucherTaskCompletionContext } from "../../hooks/commons/useVoucherTaskCompletionContext";
import CustomrAlert from "../../components/CustomAlert";
import AddVoucherModal from "../../components/Vouchers/AddVoucherTask";
import useAddTask from "../../hooks/admins/useAddTask";
import useDeleteTask from "../../hooks/admins/useDeleteTask";
import useUpdateTask from "../../hooks/admins/useUpdateTask";
import { useVoucherTaskContext } from "../../hooks/commons/useVoucherTaskContext";

export default function VoucherTasksPage() {
  const { error: getTaskCompletionError } = useGetVoucherTaskCompletion();
  const { error: getTasksError } = useGetVoucherTask();
  const { approveTask } = useApproveTask();
  const { voucherTaskCompletionState } = useVoucherTaskCompletionContext();
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const { error: addTaskError, loading: addTaskLoading, addTask } = useAddTask();
  const { error: deleteTaskError, loading: deleteTaskLoading, deleteTask } = useDeleteTask();
  const { error: updateTaskError, loading: updateTaskLoading, updateTask } = useUpdateTask();
  const { voucherTaskState } = useVoucherTaskContext();
  const tasks = voucherTaskState.tasks;
  const taskCompletions = voucherTaskCompletionState.taskCompletions;
  const [currTaskName, setCurrTaskName] = useState("");

  const handleApprove = (taskName, username) => {
    approveTask(username, taskName);
  };

  const handleAddTask = (taskName, reward) => {
    if (taskName && reward) {
      addTask(taskName, reward);
    }
    setIsOpenAdd(false);
  };

  const handleEditTask = (name, reward) => {
    if (name && reward) {
      updateTask(currTaskName, name, reward);
    }
    setIsOpenEdit(false);
  };

  const handleDeleteTask = (name) => {
    return () => deleteTask(name);
  };

  function formatTimestampToDate(timestamp) {
    const createdAt = new Date(timestamp);
    return `${createdAt.toLocaleDateString()} at ${createdAt.toLocaleTimeString()}`;
  }

  return (
    <Box sx={{ p: 3 }}>
      {getTaskCompletionError && <CustomrAlert message={getTaskCompletionError} />}
      {getTasksError && <CustomrAlert message={getTasksError} />}
      {deleteTaskError && <CustomrAlert message={deleteTaskError} />}
      {addTaskError && <CustomrAlert message={addTaskError} />}
      {updateTaskError && <CustomrAlert message={updateTaskError} />}
      <Box
        sx={{
          backgroundColor: "#f0f4ff",
          borderRadius: "20px",
          padding: 3,
          textAlign: "center",
          marginBottom: 4,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "salmon" }}>
          📊 Manage Requests
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsOpenAdd(true)}
          disabled={addTaskLoading}
        >
          Add Voucher Task
        </Button>
      </Box>

      <AddVoucherModal
        open={isOpenAdd}
        onClose={() => setIsOpenAdd(false)}
        onSubmit={handleAddTask}
      />

      <AddVoucherModal
        open={isOpenEdit}
        onClose={() => setIsOpenEdit(false)}
        onSubmit={handleEditTask}
      />

      <Paper sx={{ mb: 4, overflow: "hidden", borderRadius: 3 }}>
        <Typography variant="h6" sx={{ p: 2, backgroundColor: "aliceblue", color: "seagreen" }}>
          Available Tasks
        </Typography>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#fafafa" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Task Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Reward</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task, idx) => (
              <TableRow key={idx} sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.reward}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="info"
                    disabled={updateTaskLoading}
                    onClick={() => {
                      setIsOpenEdit(true);
                      setCurrTaskName(task.name);
                    }}
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="warning"
                    disabled={deleteTaskLoading}
                    onClick={handleDeleteTask(task.name)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Task Completions Table */}
      <Paper sx={{ overflow: "hidden", borderRadius: 3 }}>
        <Typography variant="h6" sx={{ p: 2, backgroundColor: "aliceblue", color: "tomato" }}>
          Task Completion Requests
        </Typography>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#fafafa" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Task Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Username</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {taskCompletions.map((request, idx) => (
              <TableRow
                key={idx}
                sx={{
                  backgroundColor: request.status === "requested" ? "#fff3e0" : "#e8f5e9",
                  "&:hover": {
                    backgroundColor: request.status === "requested" ? "#ffe0b2" : "#c8e6c9",
                  },
                }}
              >
                <TableCell>{formatTimestampToDate(request.date)}</TableCell>
                <TableCell>{request.task_name}</TableCell>
                <TableCell>{request.username}</TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell>
                  {request.status === "requested" && (
                    <Button
                      onClick={() => handleApprove(request.task_name, request.username)}
                      variant="contained"
                      sx={{
                        backgroundColor: "olivedrab",
                        "&:hover": { backgroundColor: "#4b6023" },
                      }}
                    >
                      Approve
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
