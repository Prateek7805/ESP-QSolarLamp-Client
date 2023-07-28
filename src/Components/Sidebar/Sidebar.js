import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

import { useState } from 'react';

export default function Sidebar() {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (e, state) => {
        if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
            return;
        }
        setOpen(state);
    };

    return (
        <>
            <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={e=>toggleDrawer(e, true)}
                sx={{color: '#2BB3C0', ml: 1, mr: 1 }}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor='left'
                open={open}
                onClose={e => toggleDrawer(e, false)}
            >
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={e => toggleDrawer(e, false)}
                    onKeyDown={e => toggleDrawer(e, false)}
                >
                    <List>
                        {[{text: 'Profile', icon: <AccountCircleIcon/>}, {text: 'Account', icon : <SettingsIcon/>}, {text: 'Logout', icon: <MeetingRoomIcon/>}].map((item, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                </Box>
            </Drawer>
        </>
    )
}