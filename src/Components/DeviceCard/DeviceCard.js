import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useContext } from 'react';
import { MDelete, MDevice, MDeviceSettings } from '../Context/Modal_Context';
import { DashboardPageStatus } from '../Context/Dashboard_Context';
import { IconButton } from '@mui/material';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import ValueSpinner from '../Spinners/ValueSpinner/ValueSpinner';
import Dot from '../Dot/Dot';
import './DeviceCard.css';
const ColorButton = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    color: '#000000',
    backgroundColor: '#ffffff',
    '&:hover': {
        backgroundColor: '#ffffff',
    },
}));

const AddDevice = () => {
    const { setMDevice } = useContext(MDevice);
    const hAddDevice = () => {
        setMDevice(prev => {
            return {
                ...prev,
                open: true
            }
        });
    }
    return (
        <ColorButton variant="contained" onClick={hAddDevice} sx={{ width: '100%', minHeight: '200px', display: 'grid', placeItems: 'center' }}>

            <Typography variant="h5" color="text.secondary" sx={{ mx: 2 }}>
                Add a device
            </Typography>

        </ColorButton>
    )
}
const Device = (props) => {
    const { name, power, brightness, color } = props;
    const { setPageStatus } = useContext(DashboardPageStatus);
    const { setMDelete } = useContext(MDelete);
    const { setMDeviceSettings } = useContext(MDeviceSettings);

    const hControls = () => {
        setPageStatus(prev => {
            return {
                ...prev,
                path: "controls",
                device_name: name
            }
        });
    }
    const hDelete = () => {
        setMDelete(prev => {
            return {
                ...prev,
                open: true,
                name: name
            }
        });
    };
    const hSettings = () => {
        setMDeviceSettings(prev => {
            return {
                ...prev,
                open: true,
                name: name
            }
        });
    }
    return (
        <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', minHeight: '200px' }}>
            <CardContent>
                <Typography align="center" variant="h6" sx={{ mb: 2 }}>
                    {name}
                </Typography>
                <div className='d-flex mb-1'>
                    <Typography varient="body2" color="text.secondary">Power:</Typography>
                    <Typography varient="body2" color="text.secondary" sx={{ ml: 1 }}>{power ? 'On' : 'Off'}</Typography>
                    <Dot status={power ? 'on' : 'off'} className='ms-1 mt-1' />
                </div>
                <div className='d-flex mb-1'>
                    <Typography varient="body2" color="text.secondary">Brightness:</Typography>

                    <ValueSpinner size='sm' className='ms-1' variant='determinate' value={brightness} color={color} />
                </div>
            </CardContent>
            <CardActions disableSpacing className='device-card-options justify-content-evenly justify-content-md-center'>
                    <IconButton onClick={hControls}>
                        <DisplaySettingsIcon />
                    </IconButton>
                    <IconButton onClick={hDelete}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={hSettings}>
                        <SettingsIcon />
                    </IconButton>
            </CardActions>
        </Card>
    );
}
export default function DeviceCard(props) {
    const newCard = props.newCard;

    if (newCard) {
        return <AddDevice />
    }
    return <Device {...props} />
}