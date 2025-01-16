import React, { useState, useEffect } from "react";
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
  Skeleton,
  InputAdornment
} from "@mui/material";
import { styled } from "@mui/system";
import { Add, Remove, Search } from '@mui/icons-material';
import MinimartCart from '../../components/MinimartCart';
import StyledCard from "../../components/StyledCard";
import axios from "axios";

const QuantityControl = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 1,
  backgroundColor: "lightblue",
  borderRadius: 5,
});

const ShopItemList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([
    // {
    //   id: 1,
    //   name: "Premium Headphones",
    //   cost: 199.99,
    //   quantity: 5,
    //   selectedQuantity: 0,
    //   image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    // },
    // {
    //   id: 2,
    //   name: "Wireless Speaker",
    //   cost: 149.99,
    //   quantity: 0,
    //   selectedQuantity: 0,
    //   image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1"
    // },
    // {
    //   id: 3,
    //   name: "Smart Watch",
    //   cost: 299.99,
    //   quantity: 8,
    //   selectedQuantity: 0,
    //   image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    // },
    // {
    //   id: 4,
    //   name: "Wireless Earbuds",
    //   cost: 129.99,
    //   quantity: 3,
    //   selectedQuantity: 0,
    //   image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df"
    // }
  ]);
  const [cart, setCart] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await axios.get('/minimart');

      if (response.status != 200) {
        console.log('Error retrieving items: ', response.status, response.data);
      } else {
        setItems(response.data.map(item => {return {...item, selectedQuantity: 0}}));
      }
    } catch (error) {
      console.error('Error fetching items: ', error);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  const handleIncrease = (name) => {
    setItems(prevItems =>
      prevItems.map(item => {
        if (name === item.name) {
          const updatedItem = { ...item, selectedQuantity: item.selectedQuantity + 1 };
          
          if (item.selectedQuantity > 0) {
            setCart(prevCart => 
              prevCart.map(cartItem => {
                if (name == cartItem.name) {
                  return updatedItem;
                }
                return cartItem;
              })
            );
          } else {
            setCart(prevCart => [...prevCart, updatedItem]);
          }

          return updatedItem;
        }
        return item;
      })
    );
  };
  const handleDecrease = (name) => {
    setItems(prevItems =>
      prevItems.map(item => {
        if (name === item.name) {
          const updatedItem = { ...item, selectedQuantity: item.selectedQuantity - 1 };

          if (item.selectedQuantity <= 1) {
            setCart(prevCart => 
              prevCart.filter(cartItem => cartItem.name != name)
            );
          } else {
            setCart(prevCart => 
              prevCart.map(cartItem => {
                if (name == cartItem.name) {
                  return updatedItem;
                }
                return cartItem;
              })
            );
          }

          return updatedItem;
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
      <Box sx={{ mb: 4, display: "flex", flexDirection: "row" }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (<InputAdornment position="start"><Search size={20} style={{ marginRight: 8 }} /></InputAdornment>
            ),
            sx: {
              height: '100%'
            }
          }}
          sx={{"&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
            },
          }}
        />
        <MinimartCart cart={cart} />
      </Box>

      <Grid container spacing={3}>
        {filteredItems.map((item, idx) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
            <StyledCard outofstock={item.quantity === 0}>
              {/* {item.image ? <StyledImage
                src={item.image}
                alt={item.name}
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1595246140520-c89b3b0a0b80";
                }}
              /> : <Skeleton variant="rectangular" />} */}
              <CardContent >
                <Typography variant="h6" gutterBottom>
                  {item.name}
                </Typography>
                <Typography variant="h5" color="primary" gutterBottom>
                  ${item.cost}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {item.quantity === 0 ? "Out of Stock" : `${item.quantity} in stock`}
                </Typography>
                <QuantityControl>
                  <IconButton
                    aria-label="decrease quantity"
                    onClick={() => handleDecrease(item.name)}
                    disabled={item.selectedQuantity <= 0}
                  >
                    <Remove sx={{ color: item.selectedQuantity > 0 ? "error.main" : "grey" }} />
                  </IconButton>
                  <Typography variant="h6">{item.selectedQuantity}</Typography>
                  <IconButton
                    aria-label="increase quantity"
                    onClick={() => handleIncrease(item.name)}
                    // disabled={item.quantity === 0 || item.selectedQuantity === item.quantity}
                  >
                    <Add sx={{ color: "limegreen" }}/>
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