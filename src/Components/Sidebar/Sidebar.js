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

import logout from '../../Assets/API/Logout';

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDashboard } from '../Context/Modal_Context';


export default function Sidebar() {
    const [open, setOpen] = useState(false);
    
    const {setMDashboard} = useContext(MDashboard);
    const navigate = useNavigate();

    const toggleDrawer = (e, state) => {
        if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
            return;
        }
        setOpen(state);
    };

    const handleLogout = async () => {
        try {
            const response = await logout();
            if (response.error) {
                console.log(response.message);
                setMDashboard({
                    open: true,
                    error: true,
                    title: 'Error in Logging out',
                    message: response.message,
                    navigate: '/'
                });
                return; //-> uncomment for prod
            }
            navigate('/');
        } catch (error) {
            setMDashboard({
                open: true,
                error: true,
                title: "Error in Logging out",
                message: "Unexpected exception in UI",
                navigate: '/'
            });
        }
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
                        {[{text: 'Profile', icon: <AccountCircleIcon/>, hclick: ()=>{}}, {text: 'Account', icon : <SettingsIcon/>, hclick: ()=>{}}, {text: 'Logout', icon: <MeetingRoomIcon/>, hclick: handleLogout}].map((item, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton onClick={item.hclick}>
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