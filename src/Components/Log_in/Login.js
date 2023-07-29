import './Login.css';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import userValid from '../../Assets/Validation/User_Input_Validation';
import { useContext, useState } from 'react';
import login from '../../Assets/API/Login';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/joy/Button';
import { MLanding } from '../Context/Modal_Context';
export default function Login(props) {

    const { setIsLogin } = props;
    const {setMLanding} = useContext(MLanding);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const hShowPassword = () => setIsPasswordVisible(show => !show);

    const [loginData, setLoginData] = useState({
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
    const [loginClicked, setLoginClicked] = useState(false);
    const navigate = useNavigate();

    const hEmailChange = ({ target }) => {
        const partialEmail = target.value;
        setLoginData(prev => {
            return {
                ...prev,
                email: {
                    value: partialEmail,
                    error: prev.email.error,
                    helperText: prev.email.helperText
                }
            };
        });
    }
    const hPassChange = ({ target }) => {
        const partialPass = target.value;
        setLoginData(prev => {
            return {
                ...prev,
                password: {
                    value: partialPass,
                    error: prev.password.error,
                    helperText: prev.password.helperText
                }
            };
        });
    }
    const hLogin = async () => {
        setLoginClicked(true);
        const emailCheck = userValid.email_check(loginData.email.value);
        const passCheck = userValid.pass_check(loginData.password.value);
        console.table({emailCheck, passCheck});
        setLoginData(prev => {
            return {
                email: {
                    value: prev.email.value,
                    ...emailCheck
                },
                password: {
                    value: prev.password.value,
                    error: passCheck.error,
                    helperText: passCheck.error ? 'Invalid Password' : ''
                }
            }
        });
        if(emailCheck.error || passCheck.error){
            setLoginClicked(false);
            return;
        }

        //Login code here
        //login API
        const loginStatus = await login.login_basic({ email: loginData.email.value, password: loginData.password.value });
        if (loginStatus.error) {
            console.log("login failed");
            setLoginClicked(false);
            let message = Array.isArray(loginStatus.message) ? loginStatus.message[0].message : loginStatus.message;
            setMLanding(prev=>{
                return {
                    ...prev,
                    open: true,
                    error: true,
                    title: 'Unable to login',
                    message: message
                }
            })
            return;
        }
        navigate('/dashboard');
    }
    return (
        <div className="wrapper m-3">
            <h5 className='title-text mb-4 text-center text-sm-start'>Log into your account</h5>
            <TextField label="Email ID"
                variant="outlined"
                className='mb-4'
                value={loginData.email.value}
                onChange={hEmailChange}
                error={loginData.email.error}
                helperText={loginData.email.helperText}
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
                value={loginData.password.value}
                error={loginData.password.error}
                helperText={loginData.password.helperText}
                onChange={hPassChange}
            />
            <div className='d-flex justify-content-lg-between align-items-lg-center flex-column flex-lg-row'>
                <Button className='px-3 py-2 mb-3' 
                    variant="solid" onClick={hLogin} 
                    loading={loginClicked}
                    loadingPosition='end'
                    >
                    Log in
                </Button>
                <p className='m-0 mb-3'>
                    Don't have an account? <span className='switcher' onClick={() => setIsLogin(false)}>Register here</span>
                </p>
            </div>
        </div>
    );
}