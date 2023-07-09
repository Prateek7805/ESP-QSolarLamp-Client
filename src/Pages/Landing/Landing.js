import Login from '../../Components/Log_in/Login';
import CircularProgress from '@mui/joy/CircularProgress';
import './Landing.css';
import Logo from '../../Assets/Images/Landing/Logo.svg';
import Background_Image from '../../Assets/Images/Landing/landing-background.jpg';
import { useEffect, useState } from 'react';
import Signup from '../../Components/Signup/Signup';

export default function Landing() {

    const [isBgLoaded, setIsBgLoaded] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    useEffect(()=>{
        const img = new Image();
        img.onload = ()=>{
            setIsBgLoaded(true);            
        }
        img.src = Background_Image;
    }, []);

    return (
        <div className="main-container">
            {isBgLoaded? (<div className='row panel'>
                <div className='d-none d-sm-flex col-sm-4 panel-image' />
                <div className='col-12 col-sm-8 panel-controls'>
                    <div className='d-flex align-items-center justify-content-center'>
                        <img src={Logo} alt="Logo" className='mx-1'/>
                        <p className='m-0 h5'>QSolarLamp</p>
                    </div>
                    {isLogin? (<Login setIsLogin={setIsLogin}/>) : (<Signup setIsLogin={setIsLogin}/>)}
                    
                    
                </div>
            </div>) 
            :
            (<CircularProgress/>)
            }
            
        </div>
    )
}