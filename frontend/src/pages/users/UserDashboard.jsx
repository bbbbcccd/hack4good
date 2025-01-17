import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  Button,
  Divider,
} from "@mui/material";
import useGetTransaction from "../../hooks/users/useGetTransaction";
import { useTransactionContext } from "../../hooks/users/useTransactionContext";

export default function UserDashboard() {
  // Mock data for designing the dashboard
  const voucherBalance = 150;
  const { error } = useGetTransaction();
  const { transactionState } = useTransactionContext();
  const transactionHistory = transactionState.transactions;

  const products = [
    { id: 1, name: "Item A", price: 20 },
    { id: 2, name: "Item B", price: 30 },
    { id: 3, name: "Item C", price: 50 },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
          Manage your vouchers, track your activity, and explore available
          products.
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
              {voucherBalance} Points
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
              {transactionHistory.map((txn, index) => (
                <ListItem key={index} sx={{ justifyContent: "space-between" }}>
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
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>

      {/* Available Products Section */}
      <Box mb={4}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#f57c00" }}
        >
          🛒 Available Products
        </Typography>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                elevation={6}
                sx={{ backgroundColor: "#fff3e0", color: "#f57c00" }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Price: {product.price} points
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: "#f57c00",
                      color: "#fff",
                      "&:hover": { backgroundColor: "#ef6c00" },
                    }}
                    onClick={() => console.log(`Requested: ${product.name}`)}
                  >
                    Request
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
