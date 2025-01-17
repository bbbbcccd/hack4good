import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
} from "@mui/material";
import {
  CheckCircle,
  Cancel,
  HourglassEmpty,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";

export default function AdminReportsPage() {
  const voucherRequests = {
    summary: [{ total: 15 }],
    details: {
      approved: [
        { name: "David", task: "Voucher (10 pts) for Task A" },
        { name: "Ethan", task: "Voucher (15 pts) for Task B" },
        { name: "Liam", task: "Voucher (5 pts) for Task C" },
        { name: "Noah", task: "Voucher (8 pts) for Task D" },
        { name: "James", task: "Voucher (12 pts) for Task E" },
      ],
      rejected: [
        { name: "William", task: "Voucher (6 pts) for Task F" },
        { name: "Benjamin", task: "Voucher (7 pts) for Task G" },
      ],
      pending: [
        { name: "Lucas", task: "Voucher (9 pts) for Task H" },
        { name: "Henry", task: "Voucher (11 pts) for Task I" },
      ],
    },
  };

  const productRequests = {
    summary: [{ total: 10 }],
    details: {
      approved: [
        { name: "Oliver", task: "Requested for Product A" },
        { name: "Mason", task: "Requested for Product B" },
        { name: "Logan", task: "Requested for Product C" },
        { name: "Elijah", task: "Requested for Product D" },
        { name: "Alexander", task: "Requested for Product E" },
      ],
      rejected: [
        { name: "Michael", task: "Requested for Product F" },
        { name: "Daniel", task: "Requested for Product G" },
      ],
      pending: [
        { name: "Matthew", task: "Requested for Product H" },
        { name: "Joseph", task: "Requested for Product I" },
        { name: "Samuel", task: "Requested for Product J" },
      ],
    },
  };

  const [expanded, setExpanded] = useState({
    voucherApproved: false,
    voucherRejected: false,
    voucherPending: false,
    productApproved: false,
    productRejected: false,
    productPending: false,
  });

  const toggleExpand = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderDetails = (detailsData, typeKey) => (
    <>
      {Object.entries(detailsData).map(([status, items]) => (
        <Box key={status} sx={{ marginBottom: 4 }}>
          <Typography
            variant="h6"
            sx={{
              marginBottom: 1,
              fontWeight: "bold",
              color:
                status === "approved"
                  ? "#4CAF50"
                  : status === "rejected"
                  ? "#F44336"
                  : "#FF9800",
            }}
          >
            {status === "approved" && (
              <CheckCircle sx={{ verticalAlign: "middle", marginRight: 1 }} />
            )}
            {status === "rejected" && (
              <Cancel sx={{ verticalAlign: "middle", marginRight: 1 }} />
            )}
            {status === "pending" && (
              <HourglassEmpty sx={{ verticalAlign: "middle", marginRight: 1 }} />
            )}
            {status.charAt(0).toUpperCase() + status.slice(1)} Requests (
            {items.length})
          </Typography>
          <List>
            {items.slice(0, expanded[typeKey + status] ? items.length : 3).map((item, index) => (
              <ListItem
                key={index}
                sx={{
                  padding: "12px",
                  marginBottom: "8px",
                  borderRadius: "8px",
                  backgroundColor: "#eef4fd", // Subtle contrast background
                  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: "bold", fontSize: "16px", color: "#333" }}>
                      {item.name}
                    </Typography>
                  }
                  secondary={item.task}
                  secondaryTypographyProps={{ color: "#555" }} // Darker gray for secondary text
                />
              </ListItem>
            ))}
          </List>
          {items.length > 3 && (
            <Button
              onClick={() => toggleExpand(typeKey + status)}
              size="small"
              sx={{ textTransform: "none", marginTop: 1 }}
              startIcon={expanded[typeKey + status] ? <ExpandLess /> : <ExpandMore />}
            >
              {expanded[typeKey + status] ? "Show Less" : "Show More"}
            </Button>
          )}
        </Box>
      ))}
    </>
  );

  return (
    <Box sx={{ padding: 4 }}>
      {/* Header Bubble */}
      <Box
        sx={{
          backgroundColor: "#f0f4ff",
          borderRadius: "20px",
          padding: 3,
          textAlign: "center",
          marginBottom: 4,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          📊 Weekly Reports
        </Typography>
      </Box>

      {/* Voucher Requests Section */}
      <Card
        sx={{
          padding: 4,
          marginBottom: 6,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", marginBottom: 2, color: "#2196F3" }}
        >
          Voucher Requests ({voucherRequests.summary[0].total})
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        {renderDetails(voucherRequests.details, "voucher")}
      </Card>

      {/* Product Requests Section */}
      <Card
        sx={{
          padding: 4,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", marginBottom: 2, color: "#2196F3" }}
        >
          Product Requests ({productRequests.summary[0].total})
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        {renderDetails(productRequests.details, "product")}
      </Card>
    </Box>
  );
}