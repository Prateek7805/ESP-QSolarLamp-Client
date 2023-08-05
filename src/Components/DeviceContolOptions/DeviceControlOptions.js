import { useState, useContext, useEffect } from 'react';
import './DeviceControlOptions.css';
import { DashboardPageStatus } from '../Context/Dashboard_Context';
import { IconButton, Typography } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PowerSwitch from '../Switch/PowerSwitch';

import deviceAPI from '../../Assets/API/Device';
import { MDashboard } from '../Context/Modal_Context';
import BrightnessSlider from '../Slider/BrightnessSlider';
import { DeviceList } from '../Context/Dashboard_Context';
import Spinner from '../Spinner/Spinner';
export default function DeviceControlOptions() {
    const [loaded, setLoaded] = useState(false);
    const { setMDashboard } = useContext(MDashboard);
    const {setDevices} = useContext(DeviceList);
    const { pageStatus, setPageStatus } = useContext(DashboardPageStatus);
    //helper functions

    const setError = (message, navigate) => {
        setMDashboard(prev => {
            return {
                ...prev,
                open: true,
                error: true,
                title: "Error",
                message: message,
                navigate: navigate || ''
            }
        });
    }
    const [deviceStatus, setDeviceStatus] = useState({
        power: {
            value: false,
            loading: false
        },
        brightness: {
            value: 30,
            loading: false
        },
        data: []
    });
    const hClose = () => {
        setPageStatus((prev) => {
            return {
                ...prev,
                path: "devices"
            }
        })
    }
    const hPower = async (e) => {
        try {
            const checked = e.target.checked;
            setDeviceStatus(prev => {
                return {
                    ...prev,
                    power: {
                        value: checked,
                        loading: true
                    }
                }
            });
            const response = await deviceAPI.updateDeviceStatus(pageStatus.device_name, { power: checked });
            if (response.error) {
                setError("Cannot update device status, please reload", "/");
                setDeviceStatus(prev => {
                    return {
                        ...prev,
                        power: {
                            value: !checked,
                            loading: false
                        }
                    }
                });
                return;
            }
            setDeviceStatus(prev => {
                return {
                    ...prev,
                    power: {
                        ...prev.power,
                        loading: false
                    }
                }
            });
            setDevices(prev=>{
                const index = prev.findIndex((item)=>{
                    return item.name === pageStatus.device_name;
                });
                const device = prev[index];
                device.power = checked;
                return [...prev.slice(0,index), device, ...prev.slice(index+1)];
            });
        } catch (error) {
            setError("Error in getting Device info, please reload");
        }
    }
    let brightnessDelay;
    const hBrightness = (e) => {
        try{
            const brightnessValue = e.target.value;
            clearTimeout(brightnessDelay);
            setDeviceStatus(prev=>{
                return {
                    ...prev,
                    brightness:{
                        ...prev.brightness,
                        value: brightnessValue
                    }
                }
            });
            brightnessDelay = setTimeout(async ()=>{
                try{
                    setDeviceStatus(prev=>{
                        return {
                            ...prev,
                            brightness:{
                                ...prev.brightness,
                                loading: true
                            }
                        }
                    });
                    const data={brightness: brightnessValue};
                    const response = await deviceAPI.updateDeviceStatus(pageStatus.device_name, data);
                    if(response.error){
                        setError("Error in setting brightness", "/");
                    }
                    setDeviceStatus(prev=>{
                        return {
                            ...prev,
                            brightness:{
                                ...prev.brightness,
                                loading: false
                            }
                        }
                    });
                    setDevices(prev=>{
                        const index = prev.findIndex((item)=>{
                            return item.name === pageStatus.device_name;
                        });
                        const device = prev[index];
                        device.brightness = brightnessValue;
                        return [...prev.slice(0, index), device, ...prev.slice(index+1)];
                    });
                }catch(error){
                    setError("Error in setting brightness");
                }
            }, 1000);
        }catch(error){
            setError("Error in setting brightness");
        }
    }
    useEffect(() => {
        const setErrorMsg = (message, navigate) => {
            setMDashboard(prev => {
                return {
                    ...prev,
                    open: true,
                    error: true,
                    title: "Error",
                    message: message,
                    navigate: navigate || ''
                }
            });
        }
        const getDeviceInfo = async () => {
            try {
                const response = await deviceAPI.getDeviceStatus(pageStatus.device_name);
                if (response.error) {
                    setErrorMsg("Error in getting Device info, try logging in again", "/");
                    return;
                }
                const { power, brightness, data } = response.message;
                setDeviceStatus(prev => {
                    return {
                        ...prev,
                        power: {
                            ...prev.power,
                            value: power
                        },
                        brightness: {
                            value: brightness
                        },
                        data: data
                    }
                });
                setLoaded(true);
            } catch (error) {
                setErrorMsg("Error in getting Device info, please reload", "/");
            }
        };
        getDeviceInfo();
    }, [pageStatus, setMDashboard]);

    return (
        <div className="dco-container">
        {loaded? (<div className='row g-1'>
                <div className='col-12 d-flex justify-content-center dco-title-wrap'>
                    <Typography sx={{ fontSize: '23px' }}>Controls</Typography>
                    <IconButton className='dco-close' sx={{ color: "#FF8400" }} onClick={hClose}>
                        <HighlightOffIcon />
                    </IconButton>
                </div>
                <div className='col-12'>
                    <Typography variant='h6'>{pageStatus.device_name}</Typography>
                </div>
                <div className='row g-1'>
                    <div className='col-6 col-md-4 col-lg-3'>
                        <Typography variant='h6' color="text.secondary">Power:</Typography>
                    </div>
                    <div className='col-6 col-md-8 col-lg-9'>
                        <PowerSwitch loading={deviceStatus.power.loading} checked={deviceStatus.power.value} onChange={hPower} />
                    </div>
                </div>
                <div className='row g-1'>
                    <div className='col-6 col-md-4 col-lg-3'>
                        <Typography variant='h6' color="text.secondary">Brightness:</Typography>
                    </div>
                    <div className='col-6 col-md-4 col-lg-3'>
                        <BrightnessSlider defaultValue={30} 
                                value={deviceStatus.brightness.value} 
                                loading={deviceStatus.brightness.loading}
                                onChange={hBrightness}
                        />
                    </div>
                </div>
            </div>) : (<Spinner/>)}
            
        </div>
    )
}