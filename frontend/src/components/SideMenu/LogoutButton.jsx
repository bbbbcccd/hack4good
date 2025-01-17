import Button from '@mui/material/Button';
import * as React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLogout } from '../../hooks/auth/useLogout';

export default function LogoutButton() {
    const { logout } = useLogout();
    
    return (
        <Button
          variant="contained"
          fullWidth
          onClick={logout}
          sx={{ mt: 1, backgroundColor: "grey" }}
        >
          Logout <LogoutIcon sx={{ml: 1}}/>
        </Button>
    );
}