import './Dashboard.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import ProfileMenu from '../../Components/ProfileMenu/ProfileMenu';
import DeviceCard from '../../Components/DeviceCard/DeviceCard';
import deviceAPI from '../../Assets/API/Device';
import { useEffect, useState } from 'react';
import DashboardModal from '../../Components/DashboardModal/Modal';

export default function Dashboard(){
    const [devices, setDevices] = useState([]);
    useEffect(()=>{
        async function updateDevices(){
            try{
                const response = await deviceAPI.getAllStatuses();
                if(response.error){
                    console.log(response.message);
                    return; //Add an Error Modal
                }
                const deviceStatuses = response.message;
                if(deviceStatuses && deviceStatuses.length !== 0){
                    setDevices(deviceStatuses);
                }
            }catch(error){
                //Add an Error Modal
                console.log(error);
            }
        }
        updateDevices();
    }, []);

    return (
        <div className="ds-main-container">
            <DashboardModal/>
            <div className='ds-appbar'>
                <Sidebar />
                <ProfileMenu initials={'P'} />
            </div>
            <div className='ds-devices-container'>
                <div className='row g-3'>
                    {devices.map((device, index)=>{
                        return (
                            <div className='col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 d-flex justify-content-center' key={index}>
                                <DeviceCard newCard={false} name={device.name} power={device.power} brightness={device.brightness}/>
                            </div>
                        )
                    })}
                    <div className='col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 d-flex justify-content-center'><DeviceCard newCard={true}/></div>
                </div>
            </div>
        </div>
    )
}