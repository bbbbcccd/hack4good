import React, { useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Typography, Box, TextField } from "@mui/material";

export default function AdminInventoryPage() {
  // Mock data for inventory
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
    <Box>
      <Typography variant="h4" gutterBottom>
        Inventory Management
      </Typography>
      <Box mb={2}>
        <TextField
          label="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          margin="normal"
        />
        <TextField
          label="Stock"
          type="number"
          value={newItem.stock}
          onChange={(e) => setNewItem({ ...newItem, stock: +e.target.value })}
          margin="normal"
        />
        <Button onClick={handleAddItem} color="primary">
          Add Item
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Item Name</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inventory.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.stock}</TableCell>
              <TableCell>
                <Button onClick={() => handleUpdateStock(item.id, 1)}>Increase</Button>
                <Button onClick={() => handleUpdateStock(item.id, -1)}>Decrease</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}