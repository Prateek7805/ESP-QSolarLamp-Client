import './Dashboard.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import ProfileMenu from '../../Components/ProfileMenu/ProfileMenu';
import deviceAPI from '../../Assets/API/Device';
import { useEffect, useState, useContext } from 'react';
import { MDashboard } from '../../Components/Context/Modal_Context';
import DashboardModal from '../../Components/DashboardModal/Modal';
import AddDeviceModal from '../../Components/AddDeviceModal/AddDeviceModal';
import DeviceListGrid from '../../Components/DeviceListGrid/DeviceListGrid';
import { DeviceList } from '../../Components/Context/Dashboard_Context';

export default function Dashboard() {
    const {devices, setDevices} = useContext(DeviceList);
    const {setMDashboard} = useContext(MDashboard);
    useEffect(() => {
        async function updateDevices() {
            try {
                const response = await deviceAPI.getAllStatuses();
                if (response.error) {
                    setMDashboard(prev=>{
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
                const deviceStatuses = response.message;
                if (deviceStatuses && deviceStatuses.length !== 0) {
                    setDevices(deviceStatuses);
                }
            } catch (error) {
                setMDashboard(prev=>{
                    return {
                        ...prev,
                        open: true,
                        error: true,
                        title: "Error",
                        message: "Error in getting Device info, please reload"
                    }
                });
                console.log(error);
            }
        }
        updateDevices();
    }, []);

    return (
        <div className="ds-main-container">

            <DashboardModal />
            <AddDeviceModal/>

            <div className='ds-appbar'>
                <Sidebar />
                <ProfileMenu initials={'P'} />
            </div>
            <DeviceListGrid/>
            
        </div>
    )
}