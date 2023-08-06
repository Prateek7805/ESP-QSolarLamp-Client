import Button from '@mui/joy/Button';
import { TextField } from '@mui/material';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { useState, useContext, useEffect } from 'react';
import { MDashboard, MDeviceSettings } from '../Context/Modal_Context';
import deviceValid from '../../Assets/Validation/Device_Input_Validation'
import deviceAPI from '../../Assets/API/Device';
import { DeviceList } from '../Context/Dashboard_Context';
import ModalPassword from '../ModalPassword/ModalPassword';

export default function DeviceSettingsModal() {

    const { mDeviceSettings, setMDeviceSettings } = useContext(MDeviceSettings);
    const { setMDashboard } = useContext(MDashboard);
    const [loading, setLoading] = useState({
        name: false,
        password: false
    });
    const INIT_DEVICE_DATA = {
        name: {
            value: mDeviceSettings.name,
            error: false,
            helperText: ''
        },
        new_password: {
            value: '',
            error: false,
            helperText: ''
        }
    };
    const { setDevices } = useContext(DeviceList);
    const [deviceData, setDeviceData] = useState(INIT_DEVICE_DATA);

    useEffect(() => {
        setDeviceData(prev => {
            return {
                ...prev,
                name: {
                    ...prev.name,
                    value: mDeviceSettings.name
                }
            }
        })
    }, [mDeviceSettings.name]);

    const setMessage = (message,title = "Error",error = true)=>{
        setMDashboard(prev => {
            return {
                ...prev,
                open: true,
                title: title,
                error: error,
                message: message
            }
        });
    };
    const loadBtn = (name, value)=>{
        setLoading(prev=>{
            return {
                ...prev,
                [name]:value
            }
        })
    }
    const hdata = (e) => {
        const id_mapper = {
            ID_NEW_NAME: 'name',
            ID_NEW_PASSWORD: 'new_password'
        }
        const id = e.target.id;
        const partialValue = e.target.value;
        const key = id_mapper[id];
        if (key === undefined) {
            return;
        }
        setDeviceData(prev => {
            return {
                ...prev,
                [key]: {
                    ...prev[key],
                    value: partialValue
                }
            }
        });
    };
    const hClose = () => {
        setMDeviceSettings(prev => {
            return {
                ...prev,
                open: false
            }
        });
        setDeviceData(INIT_DEVICE_DATA);
    }
    const hSubmitName = async (e) => {
        try {
            e.preventDefault();
            loadBtn('name', true);
            const new_name_check = deviceValid.name_check(deviceData.name.value);
            setDeviceData(prev => {
                return {
                    ...prev,
                    name: {
                        ...prev.name,
                        ...new_name_check
                    }
                }
            });

            if (new_name_check.error) {
                loadBtn('name', false);
                return;
            }
            const req_body = { old_name: mDeviceSettings.name, new_name: deviceData.name.value };
            const response = await deviceAPI.updateName(req_body);
            loadBtn('name', false);
            hClose(); //revert the input fields
            const title = response.error ? 'Error' : 'Success';
            const message = response.error ? response.message : "Name updated";
            setMessage(message, title, response.error);
            if (response.error) { return };
            const new_name= response.message.name;
            setDevices(prev => {
                const index = prev.findIndex(item => {
                    return item.name === mDeviceSettings.name;
                });
                if (index === -1) {
                    return [...prev];
                }
                const device = prev[index];
                device.name = new_name;
                return [...prev.slice(0, index), device, ...prev.slice(index + 1)];
            });
        } catch (error) {
            hClose();
            setMessage("Error in updating device name, please try reloading the page");
        }
    };
    const hSubmitPassword = async(e)=>{
        try{
            e.preventDefault();
            loadBtn('password', true);
            const new_pass_check = deviceValid.pass_check(deviceData.new_password.value);
            setDeviceData(prev=>{
                return {
                    ...prev,
                    new_password:{
                        ...prev.new_password,
                        ...new_pass_check
                    }
                }
            });
            if(new_pass_check.error){
                loadBtn('password', false);
                return;
            }
            const req_body = {name: mDeviceSettings.name, password: deviceData.new_password.value};
            const response  = await deviceAPI.updatePassword(req_body);
            loadBtn('password', false);
            hClose(); //revert the input fields
            const title = response.error ? 'Error' : 'Success';
            const message = response.error ? response.message : "Password updated";
            setMessage(message, title, response.error);
        }catch(error){
            setMessage("Error in changing password, please try reloading the page");
        }
    }

    return (
        <Modal open={mDeviceSettings.open} onClose={hClose}>
            <ModalDialog
                aria-labelledby="basic-modal-dialog-title"
                aria-describedby="basic-modal-dialog-description"
                sx={{ maxWidth: 500 }}
            >
                <Typography id="basic-modal-dialog-title" component="h2">
                    Add a new device
                </Typography>
                <Typography id="basic-modal-dialog-description" textColor="text.tertiary">
                    Please fill in the below information
                </Typography>
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                    }}
                >
                    <Stack spacing={2}>
                        <TextField label="Name"
                            variant="outlined"
                            size="small"
                            id="ID_NEW_NAME"
                            value={deviceData.name.value}
                            error={deviceData.name.error}
                            helperText={deviceData.name.helperText}
                            onChange={hdata}

                        />
                        <Button
                            type="submit"
                            loading={loading.name}
                            loadingPosition='end'
                            onClick={hSubmitName}
                        >
                            Update Name
                        </Button>
                        <ModalPassword
                            label="Password"
                            id="ID_NEW_PASSWORD"
                            value={deviceData.new_password.value}
                            error={deviceData.new_password.error}
                            helperText={deviceData.new_password.helperText}
                            onChange={hdata}
                        />

                        <Button
                            type="submit"
                            loading={loading.password}
                            loadingPosition='end'
                            onClick={hSubmitPassword}
                        >
                            Change Password
                        </Button>
                    </Stack>
                </form>
            </ModalDialog>
        </Modal>
    );
}