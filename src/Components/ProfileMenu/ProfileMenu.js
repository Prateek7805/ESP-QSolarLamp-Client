import * as React from 'react';
import { Avatar } from '@mui/material';
import Button from '@mui/joy/Button';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

export default function ProfileMenu(props) {
    const {initials} = props;
    const menuBtnRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        ref={menuBtnRef}
        id="positioned-demo-button"
        aria-controls={'positioned-demo-menu'}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="outlined"
        color="neutral"
        onClick={() => {
          setOpen(!open);
        }}
        style={{background: 'none',
        border: 'none',
        paddingBlock : 0,
        paddingInline: 0,
        fontWeight: '200'}}
        sx={{mr: 1}}
      >
        <Avatar style={{backgroundColor : '#82CD47'}} sx={{ width: 32, height: 32}}>{initials}</Avatar>
      </Button>
      <Menu
        id="positioned-demo-menu"
        anchorEl={menuBtnRef.current}
        open={open}
        onClose={handleClose}
        aria-labelledby="positioned-demo-button"
        placement="bottom-end"
      >
        <MenuItem onClick={handleClose}>
          <ListItemDecorator>
            <MeetingRoomIcon/>
          </ListItemDecorator>{' '}
          Logout
        </MenuItem>
      </Menu>
    </div>
    )
}