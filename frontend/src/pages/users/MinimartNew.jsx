import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import { Add, Remove, Search } from '@mui/icons-material';

const StyledCard = styled(Card)(({ theme, outofstock }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  opacity: outofstock ? 0.6 : 1,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
  }
}));

const StyledImage = styled("img")({
  width: "100%",
  height: 200,
  objectFit: "cover"
});

const QuantityControl = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 1
});

const ShopItemList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Premium Headphones",
      price: 199.99,
      stock: 5,
      selectedQuantity: 0,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    {
      id: 2,
      name: "Wireless Speaker",
      price: 149.99,
      stock: 0,
      selectedQuantity: 0,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1"
    },
    {
      id: 3,
      name: "Smart Watch",
      price: 299.99,
      stock: 8,
      selectedQuantity: 0,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    },
    {
      id: 4,
      name: "Wireless Earbuds",
      price: 129.99,
      stock: 3,
      selectedQuantity: 0,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df"
    }
  ]);

  const handleQuantityChange = (id, increment) => {
    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const newQuantity = increment
            ? Math.min(item.selectedQuantity + 1, item.stock)
            : Math.max(item.selectedQuantity - 1, 0);
          return { ...item, selectedQuantity: newQuantity };
        }
        return item;
      })
    );
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <Search size={20} style={{ marginRight: 8 }} />
          }}
        />
      </Box>

      <Grid container spacing={3}>
        {filteredItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <StyledCard outofstock={item.stock === 0}>
              <StyledImage
                src={item.image}
                alt={item.name}
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1595246140520-c89b3b0a0b80";
                }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {item.name}
                </Typography>
                <Typography variant="h5" color="primary" gutterBottom>
                  ${item.price}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {item.stock === 0 ? "Out of Stock" : `${item.stock} in stock`}
                </Typography>
                <QuantityControl>
                  <IconButton
                    aria-label="decrease quantity"
                    onClick={() => handleQuantityChange(item.id, false)}
                    disabled={item.stock === 0 || item.selectedQuantity === 0}
                  >
                    <Remove />
                  </IconButton>
                  <Typography variant="h6">{item.selectedQuantity}</Typography>
                  <IconButton
                    aria-label="increase quantity"
                    onClick={() => handleQuantityChange(item.id, true)}
                    disabled={item.stock === 0 || item.selectedQuantity === item.stock}
                  >
                    <Add />
                  </IconButton>
                </QuantityControl>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ShopItemList;