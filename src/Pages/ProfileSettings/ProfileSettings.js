import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import './ProfileSettings.css';
import ModalPassword from '../../Components/ModalPassword/ModalPassword';
import { DateField } from '@mui/x-date-pickers/DateField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useEffect, useState, useContext } from 'react';
import EditButton from '../../Components/EditButton/Editbutton';
import userAPI from '../../Assets/API/User';
import { MDashboard } from '../../Components/Context/Modal_Context';
import userValid from '../../Assets/Validation/User_Input_Validation';
const DEFAULT_INPUT_DATA = {
    first_name: {
        value: '',
        error: false,
        helperText: '',
        disabled: true,
        edited: false
    },
    last_name: {
        value: '',
        error: false,
        helperText: '',
        disabled: true,
        edited: false
    },
    date_of_birth: {
        value: undefined,
        error: false,
        helperText: '',
        disabled: true,
        edited: false
    },
    password: {
        value: '',
        error: false,
        helperText: '',
        disabled: true,
        edited: false
    }
}


export default function ProfileSettings() {
    const [inputData, setInputData] = useState(DEFAULT_INPUT_DATA);
    
    const {setMDashboard} = useContext(MDashboard);
    const getInputKey = (id, prefix)=>{
        const _id = id.substring(prefix.length);
        const key = _id.toLowerCase();
        return key;
    }
    const editInput = (id) => {
        const key = getInputKey(id, 'ID_P_B_');
        setInputData(prev=>{
            return {
                ...prev,
                [key] : {
                    ...prev[key],
                    disabled: !prev[key].disabled
                }
            }
        });
        setTimeout(()=>document.getElementById(`ID_P_${key.toUpperCase()}`).focus(), 100);
    }
    const hInputData = (e) => {
        const id = e.target.id;
        const key = getInputKey(id, 'ID_P_');
        const partialValue = e.target.value;

        setInputData(prev=>{
            return {
                ...prev,
                [key]:{
                    ...prev[key],
                    value: partialValue,
                    edited: true
                }
            }
        });
    }

    useEffect(()=>{
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
        const getUserData = async()=>{
            try{
                const response = await userAPI.getUserData();
                if(response.error){
                    setMessage(response.message, true, '/');
                    return;
                }
                const {first_name, last_name, date_of_birth} = response.message;
                const dob_check = userValid.dob_check(date_of_birth);
                let dob = undefined;
                if(!dob_check.error){
                    dob = date_of_birth;
                }
                setInputData(prev=>{
                    return {
                        ...prev,
                        first_name : {
                            ...prev.first_name,
                            value: first_name
                        },
                        last_name: {
                            ...prev.last_name,
                            value: last_name
                        },
                        date_of_birth: {
                            ...prev.date_of_birth,
                            value: dob
                        }
                    }
                });

            }catch(error){
                setMessage("Error in getting profile information", true, '/');
            }
        };
        getUserData();
    }, [setMDashboard]);

    return (
        <div className='dps-container'>
            <div className='dps-card-bg'>
                <div className='dps-row'>

                    <TextField label="Firstname"
                        variant="outlined"
                        id="ID_P_FIRST_NAME"
                        style={{ width: '60%' }}
                        value={inputData.first_name.value}
                        
                        onChange={hInputData}
                        disabled={inputData.first_name.disabled}
                    />


                    <EditButton className='edit-btn' color="warning" onClick={()=>{editInput('ID_P_B_FIRST_NAME')}} edit={inputData.first_name.disabled}/>
                        
                </div>
                <div className='dps-row'>

                    <TextField label="Lastname"
                        variant="outlined"
                        id="ID_P_LAST_NAME"
                        style={{ width: '60%' }}
                        value={inputData.last_name.value}
                        onChange={hInputData}
                        disabled={inputData.last_name.disabled}
                    />


                    <EditButton className='edit-btn' color="warning" onClick={()=>{editInput('ID_P_B_LAST_NAME')}} edit={inputData.last_name.disabled}/>
                </div>
                <div className='dps-row'>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateField
                            label="Date Of Birth"
                            id="ID_P_DATE_OF_BIRTH"
                            style={{ width: '60%' }}
                            value={inputData.date_of_birth.value}
                            onChange={()=>hInputData({target: {id : "ID_P_DATE_OF_BIRTH"}})}
                            disabled={inputData.date_of_birth.disabled}
                        />
                    </LocalizationProvider>

                    <EditButton className='edit-btn' color="warning" onClick={()=>{editInput('ID_P_B_DATE_OF_BIRTH')}} edit={inputData.date_of_birth.disabled}/>
                </div>
                <div className='dps-row'>

                    <ModalPassword
                        label="Update Password"
                        id="ID_P_PASSWORD"
                        style={{ width: '60%' }}
                        size="medium"
                        value={inputData.password.value}
                        onChange={hInputData}
                        disabled={inputData.password.disabled}
                    />

                    <EditButton className='edit-btn' color="warning" onClick={()=>{editInput('ID_P_B_PASSWORD')}} edit={inputData.password.disabled}/>
                </div>
                <div className='dps-row'>


                    <Button id="ID_P_SUBMIT"
                        className='submit-btn'
                        variant='contained'
                        size="large"
                        color="warning"
                    >

                        Submit
                    </Button>
                    <div className="filler" />
                </div>
            </div>

        </div>
    )
}