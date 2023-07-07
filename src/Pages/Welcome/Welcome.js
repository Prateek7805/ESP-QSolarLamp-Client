import './Welcome.css'

import Login from '../../Components/Login';
export default function Welcome() {
    return (
        <>
            <div className='main-container 
                            container-fluid d-flex flex-column 
                            justify-content-sm-center 
                            align-items-center
                            p-3 p-sm-1'
            >
                <div className="blur-overlay"></div>
                <div className='row content'>
                    <div className='panel col-12 col-sm-8' >
                    <Login/>
                       
                    </div>
                    <div className='panel panel-image col-12 col-sm-4 d-none d-sm-flex' ></div>
                </div>
            </div>
        </>
    )
}