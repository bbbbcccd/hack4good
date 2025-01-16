import * as React from 'react';
import { Box, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Typography, CardContent, Badge } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Close, ShoppingCart } from '@mui/icons-material';
import StyledCard from './StyledCard';

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

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handlePurchase = async () => {
    //TODO
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

  return (
    <Box sx={{ marginTop: 5 }}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open Cart 
        <Badge badgeContent={cart.length} color="primary" ><ShoppingCart color="action"/></Badge>
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
