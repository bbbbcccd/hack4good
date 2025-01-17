import { useState, useEffect } from 'react';
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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Tooltip,
} from '@mui/material';
import { Add, Remove, Search, Save, FilterList } from '@mui/icons-material';
import useAddMinimartItem from '../../hooks/admins/useAddMinimartItem';
import useDeleteMinimartItem from '../../hooks/admins/useDeleteMinimartItem';
import useUpdateMinimartItem from '../../hooks/admins/useUpdateMinimartItem';
import { axiosPrivate } from '../../util/api/axios.js';
import CustomAlert from '../../components/CustomAlert.jsx';

export default function AdminInventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', cost: 0, quantity: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filter, setFilter] = useState('All');

  const { addItem, loading: adding, error: addError } = useAddMinimartItem();
  const { deleteItem, loading: deleting, error: deleteError } = useDeleteMinimartItem();
  const { updateItem, loading: updating, error: updateError } = useUpdateMinimartItem();

  // Fetch inventory on load
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await axiosPrivate.get('/minimart');
        setInventory(res.data);
      } catch (error) {
        console.error('Failed to fetch inventory', error);
      }
    };
    fetchInventory();
  }, []);

  // Add new item
  const handleAddItem = async () => {
    await addItem(newItem.name, newItem.cost, newItem.quantity);
    setInventory([...inventory, newItem]);
    setNewItem({ name: '', cost: 0, quantity: 0 });
    setDialogOpen(false);
  };

  // Update stock level
  const handleUpdateStock = async (name, change) => {
    const item = inventory.find((i) => i.name === name);
    if (item) {
      const updatedQuantity = Math.max(0, item.quantity + change);
      await updateItem(item.name, item.name, item.cost, updatedQuantity);
      setInventory(
        inventory.map((i) => (i.name === name ? { ...i, quantity: updatedQuantity } : i)),
      );
    }
  };

  // Delete item
  const handleDeleteItem = async (name) => {
    await deleteItem(name);
    setInventory(inventory.filter((item) => item.name !== name));
  };

  const filteredInventory = inventory
    .filter((item) => {
      if (filter === 'Low Stock') return item.quantity > 0 && item.quantity <= 5;
      if (filter === 'Out of Stock') return item.quantity === 0;
      return true; // 'All' filter
    })
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  return (
    <>
      {addError && <CustomAlert message={addError} severity="error" />}
      {deleteError && <CustomAlert message={deleteError} severity="error" />}
      {updateError && <CustomAlert message={updateError} severity="error" />}
      <Box sx={{ padding: 4 }}>
        {/* Header */}
        <Box
          sx={{
            backgroundColor: '#f0f4ff',
            borderRadius: '20px',
            padding: 3,
            textAlign: 'center',
            marginBottom: 4,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'salmon' }}>
            🛠️ Inventory Management
          </Typography>
        </Box>

        {/* Search and Filter Bar */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, alignItems: 'center' }}>
          <TextField
            label="Search Inventory"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{ endAdornment: <Search /> }}
            sx={{ width: '70%' }}
          />
          <FormControl sx={{ width: '25%' }}>
            <InputLabel id="filter-label" sx={{ top: '-6px', fontSize: '1rem' }}>
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
              <Card sx={{ position: 'relative', textAlign: 'center', padding: 2 }}>
                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 'bold',
                      color:
                        item.quantity === 0
                          ? 'error.main'
                          : item.quantity <= 5
                          ? 'warning.main'
                          : 'success.main',
                    }}
                  >
                    {item.quantity}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Stock Level
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <Tooltip title="Decrease Stock">
                      <Box
                        sx={{
                          backgroundColor: '#ffd1d1',
                          borderRadius: '50%',
                          width: '50px',
                          height: '50px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleUpdateStock(item.name, -1)}
                      >
                        <Remove sx={{ fontSize: '24px', color: 'error.main' }} />
                      </Box>
                    </Tooltip>
                    <Tooltip title="Increase Stock">
                      <Box
                        sx={{
                          backgroundColor: '#d1e7ff',
                          borderRadius: '50%',
                          width: '50px',
                          height: '50px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleUpdateStock(item.name, 1)}
                      >
                        <Add sx={{ fontSize: '24px', color: 'primary.main' }} />
                      </Box>
                    </Tooltip>
                  </Box>
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{ mt: 2 }}
                    onClick={() => handleDeleteItem(item.name)}
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Add Item Button */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
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
              label="Cost"
              type="number"
              value={newItem.cost}
              onChange={(e) => setNewItem({ ...newItem, cost: Math.max(0, +e.target.value) })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Quantity"
              type="number"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: Math.max(0, +e.target.value) })}
              sx={{ mb: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleAddItem} color="primary" startIcon={<Save />} disabled={adding}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
