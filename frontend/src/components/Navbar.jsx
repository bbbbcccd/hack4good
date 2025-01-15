import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton position='' size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <a href="https://mwh.muhammadiyah.org.sg/" style={{ display: 'flex', alignItems: 'center' }}>
                <img src="https://mwh.muhammadiyah.org.sg/wp-content/uploads/2021/06/mwh-esig-footer-062.png" style={{ height: '60px', width: 'auto' }} alt="MUHAMMADIYAH WELFARE HOME" id="logo"/>
            </a>
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Link to='/dashboard' >
              <Button sx={{ color: 'white' }} >Dashboard</Button>
            </Link>
            <Link to='/minimart' >
              <Button sx={{ color: 'white' }} >Minimart</Button>
            </Link>
            <Link to='/login' >
              <Button sx={{ color: 'white' }} >Login</Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
