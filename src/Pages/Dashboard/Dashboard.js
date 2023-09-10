import './Dashboard.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import ProfileMenu from '../../Components/ProfileMenu/ProfileMenu';
import deviceAPI from '../../Assets/API/Device';
import { useState, useEffect, useContext } from 'react';
import DashboardModal from '../../Components/DashboardModal/Modal';
import AddDeviceModal from '../../Components/AddDeviceModal/AddDeviceModal';
import DeviceListGrid from '../../Components/DeviceListGrid/DeviceListGrid';
import { DashboardPageStatus, DeviceList } from '../../Components/Context/Dashboard_Context';
import DeviceControlOptions from '../../Components/DeviceContolOptions/DeviceControlOptions';
import DeleteModal from '../../Components/DeleteModal/DeleteModal';
import DeviceSettingsModal from '../../Components/DeviceSettingsModal/DeviceSettingsModal';
import LoadingSpinner from '../../Components/Spinners/LoadingSpinner/LoadingSpinner';
import AccountSettings from '../AccountSettings/AccountSettings';
import { useNavigate } from 'react-router-dom';

const displayPage = (pageStatus) => {
    switch (pageStatus) {
        case "devices":
            return (<DeviceListGrid />);
        case "controls":
            return (<DeviceControlOptions />);
        case "account":
            return (<AccountSettings/>);
        default: return (<></>);
    }
}
const pageTitle = {
    devices: '',
    controls: 'Controls',
    account : 'Account Settings',
    profile : 'Profile Settings'
}
export default function Dashboard() {
    const navigate = useNavigate();
    const { setDevices } = useContext(DeviceList);
    const { pageStatus } = useContext(DashboardPageStatus);
    const [initials, setInitials] = useState('P');
    const [loaded, setLoaded] = useState(false);
    
    useEffect(() => {
        async function updateDevices() {
            try {
                const response = await deviceAPI.getAllStatuses();
                if (response.error) {
                    localStorage.removeItem('access_token');
                    navigate("/");
                    return;
                }
                const userNameInitials = response.message.initials;
                const deviceStatuses = response.message.devices;
                if (deviceStatuses && deviceStatuses.length !== 0) {
                    setDevices(deviceStatuses);
                }
                if (userNameInitials) {
                    setInitials(userNameInitials);
                }
                setLoaded(true);
            } catch (error) {
                localStorage.removeItem('access_token');
                navigate("/");
            }
        }
        updateDevices();
    }, [setDevices, navigate]);

    return (
        <>
        <DashboardModal />
        
            {
                loaded === true ? (
                    <div className="ds-main-container" >
                    <AddDeviceModal />
                    <DeleteModal/>
                    <DeviceSettingsModal/>
                        <div className='ds-appbar'>
                            <Sidebar />
                            <span className="d-flex align-items-center" style={{fontSize: '23px' , fontWeight: 500}}>
                                {pageTitle[pageStatus.path]}
                            </span>
                            <ProfileMenu initials={initials} />
                        </div>
                        {
                            displayPage(pageStatus.path)
                        }
                    </div>
                ) : (
                    <LoadingSpinner size='lg'/>
                )
            }
        </>
    )
}