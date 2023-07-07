import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import './Login.css';
import { useState } from 'react';
export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleEmail = ({ target }) => {
        const value = target.value;
        console.log(value);
        setEmail(value);
    }
    const handlePassword = ({ target }) => {
        const value = target.value;
        console.log(value);
        setPassword(value);
    }
    return (
            <div className='login-wrapper '>


                <div className="login-container" >
                    <div className="row d-flex justify-content-center p-3 p-sm-5 login-inputs ">
                        <div className="col-12">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email address"
                            >
                                <Form.Control type="email" placeholder="name@example.com" onChange={handleEmail} value={email} />
                            </FloatingLabel>

                        </div>

                        <div className="col-12 mt-3">
                            <FloatingLabel controlId="floatingPassword" label="Password">
                                <Form.Control type="password" placeholder="Password" onChange={handlePassword} value={password} />
                            </FloatingLabel>
                        </div>

                        <div className="d-flex justify-content-center col-12 mt-3">
                            <Button type="submit">Button</Button>
                        </div>

                    </div>

                </div>
                <div className='login-footer'><p>New here? Signup</p></div>
            </div>
        );
}