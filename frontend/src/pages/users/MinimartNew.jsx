import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  CardContent,
  Typography,
  IconButton,
  InputAdornment
} from "@mui/material";
import { styled } from "@mui/system";
import { Add, Remove, Search } from '@mui/icons-material';
import MinimartCart from '../../components/MinimartCart';
import StyledCard from "../../components/StyledCard";
import { axiosPrivate } from "../../util/api/axios";
import { ToastContainer, toast} from 'react-toastify';

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
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const notify = () => toast.success("Purchase complete!");

  const fetchItems = async () => {
    try {
      const response = await axiosPrivate.get('/minimart');

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
      <ToastContainer />
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
        <MinimartCart cart={cart} setCart={setCart} fetchItems={fetchItems} notifySuccess={notify} />
      </Box>

      <Grid container spacing={3}>
        {filteredItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item}>
            <StyledCard outofstock={(item.quantity === 0).toString()}>
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
                    disabled={item.quantity <= 0}
                  >
                    <Add sx={{ color: item.quantity <= 0 ? "grey" : "limegreen" }}/>
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