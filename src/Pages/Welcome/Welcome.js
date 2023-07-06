import './Welcome.css'
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

import Form from 'react-bootstrap/Form';
export default function Welcome() {
    return (
        <>
            <div className='op main-container container-fluid'>
                <div className="blur-overlay"></div>
                <div className='row content'>
                    <div className='panel col-12 col-sm-8' >
                        <div className='panel-title'><p>Welcome Aboard!</p></div>
                        <div className='d-flex p-3'>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                            <Form.Control placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                        </InputGroup>

                        </div>
                        
                    </div>
                    <div className='panel panel-image col-12 col-sm-4 d-none d-sm-flex' ></div>
                </div>
            </div>
        </>
    )
}