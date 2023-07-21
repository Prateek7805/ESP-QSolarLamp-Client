import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
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
                color="primary"
                aria-label="open drawer"
                edge="start"
                onClick={e=>toggleDrawer(e, true)}
                sx={{ ml: 1, mr: 2, display: { xs: 'none', sm: 'flex' } }}
            >
                <MenuIcon />
            </IconButton>
            <SwipeableDrawer
                anchor='left'
                open={open}
                onClose={e => toggleDrawer(e, false)}
                onOpen={e => toggleDrawer(e, true)}
            >
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={e => toggleDrawer(e, false)}
                    onKeyDown={e => toggleDrawer(e, false)}
                >
                    <List>
                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </SwipeableDrawer>
        </>
    )
}