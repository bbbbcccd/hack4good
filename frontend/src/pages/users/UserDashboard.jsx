import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useState } from "react";
import CustomAlert from "../../components/CustomAlert";
import useGetTransaction from "../../hooks/users/useGetTransaction";
import { useTransactionContext } from "../../hooks/users/useTransactionContext";
import useGetUserDetails from "../../hooks/users/useGetUserDetails";
import { useUserDetailsContext } from "../../hooks/users/useUserDetailsContext";

export default function UserDashboard() {
  const getTransactionObj = useGetTransaction();
  const { transactionState } = useTransactionContext();
  const transactionHistory = transactionState.transactions;

  const getUserDetailsObj = useGetUserDetails();
  const { userDetailsState } = useUserDetailsContext();
  const userDetails = userDetailsState.user;

  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {getTransactionObj.error && (
        <CustomAlert message={getTransactionObj.error} />
      )}
      {getUserDetailsObj.error && (
        <CustomAlert message={getUserDetailsObj.error} />
      )}

      {/* Dashboard Title */}
      <Box mb={4} textAlign="center">
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#4caf50" }}
        >
          User Dashboard
        </Typography>
        <Typography variant="h6" color="fff">
          Manage your vouchers, track your activity
        </Typography>
      </Box>

      {/* Voucher Balance Section */}
      <Box mb={4}>
        <Card
          elevation={6}
          sx={{ backgroundColor: "#e8f5e9", color: "#4caf50" }}
        >
          <CardContent>
            <Box display="flex" alignItems="center">
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: "bold", marginRight: 2 }}
              >
                💰 Voucher Balance
              </Typography>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              {`${userDetails.vouchers} Point${
                userDetails.vouchers == "1" ? "" : "s"
              }`}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Purchase History Section */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#2196f3" }}
        >
          📜 Purchase History
        </Typography>
        {transactionHistory.length <= 0 ? (
          <Typography variant="h6" color="fff">
            No past transactions.
          </Typography>
        ) : (
          <List>
            {transactionHistory
              .slice(0, expanded ? transactionHistory.length : 3)
              .map((item, index) => (
                <ListItem
                  key={index}
                  sx={{
                    padding: "12px",
                    marginBottom: "8px",
                    borderRadius: "8px",
                    backgroundColor: "#eef4fd", // Subtle contrast background
                    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                    justifyContent: "space-between",
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: "16px",
                          color: "#1976d2",
                        }}
                      >
                        Purchased {item.item_name}
                      </Typography>
                    }
                    secondary={"Quantity: " + item.quantity}
                  />
                  <Typography style={{ fontWeight: "bold", color: "1976d2" }}>
                    {new Date(item.date).getUTCDate() +
                      "-" +
                      new Date(item.date).getUTCMonth() +
                      1 +
                      "-" +
                      new Date(item.date).getUTCFullYear()}
                  </Typography>
                </ListItem>
              ))}
            {transactionHistory.length > 3 && (
              <Button
                onClick={() => toggleExpand()}
                size="small"
                sx={{ textTransform: "none", marginTop: 1 }}
                startIcon={expanded ? <ExpandLess /> : <ExpandMore />}
              >
                {expanded ? "Show Less" : "Show More"}
              </Button>
            )}
          </List>
        )}
      </Box>
    </Container>
  );
}
