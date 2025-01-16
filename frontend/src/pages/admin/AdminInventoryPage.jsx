import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  Box,
  TextField,
  Paper,
} from "@mui/material";

export default function AdminInventoryPage() {
  const [inventory, setInventory] = useState([
    { id: 1, name: "Product A", stock: 10 },
    { id: 2, name: "Product B", stock: 5 },
    { id: 3, name: "Product C", stock: 0 },
  ]);

  const [newItem, setNewItem] = useState({ name: "", stock: 0 });

  const handleAddItem = () => {
    setInventory([...inventory, { id: inventory.length + 1, ...newItem }]);
    setNewItem({ name: "", stock: 0 });
  };

  const handleUpdateStock = (itemId, change) => {
    setInventory(
      inventory.map((item) =>
        item.id === itemId ? { ...item, stock: item.stock + change } : item
      )
    );
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* Header Bubble */}
      <Box
        sx={{
          backgroundColor: "#f0f4ff",
          padding: 2,
          borderRadius: 4,
          display: "inline-block",
          mb: 4,
        }}
      >
        <Typography variant="h4" gutterBottom>
          🛠️ Inventory Management
        </Typography>
      </Box>

      {/* Add Item Section */}
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          mb: 4,
          textAlign: "center",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add a New Item
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
          <TextField
            label="Item Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
          <TextField
            label="Stock"
            type="number"
            value={newItem.stock}
            onChange={(e) => setNewItem({ ...newItem, stock: +e.target.value })}
          />
          <Button
            onClick={handleAddItem}
            variant="contained"
            color="primary"
            sx={{ height: "56px" }}
          >
            Add Item
          </Button>
        </Box>
      </Paper>

      {/* Inventory Table */}
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
        <Table sx={{ borderCollapse: "collapse", width: "100%" }}>
          <TableHead>
            <TableRow sx={{ borderBottom: "2px solid #ccc" }}>
              <TableCell sx={{ borderRight: "1px solid #ccc" }}>Item Name</TableCell>
              <TableCell sx={{ borderRight: "1px solid #ccc" }}>Stock</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.map((item) => (
              <TableRow key={item.id} sx={{ borderBottom: "1px solid #eee" }}>
                <TableCell sx={{ borderRight: "1px solid #ccc" }}>
                  {item.name}
                </TableCell>
                <TableCell sx={{ borderRight: "1px solid #ccc" }}>
                  {item.stock}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleUpdateStock(item.id, 1)}
                    sx={{ mr: 1 }}
                    variant="outlined"
                    color="success"
                  >
                    Increase
                  </Button>
                  <Button
                    onClick={() => handleUpdateStock(item.id, -1)}
                    variant="outlined"
                    color="error"
                  >
                    Decrease
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}