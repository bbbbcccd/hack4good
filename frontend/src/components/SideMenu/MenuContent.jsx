import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import StoreIcon from '@mui/icons-material/Store';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useAuthContext } from '../../hooks/auth/useAuthContext';

const userListItems = [
  { text: 'Dashboard', icon: <SpaceDashboardIcon />, path: '/dashboard' },
  { text: 'Minimart', icon: <StoreIcon />, path: '/minimart' },
];

const adminListItems = [
  { text: 'Users', icon: <PeopleRoundedIcon />, path: '/admin/users' },
  { text: 'Vouchers', icon: <ConfirmationNumberIcon />, path: '/admin/vouchers' },
  { text: 'Inventory', icon: <InventoryIcon />, path: '/admin/inventory' },
  { text: 'Reports', icon: <AnalyticsRoundedIcon />, path: '/admin/reports' },
];

export default function MenuContent() {
    const location = useLocation();
    const { user, dispatch } = useAuthContext();

    // Amazing Arrowhead code design!!!!!
    return (
        <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
            {user && user.role == "user" && <List dense>
                {userListItems.map(item => (
                    <Link key={item.text} to={item.path} style={{color: 'grey'}}>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton selected={item.path==location.pathname}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>}
            {user && user.role == "admin" && <List dense>
                {adminListItems.map(item => (
                <Link key={item.text} to={item.path} style={{color: 'grey'}}>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton selected={item.path==location.pathname}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                </Link>
                ))}
            </List>}
        </Stack>
    );
}
