import './Signup.css';
import { TextField } from '@mui/material';
import { Button } from '@mui/joy';
import { DateField } from '@mui/x-date-pickers/DateField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useContext, useState } from 'react';
import userValid from '../../Assets/Validation/User_Input_Validation';
import signup from '../../Assets/API/Signup';
import { MLanding } from '../Context/Modal_Context';
import PasswordInput from '../PasswordInput/PasswordInput';

export default function Signup(props) {
    
    const { setIsLogin } = props;
    const {setMLanding} = useContext(MLanding);
    const [signupData, setSignupData] = useState({
        first_name: {
            value: '',
            error: false,
            helperText: ''
        },
        last_name: {
            value: '',
            error: false,
            helperText: ''
        },
        date_of_birth: {
            value: undefined,
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
    const [signinClicked, setSigninClicked] = useState(false);

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
        first_name: ({ target }) => {
            const partialFn = target.value;
            setSignupData(prev => {
                return {
                    ...prev,
                    first_name: {
                        value: partialFn,
                        error: prev.first_name.error,
                        helperText: prev.first_name.helperText
                    }
                }
            });
        },
        last_name: ({ target }) => {
            const partialLn = target.value;
            setSignupData(prev => {
                return {
                    ...prev,
                    last_name: {
                        value: partialLn,
                        error: prev.last_name.error,
                        helperText: prev.last_name.helperText
                    }
                }
            });
        },
        date_of_birth: (value) => {
            const partialDOB = value;
            console.log(partialDOB);
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

    const hSignin = async () => {
        try {
            setSigninClicked(true);
            const fnCheck = userValid.name_check(signupData.first_name.value);
            const lnCheck = userValid.name_check(signupData.last_name.value);
            const dobCheck = userValid.dob_check(signupData.date_of_birth.value);
            const emailCheck = userValid.email_check(signupData.email.value);
            const passCheck = userValid.pass_check(signupData.password.value);
            setSignupData(prev => {
                return {
                    first_name: {
                        value: prev.first_name.value,
                        ...fnCheck
                    },
                    last_name: {
                        value: prev.last_name.value,
                        ...lnCheck
                    },
                    date_of_birth: {
                        value: prev.date_of_birth.value,
                        ...dobCheck
                    },
                    email: {
                        value: prev.email.value,
                        ...emailCheck
                    },
                    password: {
                        value: prev.password.value,
                        ...passCheck
                    }
                }
            });
            if (fnCheck.error
                || lnCheck.error
                || dobCheck.error
                || emailCheck.error
                || passCheck.error
            ) {
                setSigninClicked(false);
                return;
            }
            //signup
            const reqBody = {};
            for (const key in signupData) {
                if (signupData.hasOwnProperty(key)
                    && signupData[key].value !== undefined
                    && signupData[key].value !== null) {

                    reqBody[key] = signupData[key].value;
                }
            }
            const originURL = process.env.REACT_APP_SELF_URL;
            reqBody['origin'] = originURL;
            const response = await signup(reqBody);

            const title = response.error? 'Error in Signup' : 'Signup Successful';
            let message = response.message;
            if(typeof(message) !== 'string'){
                message = 'Please check the console for logs';
                console.log(response.message);
            }
            setMLanding(prev=>{
                return {
                    ...prev,
                    open: true,
                    error: response.error,
                    title: title,
                    message: message
                }
            });
            setSigninClicked(false);
        } catch (error) {
            setSigninClicked(false);
            console.log(error);
        }

    }
    return (
        
        <div className="wrapper m-3">

            <div className='row name-row'>
                <div className='col-12 col-sm-6'>
                    <TextField
                        label="First Name"
                        variant="outlined"
                        className='mb-3 col-12'
                        value={signupData.first_name.value}
                        error={signupData.first_name.error}
                        helperText={signupData.first_name.helperText}
                        onChange={hl.first_name}
                    />
                </div>
                <div className='col-12 col-sm-6'>
                    <TextField
                        label="Last Name"
                        variant="outlined"
                        className='mb-3 col-12'
                        value={signupData.last_name.value}
                        error={signupData.last_name.error}
                        helperText={signupData.last_name.helperText}
                        onChange={hl.last_name}
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
            
            <PasswordInput className='mb-3'
                value={signupData.password.value}
                error={signupData.password.error}
                helperText={signupData.password.helperText}
                onChange={hl.password}/>

            <div className='d-flex justify-content-lg-between align-items-lg-center flex-column flex-lg-row'>
                <Button className='px-3 py-2 mb-3'
                    variant="solid"
                    onClick={hSignin}
                    loading={signinClicked}
                    loadingPosition='end'
                >
                    Sign Up
                </Button>
                <p className='m-0 mb-3'>
                    Already a member? <span className='switcher' onClick={() => setIsLogin(true)}>Login here</span>
                </p>
            </div>
        </div>
        
    );
}