import { Typography } from '@mui/material'
import './AccountSettings.css'
import { useState, useEffect, useContext } from 'react';
import { MDashboard } from '../../Components/Context/Modal_Context';
import userAPI from '../../Assets/API/User';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import Zoom from '@mui/material/Zoom';
import Tooltip from '@mui/material/Tooltip';


export default function AccountSettings() {
    const [data, setData] = useState({
        name: '',
        email: '',
        regDeviceCount: 0,
        actDeviceCount: 0
    });
    const { setMDashboard } = useContext(MDashboard);

    useEffect(() => {
        const setMessage = (message, error = true, navigate = '') => {
            const title = error ? "Error" : "Success"
            setMDashboard(prev => {
                return {
                    ...prev,
                    open: true,
                    title: title,
                    error: error,
                    message: message,
                    navigate: navigate
                }
            });
        };
        const getUser = async () => {
            try {
                const response = await userAPI.getUserData();
                if (response.error) {
                    setMessage(response.message, true, '/');
                    return;
                }
                const user = response.message;
                setData(prev => {
                    return {
                        ...prev,
                        name: `${user.first_name} ${user.last_name}`,
                        email: user.email,
                        regDeviceCount: user.registered_device_count,
                        actDeviceCount: user.active_device_count
                    }
                });
            } catch (error) {
                setMessage('Error in getting user info', true, '/');
            }
        }
        getUser();
    }, [setMDashboard]);
    return (
        <div className='das-container'>
            <div className='row g-0 p-1 das-details-bar ps-4 ps-sm-0' >
                <div className='d-flex align-items-center justify-content-sm-center col-12 col-sm-6 col-md-3 mb-1'>
                    <Tooltip disableFocusListener TransitionComponent={Zoom} title="Full Name" placement="top" arrow>
                        <PersonIcon />
                    </Tooltip>
                    <Typography className='d-flex align-items-center' variant='subtitle1' sx={{ ml: 1 }}>{data.name}</Typography>
                </div>
                <div className='d-flex align-items-center justify-content-sm-center col-12 col-sm-6 col-md-3 mb-1'>
                    <Tooltip disableFocusListener TransitionComponent={Zoom} title="Email" placement="top" arrow>
                        <EmailIcon />
                    </Tooltip>
                    <Typography className='d-flex align-items-center' variant='subtitle1' sx={{ ml: 1 }}>{data.email}</Typography>
                </div>
                <div className='d-flex align-items-center justify-content-sm-center col-12 col-sm-6 col-md-3 mb-1'>
                    <Tooltip disableFocusListener TransitionComponent={Zoom} title="Registed Devices" placement="top" arrow>
                        <CalendarViewMonthIcon />
                    </Tooltip>
                    <Typography className='d-flex align-items-center' variant='subtitle1' sx={{ ml: 1 }}>{data.regDeviceCount}</Typography>
                </div>
                <div className='d-flex align-items-center justify-content-sm-center col-12 col-sm-6 col-md-3 mb-1'>
                    <Tooltip disableFocusListener TransitionComponent={Zoom} title="Active Devices" placement="top" arrow>
                        <TipsAndUpdatesIcon />
                    </Tooltip>
                    <Typography className='d-flex align-items-center' variant='subtitle1' sx={{ ml: 1 }}>{data.actDeviceCount}</Typography>
                </div>
            </div>
        </div>
    )
}
