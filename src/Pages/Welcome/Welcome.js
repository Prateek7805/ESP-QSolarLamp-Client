import './Welcome.css'
import Login from '../../Components/Login/Login';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import panel_background from '../../Assets/Images/Welcome/Panel_Background.jpg';
export default function Welcome() {
    const [imageLoaded, setImageLoaded] = useState(false);
    useEffect(() => {
        const img = new Image();

        img.onload = function () {
            setImageLoaded(true);
        }
        img.src = panel_background;
    }, []);

    return (
        <>

            <div className='main-container 
                            container-fluid d-flex flex-column 
                            justify-content-sm-center 
                            align-items-center
                            p-3 p-sm-1'
            >
                <div className="blur-overlay"></div>
                {imageLoaded ? (
                    <div className='row content'>
                        <div className='panel col-12 col-sm-8' >
                            <div className='panel-title'><p>Welcome Aboard!</p></div>
                            <Login />

                        </div>
                        <div id="ID_PANEL_IMAGE" className='panel panel-image col-12 col-sm-4 d-none d-sm-flex' >

                        </div>
                    </div>) : (<Spinner animation="border" variant="warning" />)}
            </div>
        </>
    )
}