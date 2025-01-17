import * as React from 'react';
import { Box, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Typography, CardContent, Badge } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Close, ShoppingCart } from '@mui/icons-material';
import StyledCard from './StyledCard';

import { useAuthContext } from '../hooks/auth/useAuthContext';
import usePurchaseMinimartItem from '../hooks/users/usePurchaseMinimartItem';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs({ cart }) {
  const [open, setOpen] = React.useState(false);
  const { error, loading, purchaseItem } = usePurchaseMinimartItem();
  const { user } = useAuthContext();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handlePurchase = async () => {
    const username = user.username;
    cart.map(item => {
      purchaseItem(username, item.name, item.selectedQuantity);
      if (error) console.log(error);
    });
  }

  return (
    <Box sx={{ 
        ml: "1%"
      }}>
      <Button variant="outlined" onClick={handleClickOpen} 
      sx={{
        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        },
        borderRadius: "50%"
      }}>
        <Badge badgeContent={cart.length} color="primary" ><ShoppingCart color="action" shapeRendering='round' sx={{minHeight: 50}}/></Badge>
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Cart
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <Close />
        </IconButton>
        <DialogContent dividers>
        <Grid container spacing={3}>
        {cart.length > 0 ? cart.map((item, idx) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
            <StyledCard outofstock={item.quantity === 0}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {item.name}
                </Typography>
                <Typography variant="h5" color="primary" gutterBottom>
                  ${item.cost}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {item.quantity === 0 ? "Out of Stock" : `${item.quantity} in stock`}
                </Typography>
                <Typography variant="h6">{`${item.selectedQuantity} selected`}</Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))
        : <Typography variant="h6" gutterBottom color="text.secondary">No items in cart</Typography>}
        </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handlePurchase}>
            Purchase items
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Box>
  );
}
