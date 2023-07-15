import './Signup.css';
import { TextField, IconButton, InputAdornment, Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { DateField } from '@mui/x-date-pickers/DateField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useState } from 'react';
import userValid from '../../Assets/Validation/User_Input_Validation';

export default function Signup(props) {

    const { setIsLogin } = props;
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const hShowPassword = () => setIsPasswordVisible(show => !show);

    const [signupData, setSignupData] = useState({
        firstName: {
            value: '',
            error: false,
            helperText: ''
        },
        lastName: {
            value: '',
            error: false,
            helperText: ''
        },
        date_of_birth: {
            value: dayjs(''),
            error: false,
            helperText: ''
        },
        email: {
            value: '',
            error: false,
            helperText: ''
        },
        password: {
            value: '',
            error: false,
            helperText: ''
        }
    });

    const hl = {
        email: ({ target }) => {
            const partialEmail = target.value;
            setSignupData(prev => {
                return {
                    ...prev,
                    email: {
                        value: partialEmail,
                        error: prev.email.error,
                        helperText: prev.email.helperText
                    }
                }
            });
        },
        password: ({ target }) => {
            const partialPass = target.value;
            setSignupData(prev => {
                return {
                    ...prev,
                    password: {
                        value: partialPass,
                        error: prev.password.error,
                        helperText: prev.password.helperText
                    }
                }
            });
        },
        firstName: ({ target }) => {
            const partialFn = target.value;
            setSignupData(prev => {
                return {
                    ...prev,
                    firstName: {
                        value: partialFn,
                        error: prev.firstName.error,
                        helperText: prev.firstName.helperText
                    }
                }
            });
        },
        lastName: ({ target }) => {
            const partialLn = target.value;
            setSignupData(prev => {
                return {
                    ...prev,
                    lastName: {
                        value: partialLn,
                        error: prev.lastName.error,
                        helperText: prev.lastName.helperText
                    }
                }
            });
        },
        date_of_birth: (value) => {
            const partialDOB = value;
            setSignupData(prev => {
                return {
                    ...prev,
                    date_of_birth: {
                        value: partialDOB,
                        error: prev.date_of_birth.error,
                        helperText: prev.date_of_birth.helperText
                    }
                }
            });
        }
    }

    const hSignin  = ()=>{
        const fnCheck = userValid.name_check(signupData.firstName.value);
        const lnCheck = userValid.name_check(signupData.lastName.value);
        const dobCheck = userValid.dob_check(signupData.date_of_birth.value.$d);
        const emailCheck = userValid.email_check(signupData.email.value);
        const passCheck = userValid.pass_check(signupData.password.value);
        setSignupData(prev=>{
            return {
                firstName : {
                    value : prev.firstName.value,
                    ...fnCheck
                },
                lastName : {
                    value : prev.lastName.value,
                    ...lnCheck
                },
                date_of_birth : {
                    value : prev.date_of_birth.value,
                    ...dobCheck
                },
                email : {
                    value : prev.email.value,
                    ...emailCheck
                },
                password : {
                    value : prev.password.value,
                    ...passCheck
                }
            }
        });
    }
    return (
        <div className="wrapper m-3">

            <div className='row'>
                <div className='col-12 col-sm-6'>
                    <TextField
                        label="First Name"
                        variant="outlined"
                        className='mb-3 col-12'
                        value={signupData.firstName.value}
                        error={signupData.firstName.error}
                        helperText={signupData.firstName.helperText}
                        onChange={hl.firstName}
                    />
                </div>
                <div className='col-12 col-sm-6'>
                    <TextField
                        label="Last Name"
                        variant="outlined"
                        className='mb-3 col-12'
                        value={signupData.lastName.value}
                        error={signupData.lastName.error}
                        helperText={signupData.lastName.helperText}
                        onChange={hl.lastName}
                    />
                </div>
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                    label="Date Of Birth"
                    className='mb-3'
                    value={signupData.date_of_birth.value}
                    error={signupData.date_of_birth.error}
                    helperText={signupData.date_of_birth.helperText}
                    onChange={hl.date_of_birth}
                />
            </LocalizationProvider>
            <TextField
                label="Email ID"
                variant="outlined"
                className='mb-3'
                value={signupData.email.value}
                error={signupData.email.error}
                helperText={signupData.email.helperText}
                onChange={hl.email}
            />
            <TextField variant="outlined"
                type={isPasswordVisible ? 'text' : 'password'}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={hShowPassword}
                                onMouseDown={(e) => e.preventDefault()}
                                edge="end"
                            >
                                {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                label="Password"
                className='mb-4'
                value={signupData.password.value}
                error={signupData.password.error}
                helperText={signupData.password.helperText}
                onChange={hl.password}
            />
            <div className='d-flex justify-content-lg-between align-items-lg-center flex-column flex-lg-row'>
                <Button className='px-3 py-2 mb-3' variant="contained" onClick={hSignin}>Sign Up</Button>
                <p className='m-0 mb-3'>
                    Already a member? <span className='switcher' onClick={() => setIsLogin(true)}>Login here</span>
                </p>
            </div>
        </div>
    );
}