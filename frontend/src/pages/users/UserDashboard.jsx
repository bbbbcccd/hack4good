import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
} from "@mui/material";
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

      {/* Transaction History Section */}
      <Box mb={4}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#2196f3" }}
        >
          📜 Transaction History
        </Typography>
        <Card
          elevation={6}
          sx={{ backgroundColor: "#e3f2fd", color: "#1976d2" }}
        >
          <CardContent>
            <List>
              {transactionHistory.length <= 0 ? (
                <Typography variant="h6" color="fff">
                  No past transactions.
                </Typography>
              ) : (
                transactionHistory.map((txn, index) => (
                  <ListItem
                    key={index}
                    sx={{ justifyContent: "space-between" }}
                  >
                    <span>
                      {new Date(txn.date).getUTCDate()}-
                      {new Date(txn.date).getUTCMonth() + 1}-
                      {new Date(txn.date).getUTCFullYear()} - Purchased{" "}
                      <b>{txn.item_name}</b>
                    </span>
                    <span style={{ fontWeight: "bold" }}>
                      Quantity: {txn.quantity}
                    </span>
                  </ListItem>
                ))
              )}
            </List>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
