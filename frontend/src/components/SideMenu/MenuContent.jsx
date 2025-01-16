import * as React from 'react';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import StoreIcon from '@mui/icons-material/Store';
// import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import InventoryIcon from '@mui/icons-material/Inventory';
// import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
// import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
// import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
// import HelpRoundedIcon from '@mui/icons-material/HelpRounded';

const userListItems = [
  { text: 'Dashboard', icon: <SpaceDashboardIcon />, path: '/dashboard' },
  { text: 'Minimart', icon: <StoreIcon />, path: '/minimart' },
//   { text: 'Clients', icon: <PeopleRoundedIcon /> },
];

const adminListItems = [
  { text: 'Users', icon: <PeopleRoundedIcon />, path: '/admin/users' },
  { text: 'Vouchers', icon: <ConfirmationNumberIcon />, path: '/admin/vouchers' },
  { text: 'Inventory', icon: <InventoryIcon />, path: '/admin/inventory' },
  { text: 'Reports', icon: <AnalyticsRoundedIcon />, path: '/admin/reports' },
];

export default function MenuContent() {
    return (
        <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
            <List dense>
                {userListItems.map((item, index) => (
                    <Link to={item.path} style={{color: 'grey'}}>
                        <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton selected={index === 0}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
            <List dense>
                {adminListItems.map((item, index) => (
                <Link to={item.path} style={{color: 'grey'}}>
                    <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                </Link>
                ))}
            </List>
        </Stack>
    );
}
