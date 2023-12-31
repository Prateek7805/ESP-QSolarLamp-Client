import { useState, useContext, useEffect, useRef } from 'react';
import './DeviceControlOptions.css';
import { DashboardPageStatus } from '../Context/Dashboard_Context';
import { IconButton, Typography } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PowerSwitch from '../Switch/PowerSwitch';

import deviceAPI from '../../Assets/API/Device';
import { MDashboard } from '../Context/Modal_Context';
import BrightnessSlider from '../Slider/BrightnessSlider';
import { DeviceList } from '../Context/Dashboard_Context';
import LoadingSpinner from '../Spinners/LoadingSpinner/LoadingSpinner';
import ColorPicker from '../ColorPicker/ColorPicker';
export default function DeviceControlOptions() {
    const [loaded, setLoaded] = useState(false);
    const { setMDashboard } = useContext(MDashboard);
    const { setDevices } = useContext(DeviceList);
    const { pageStatus, setPageStatus } = useContext(DashboardPageStatus);
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
        color: {
            value: '#000000',
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
            setDevices(prev => {
                const index = prev.findIndex((item) => {
                    return item.name === pageStatus.device_name;
                });
                if (index === -1) {
                    return [...prev];
                }
                const device = prev[index];
                device.power = checked;
                return [...prev.slice(0, index), device, ...prev.slice(index + 1)];
            });
        } catch (error) {
            setError("Error in getting Device info, please reload");
        }
    }
    const brightnessDelay = useRef(null);
    const hBrightness = (e) => {
        try {
            const brightnessValue = e.target.value;
            clearTimeout(brightnessDelay.current);
            setDeviceStatus(prev => {
                return {
                    ...prev,
                    brightness: {
                        ...prev.brightness,
                        value: brightnessValue
                    }
                }
            });
            brightnessDelay.current = setTimeout(async () => {
                try {
                    setDeviceStatus(prev => {
                        return {
                            ...prev,
                            brightness: {
                                ...prev.brightness,
                                loading: true
                            }
                        }
                    });
                    const data = { brightness: brightnessValue };
                    const response = await deviceAPI.updateDeviceStatus(pageStatus.device_name, data);
                    if (response.error) {
                        setError("Error in setting brightness", "/");
                    }
                    setDeviceStatus(prev => {
                        return {
                            ...prev,
                            brightness: {
                                ...prev.brightness,
                                loading: false
                            }
                        }
                    });
                    setDevices(prev => {
                        const index = prev.findIndex((item) => {
                            return item.name === pageStatus.device_name;
                        });
                        if (index === -1) {
                            return [...prev];
                        }
                        const device = prev[index];
                        device.brightness = brightnessValue;
                        return [...prev.slice(0, index), device, ...prev.slice(index + 1)];
                    });
                } catch (error) {
                    setError("Error in setting brightness");
                }
            }, 1000);
        } catch (error) {
            setError("Error in setting brightness");
        }
    }
    const colorDelay = useRef(null);
    const hColor = async (e) => {
        try {
            const value = e.target.value;
            clearTimeout(colorDelay.current);
            setDeviceStatus(prev => {
                return {
                    ...prev,
                    color: {
                        ...prev.color,
                        value: value
                    }
                }
            });
            colorDelay.current = setTimeout(async () => {
                try {
                    setDeviceStatus(prev => {
                        return {
                            ...prev,
                            color: {
                                ...prev.color,
                                loading: true
                            }
                        }
                    }); //loading true
                    const response = await deviceAPI.updateDeviceStatus(pageStatus.device_name, {color: value});
                    if(response.error){
                        setError("Cannot update status, please reload", "/");
                        return;
                    }
                    setDeviceStatus(prev => {
                        return {
                            ...prev,
                            color: {
                                ...prev.color,
                                loading: false
                            }
                        }
                    }); //loading false
                    setDevices(prev => {
                        const index = prev.findIndex((item) => {
                            return item.name === pageStatus.device_name;
                        });
                        if (index === -1) {
                            return [...prev];
                        }
                        const device = prev[index];
                        device.color = value;
                        return [...prev.slice(0, index), device, ...prev.slice(index + 1)];
                    });
                }catch(error){
                    setError("Error in updating the color");
                }   
            }, 1000);

        } catch (error) {
            setError("Error in getting Device info, please reload");
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
                const { power, brightness, color, data } = response.message;
                setDeviceStatus(prev => {
                    return {
                        ...prev,
                        power: {
                            ...prev.power,
                            value: power
                        },
                        brightness: {
                            ...prev.brightness,
                            value: brightness
                        },
                        color: {
                            ...prev.color,
                            value: color
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
            <IconButton className='dco-close' sx={{ color: "#FF8400" }} onClick={hClose}>
                <HighlightOffIcon />
            </IconButton>
            {loaded ? (
                <div className='row g-1'>
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
                    <div className='row g-1'>
                        <div className='col-6 col-md-4 col-lg-3'>
                            <Typography variant='h6' color="text.secondary">Color:</Typography>
                        </div>
                        <div className='col-6 col-md-4 col-lg-3'>
                            <ColorPicker onChange={hColor} value={deviceStatus.color.value} loading={deviceStatus.color.loading}/>
                        </div>
                    </div>
                </div>) : (<LoadingSpinner nowrap={true} />)}

        </div>
    )
}