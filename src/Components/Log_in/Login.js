import './Login.css';
import { TextField, OutlinedInput, IconButton, InputAdornment, FormControl, InputLabel, Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

export default function Login(props) {
    
    const {setIsLogin} = props;
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const hlShowPassword = () => setIsPasswordVisible(show => !show);


    return (
        <div className="wrapper m-3">
            <h5 className='title-text mb-4 text-center text-sm-start'>Log into your account</h5>
            <TextField label="Email ID" variant="outlined" className='mb-4' />
            <FormControl variant="outlined" className='mb-4'>
                <InputLabel htmlFor="ID_LOGIN_PASSWORD">Password</InputLabel>
                <OutlinedInput
                    id="ID_LOGIN_PASSWORD"
                    type={isPasswordVisible ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={hlShowPassword}
                                onMouseDown={(e) => e.preventDefault()}
                                edge="end"
                            >
                                {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>
            <div className='d-flex justify-content-lg-between align-items-lg-center flex-column flex-lg-row'>
                <Button className='px-3 py-2 mb-3' variant="contained">Log in</Button>
                <p className='m-0 mb-3'>
                                    Don't have an account? <span className='switcher' onClick={()=>setIsLogin(false)}>Register here</span>
                </p>
            </div>
           
        </div>
    );
}