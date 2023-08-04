import Login from '../../Components/Log_in/Login';
import './Landing.css';
import Logo from '../../Assets/Images/Landing/Logo.svg';
import Background_Image from '../../Assets/Images/Landing/landing-background.jpg';
import Panel_Image from '../../Assets/Images/Landing/panel-background.jpg'
import { useEffect, useState } from 'react';
import Signup from '../../Components/Signup/Signup';
import { useNavigate } from 'react-router-dom';
import login from '../../Assets/API/Login';
import LandingModal  from '../../Components/LandingModal/Modal';
import Spinner from '../../Components/Spinner/Spinner';

export default function Landing() {

    const [isBgLoaded, setIsBgLoaded] = useState(0);
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const imgBg = new Image();
        const imgPanelBg = new Image();
        async function autoLogin() {
            try {
                const loginStatus = await login.login_auto();
                if (loginStatus) {
                    navigate('/dashboard');
                    return;
                }
                setIsBgLoaded(prev => {return prev|0x04}); //load loginpage
            } catch (err) {
                setIsBgLoaded(prev => {return prev|0x04}); //load loginpage
                console.log(err);
            }
        }

        imgBg.onload = () => {
            setIsBgLoaded(prev => { return prev|0x01 });
        }
        imgPanelBg.onload = () => {
            setIsBgLoaded(prev => { return prev|0x02 });
        }

        imgBg.src = Background_Image;
        imgPanelBg.src = Panel_Image;
        autoLogin();
    }, [navigate]);

    return (
        <div className="main-container">
            <LandingModal/>
            {isBgLoaded === 0x07 ? 
            (
                <div className='row panel'>
                    <div className='d-none d-sm-flex col-sm-4 panel-image' />
                    <div className='col-12 col-sm-8 panel-controls'>
                        <div className='d-flex align-items-center justify-content-center'>
                            <img src={Logo} alt="Logo" className='mx-1' />
                            <p className='m-0 h5'>QSolarLamp</p>
                        </div>
                        {isLogin ? (<Login setIsLogin={setIsLogin} />) : (<Signup setIsLogin={setIsLogin} />)}
                    </div>
                </div>
            )
            :
            (<Spinner/>)
            }

        </div>
    )
}