import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function Sidebar(){
    return (
        <IconButton
            color="primary"
            aria-label="open drawer"
            edge="start"
            
            sx={{ml: 1,mr: 2, display: { xs: 'none' , sm: 'flex'} }}
        >
            <MenuIcon />
        </IconButton>
    )
}