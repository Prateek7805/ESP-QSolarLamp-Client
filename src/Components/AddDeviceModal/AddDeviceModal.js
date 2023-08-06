import Button from '@mui/joy/Button';
import { TextField } from '@mui/material';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { useState, useContext } from 'react';
import { MDevice, MDashboard } from '../Context/Modal_Context';
import deviceValid from '../../Assets/Validation/Device_Input_Validation'
import deviceAPI from '../../Assets/API/Device';
import { DeviceList } from '../Context/Dashboard_Context';
import ModalPassword from '../ModalPassword/ModalPassword';

export default function AddDeviceModal() {

    const { mDevice, setMDevice } = useContext(MDevice);
    const { setMDashboard } = useContext(MDashboard);
    const [submitClicked, setSubmitClicked] = useState(false);
    const INIT_DEVICE_DATA = {
        license_key: {
            value: '',
            error: false,
            helperText: ''
        },
        name: {
            value: '',
            error: false,
            helperText: ''
        },
        password: {
            value: '',
            error: false,
            helperText: ''
        }
    };
    const {setDevices} = useContext(DeviceList);
    const [deviceData, setDeviceData] = useState(INIT_DEVICE_DATA);
    const hdata = (e) => {
        const id_mapper = {
            ID_LICENSE_KEY: 'license_key',
            ID_DEVICE_NAME: 'name',
            ID_DEVICE_PASSWORD: 'password'
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
        setMDevice({ open: false });
        setDeviceData(INIT_DEVICE_DATA);
    }
    const hSubmit = async (e) => {
        e.preventDefault();
        setSubmitClicked(true);
        const lk_check = deviceValid.license_key_check(deviceData.license_key.value);
        const name_check = deviceValid.name_check(deviceData.name.value);
        const pass_check = deviceValid.pass_check(deviceData.password.value);

        setDeviceData(prev => {
            return {
                ...prev,
                license_key: {
                    value: prev.license_key.value,
                    ...lk_check
                },
                name: {
                    value: prev.name.value,
                    ...name_check
                },
                password: {
                    value: prev.password.value,
                    ...pass_check
                }
            }
        });

        if (lk_check.error
            || name_check.error
            || pass_check.error
        ) {
            setSubmitClicked(false);
            return;
        }
        const data = { license_key: deviceData.license_key.value, name: deviceData.name.value, password: deviceData.password.value };
        const response = await deviceAPI.register(data);
        setSubmitClicked(false);
        hClose(); //clear the input fields
        const title = response.error ? 'Error' : 'Success';
        const message = response.error? response.message : "Device registration successful";
        setMDashboard(prev => {
            return {
                ...prev,
                open: true,
                title: title,
                error: response.error,
                message: message,
            }
        });
        if(response.error) {return};
        setDevices(prev=>{
            return [...prev, response.message];
        });
    };
    

    return (
        <Modal open={mDevice.open} onClose={hClose}>
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
                        setMDevice({ open: false });
                    }}
                >
                    <Stack spacing={2}>
                        <TextField label="License Key"
                            variant="outlined"
                            size="small"
                            id="ID_LICENSE_KEY"
                            value={deviceData.license_key.value}
                            error={deviceData.license_key.error}
                            helperText={deviceData.license_key.helperText}
                            onChange={hdata}

                        />
                        <TextField label="Name"
                            variant="outlined"
                            size="small"
                            id="ID_DEVICE_NAME"
                            value={deviceData.name.value}
                            error={deviceData.name.error}
                            helperText={deviceData.name.helperText}
                            onChange={hdata}
                        />
                        <ModalPassword
                            label="Password"
                            id="ID_DEVICE_PASSWORD"
                            value={deviceData.password.value}
                            error={deviceData.password.error}
                            helperText={deviceData.password.helperText}
                            onChange={hdata}
                        />
                        
                        <Button
                            type="submit"
                            loading={submitClicked}
                            loadingPosition='end'
                            onClick={hSubmit}
                        >
                            Submit
                        </Button>
                    </Stack>
                </form>
            </ModalDialog>
        </Modal>
    );
}