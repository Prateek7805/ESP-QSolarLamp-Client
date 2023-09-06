import './DeviceListGrid.css';
import DeviceCard from '../DeviceCard/DeviceCard';
import { useContext } from 'react';
import { DeviceList } from '../Context/Dashboard_Context';

export default function DeviceListGrid() {
    const { devices } = useContext(DeviceList);
    return (
        <div className='ds-devices-container'>
            <div className='row g-3'>
                {devices.map((device, index) => {
                    return (
                        <div className='col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center' key={index}>
                            <DeviceCard newCard={false} name={device.name} power={device.power} brightness={device.brightness} color={device.color}/>
                        </div>
                    )
                })}
                <div className='col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center'><DeviceCard newCard={true} /></div>
            </div>
        </div>
    )
}