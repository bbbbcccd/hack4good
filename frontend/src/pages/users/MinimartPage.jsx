import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";

import useGetMinimart from "../../hooks/commons/useGetMinimart.js";
import useAddMinimartItem from "../../hooks/admins/useAddMinimartItem.js";
import useDeleteMinimartItem from "../../hooks/admins/useDeleteMinimartItem.js";
import useUpdateMinimartItem from "../../hooks/admins/useUpdateMinimartItem.js";
import { useMinimartContext } from "../../hooks/commons/useMinimartContext.js";

export default function MinimartPage() {
  // Get minimart items
  // TODO: Display items based on minimartState
  const getItems = useGetMinimart();
  const { minimartState } = useMinimartContext();
  console.log(minimartState); // NOTE: For debugging only. To be removed

  const addItem = useAddMinimartItem();
  const deleteItem = useDeleteMinimartItem();
  const updateItem = useUpdateMinimartItem();
  // TODO: Dummy test button handler for hooks. To be removed.
  const testButton = async () => {
    await addItem.addItem("test", 1, 12);
    await updateItem.updateItem("test", "test1", 12, 1);
    await deleteItem.deleteItem("test1");
  };

  // Mock data for products
  const mockProducts = [
    { id: 1, name: "Product A", price: 20, inStock: true },
    { id: 2, name: "Product B", price: 30, inStock: false },
    { id: 3, name: "Product C", price: 50, inStock: true },
    { id: 4, name: "Product D", price: 15, inStock: false },
    { id: 5, name: "Product E", price: 25, inStock: true },
  ];

  const [products, setProducts] = useState(mockProducts);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle item requests or preorders
  const handleRequest = (productId, isPreorder = false) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      const message = isPreorder
        ? `Preorder placed for ${product.name}!`
        : `Requested ${product.name} successfully!`;
      setSuccessMessage(message);
    } else {
      setErrorMessage("Product not found.");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Page Title */}
      <Box mb={4} textAlign="center">
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#4caf50" }}
        >
          Minimart
        </Typography>
        <Typography variant="h6" color="fff">
          Request available items or preorder out-of-stock products.
        </Typography>
      </Box>

      {/* TODO: Dummy test button for hooks. To be removed */}
      <Button variant="contained" onClick={() => testButton()}>
        TEST
      </Button>

      {/* Success Message */}
      {successMessage && (
        <Snackbar
          open={!!successMessage}
          autoHideDuration={6000}
          onClose={() => setSuccessMessage("")}
        >
          <Alert severity="success">{successMessage}</Alert>
        </Snackbar>
      )}

      {/* Error Message */}
      {errorMessage && (
        <Snackbar
          open={!!errorMessage}
          autoHideDuration={6000}
          onClose={() => setErrorMessage("")}
        >
          <Alert severity="error">{errorMessage}</Alert>
        </Snackbar>
      )}

      {/* Product List */}
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
                <Typography
                  variant="body2"
                  sx={{
                    color: product.inStock ? "#4caf50" : "#f44336",
                    fontWeight: "bold",
                  }}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: product.inStock ? "#4caf50" : "#ff9800",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: product.inStock ? "#43a047" : "#ef6c00",
                    },
                  }}
                  onClick={() => handleRequest(product.id, !product.inStock)}
                >
                  {product.inStock ? "Request" : "Preorder"}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
