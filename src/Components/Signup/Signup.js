import './Signup.css';
import { TextField, IconButton, InputAdornment, Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { DateField } from '@mui/x-date-pickers/DateField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';

export default function Signup(props) {

    const { setIsLogin } = props;
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const hShowPassword = () => setIsPasswordVisible(show => !show);
    
    const [signupData, setSignupData] = useState({
        firstName : {
            value: '',
            error: false,
            helperText : ''
        },
        lastName : {
            value: '',
            error: false,
            helperText : ''
        },
        date_of_birth : {
            value: '',
            error: false,
            helperText : ''
        },
        email : {
            value: '',
            error: false,
            helperText : ''
        },
        password : {
            value: '',
            error: false,
            helperText : ''
        }
    });
    
    return (
        <div className="wrapper m-3">

            <div className='row'>
                <div className='col-12 col-sm-6'>
                    <TextField label="First Name" variant="outlined" className='mb-3 col-12' />
                </div>
                <div className='col-12 col-sm-6'>
                    <TextField label="Last Name" variant="outlined" className='mb-3 col-12' />
                </div>
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                
                    <DateField label="Date Of Birth" className='mb-3'/>
                
            </LocalizationProvider>
            <TextField label="Email ID" variant="outlined" className='mb-3' />
            <TextField variant="outlined"
                id="ID_LOGIN_PASSWORD"
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
            />
            <div className='d-flex justify-content-lg-between align-items-lg-center flex-column flex-lg-row'>
                <Button className='px-3 py-2 mb-3' variant="contained">Sign Up</Button>
                <p className='m-0 mb-3'>
                    Already a member? <span className='switcher' onClick={() => setIsLogin(true)}>Login here</span>
                </p>
            </div>
        </div>
    );
}