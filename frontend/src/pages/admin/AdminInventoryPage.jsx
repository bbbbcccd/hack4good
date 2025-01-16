import React, { useState } from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Tooltip,
} from "@mui/material";
import { Add, Remove, Search, Save, FilterList } from "@mui/icons-material";

export default function AdminInventoryPage() {
  const [inventory, setInventory] = useState([
    { id: 1, name: "Product A", stock: 10, category: "Electronics" },
    { id: 2, name: "Product B", stock: 5, category: "Groceries" },
    { id: 3, name: "Product C", stock: 0, category: "Groceries" },
  ]);
  const [newItem, setNewItem] = useState({ name: "", stock: 0, category: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filter, setFilter] = useState("All");

  const handleAddItem = () => {
    setInventory([
      ...inventory,
      { id: inventory.length + 1, ...newItem },
    ]);
    setNewItem({ name: "", stock: 0, category: "" });
    setDialogOpen(false);
  };

  const handleUpdateStock = (itemId, change) => {
    setInventory(
      inventory.map((item) =>
        item.id === itemId ? { ...item, stock: Math.max(0, item.stock + change) } : item
      )
    );
  };

  const filteredInventory = inventory.filter((item) => {
    if (filter === "Low Stock") return item.stock > 0 && item.stock <= 5;
    if (filter === "Out of Stock") return item.stock === 0;
    return true; // 'All' filter
  }).filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
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
          🛠️ Inventory Management
        </Typography>
      </Box>

      {/* Search and Filter Bar */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4, alignItems: "center" }}>
        <TextField
          label="Search Inventory"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: <Search />,
          }}
          sx={{ width: "70%" }}
        />
        <FormControl sx={{ width: "25%" }}>
          <InputLabel id="filter-label" sx={{ top: "-6px", fontSize: "1rem" }}>
            Filter
          </InputLabel>
          <Select
            labelId="filter-label"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            startAdornment={<FilterList sx={{ mr: 1 }} />}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Low Stock">Low Stock</MenuItem>
            <MenuItem value="Out of Stock">Out of Stock</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Inventory Cards */}
      <Grid container spacing={2}>
        {filteredInventory.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ position: "relative", textAlign: "center", padding: 2 }}>
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "bold",
                    color:
                      item.stock === 0
                        ? "error.main"
                        : item.stock <= 5
                        ? "warning.main"
                        : "success.main",
                  }}
                >
                  {item.stock}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Stock Level
                </Typography>
                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    justifyContent: "center",
                    gap: 1,
                  }}
                >
                  {/* Decrease Stock Button */}
                  <Tooltip title="Decrease Stock">
                    <Box
                      sx={{
                        backgroundColor: "#ffd1d1",
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => handleUpdateStock(item.id, -1)}
                    >
                      <Remove sx={{ fontSize: "24px", color: "error.main" }} />
                    </Box>
                  </Tooltip>
                  {/* Increase Stock Button */}
                  <Tooltip title="Increase Stock">
                    <Box
                      sx={{
                        backgroundColor: "#d1e7ff",
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => handleUpdateStock(item.id, 1)}
                    >
                      <Add sx={{ fontSize: "24px", color: "primary.main" }} />
                    </Box>
                  </Tooltip>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add Item Button */}
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setDialogOpen(true)}
          startIcon={<Add />}
        >
          Add New Item
        </Button>
      </Box>

      {/* Add Item Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Add a New Item</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Item Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Stock"
            type="number"
            value={newItem.stock}
            onChange={(e) => setNewItem({ ...newItem, stock: Math.max(0, +e.target.value) })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Category"
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddItem} color="primary" startIcon={<Save />}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}