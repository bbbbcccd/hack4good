import React, { useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Typography, Box } from "@mui/material";

export default function AdminRequestsPage() {
  // Mock data for requests
  const [requests, setRequests] = useState([
    { id: 1, type: "Voucher", details: "Request 50 points", status: "Pending" },
    { id: 2, type: "Product", details: "Request for Product A", status: "Pending" },
    { id: 3, type: "Voucher", details: "Request 100 points", status: "Approved" },
  ]);

  const handleApprove = (requestId) => {
    setRequests(
      requests.map((request) =>
        request.id === requestId ? { ...request, status: "Approved" } : request
      )
    );
  };

  const handleReject = (requestId) => {
    setRequests(
      requests.map((request) =>
        request.id === requestId ? { ...request, status: "Rejected" } : request
      )
    );
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Manage Requests
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Request ID</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Details</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.id}</TableCell>
              <TableCell>{request.type}</TableCell>
              <TableCell>{request.details}</TableCell>
              <TableCell>{request.status}</TableCell>
              <TableCell>
                {request.status === "Pending" && (
                  <>
                    <Button onClick={() => handleApprove(request.id)} color="primary">
                      Approve
                    </Button>
                    <Button onClick={() => handleReject(request.id)} color="secondary">
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