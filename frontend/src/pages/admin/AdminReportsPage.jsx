import React from "react";
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

export default function AdminReportsPage() {
  // Mock data for reports
  const weeklyReport = [
    { type: "Total Requests", total: 25 },
    { type: "Approved Requests", total: 15 },
    { type: "Rejected Requests", total: 5 },
    { type: "Pending Requests", total: 5 },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Weekly Reports
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {weeklyReport.map((report, index) => (
            <TableRow key={index}>
              <TableCell>{report.type}</TableCell>
              <TableCell>{report.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}