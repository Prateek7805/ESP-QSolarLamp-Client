import './Welcome.css'
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import Form from 'react-bootstrap/Form';
export default function Welcome() {
    return (
        <>
            <div className='main-container container-fluid'>
                <div className="blur-overlay"></div>
                <div className='row content'>
                    <div className='panel col-12 col-sm-8' >
                        <div className='panel-title'><p>Welcome Aboard!</p></div>
                        <div className="login-container" >
                        <div className="row d-flex justify-content-center p-5 login-inputs">
                            <div className="col-12">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email address"
                            >
                                <Form.Control type="email" placeholder="name@example.com" />
                            </FloatingLabel>
                            
                            </div>
                            
                            <div className="col-12 mt-3">
                            <FloatingLabel controlId="floatingPassword" label="Password">
                                <Form.Control type="password" placeholder="Password" />
                            </FloatingLabel> 
                            </div>

                            <div className="d-flex justify-content-center col-12 mt-3">
                                    <Button type="submit">Button</Button>
                            </div>
                            
                        </div>
                        </div>

                    </div>
                    <div className='panel panel-image col-12 col-sm-4 d-none d-sm-flex' ></div>
                </div>
            </div>
        </>
    )
}