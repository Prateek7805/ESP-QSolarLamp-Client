import './Dashboard.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import ProfileMenu from '../../Components/ProfileMenu/ProfileMenu';
import deviceAPI from '../../Assets/API/Device';
import { useState, useEffect, useContext } from 'react';
import { MDashboard } from '../../Components/Context/Modal_Context';
import DashboardModal from '../../Components/DashboardModal/Modal';
import AddDeviceModal from '../../Components/AddDeviceModal/AddDeviceModal';
import DeviceListGrid from '../../Components/DeviceListGrid/DeviceListGrid';
import { DashboardPageStatus, DeviceList } from '../../Components/Context/Dashboard_Context';
import DeviceControlOptions from '../../Components/DeviceContolOptions/DeviceControlOptions';
import DeleteModal from '../../Components/DeleteModal/DeleteModal';
import DeviceSettingsModal from '../../Components/DeviceSettingsModal/DeviceSettingsModal';
import LoadingSpinner from '../../Components/Spinners/LoadingSpinner/LoadingSpinner';
import AccountSettings from '../AccountSettings/AccountSettings';

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
export default function Dashboard() {
    const { setDevices } = useContext(DeviceList);
    const { setMDashboard } = useContext(MDashboard);
    const { pageStatus } = useContext(DashboardPageStatus);
    const [initials, setInitials] = useState('P');
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        async function updateDevices() {
            try {
                const response = await deviceAPI.getAllStatuses();
                if (response.error) {
                    setMDashboard(prev => {
                        return {
                            ...prev,
                            open: true,
                            error: true,
                            title: "Error",
                            message: "Error in getting Device info, try logging in again",
                            navigate: "/"
                        }
                    });
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
                setMDashboard(prev => {
                    return {
                        ...prev,
                        open: true,
                        error: true,
                        title: "Error",
                        message: "Error in getting Device info, please reload",
                        navigate: "/"
                    }
                });
            }
        }
        updateDevices();
    }, [setDevices, setMDashboard]);

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