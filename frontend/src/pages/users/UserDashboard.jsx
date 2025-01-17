import React from "react";
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

export default function UserDashboard() {
  // Mock data for designing the dashboard
  const voucherBalance = 150;
  const transactionHistory = [
    { date: "2025-01-12", description: "Purchased Item A", amount: -20 },
    { date: "2025-01-11", description: "Earned Vouchers", amount: +50 },
    { date: "2025-01-10", description: "Purchased Item B", amount: -30 },
  ];
  const products = [
    { id: 1, name: "Item A", price: 20 },
    { id: 2, name: "Item B", price: 30 },
    { id: 3, name: "Item C", price: 50 },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Dashboard Title */}
      <Box mb={4} textAlign="center">
        <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold", color: "#4caf50" }}>
          User Dashboard
        </Typography>
        <Typography variant="h6" color="fff">
          Manage your vouchers, track your activity, and explore available products.
        </Typography>
      </Box>

      {/* Voucher Balance Section */}
      <Box mb={4}>
        <Card elevation={6} sx={{ backgroundColor: "#e8f5e9", color: "#4caf50" }}>
          <CardContent>
            <Box display="flex" alignItems="center">
              <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", marginRight: 2 }}>
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
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: "#2196f3" }}>
          📜 Transaction History
        </Typography>
        <Card elevation={6} sx={{ backgroundColor: "#e3f2fd", color: "#1976d2" }}>
          <CardContent>
            <List>
              {transactionHistory.map((txn, index) => (
                <ListItem key={index} sx={{ justifyContent: "space-between" }}>
                  <span>{txn.date} - {txn.description}</span>
                  <span style={{ fontWeight: "bold" }}>
                    {txn.amount > 0 ? "+" : ""}{txn.amount} points
                  </span>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>

      {/* Available Products Section */}
      <Box mb={4}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: "#f57c00" }}>
          🛒 Available Products
        </Typography>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card elevation={6} sx={{ backgroundColor: "#fff3e0", color: "#f57c00" }}>
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