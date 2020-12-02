import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as EmailValidator from "email-validator";
import { useHistory } from 'react-router-dom';

import authRedux from '../../../store/actions/auth';
import { Form, Button, } from 'react-bootstrap';
import './SignIn.css';

const SignIn = (props) => {
    const history = useHistory();

    const [errorsMessages, setErrorsMessages] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validate(email, password);

        if (errors.email) {
            setErrorsMessages(<div className="error">{errors.email}</div>);
        }
        else if (errors.password) {
            setErrorsMessages(<div className="error">{errors.password}</div>);
        }
        else {
            history.push('/');
            props.signIn(email, password);
            setEmail('');
            setPassword('');
        };
    };

    const validate = (email, password) => {
        let errors = {};
        if (!email) {
            errors.email = "Email is required";
        } else if (!EmailValidator.validate(email)) {
            errors.email = "Invalid email address!";
        }

        const passwordRegex = /(?=.*[0-9])/;
        if (!password) {
            errors.password = "Password is required!";
        } else if (password.length < 8) {
            errors.password = "Password must be 8 characters long!";
        } else if (!passwordRegex.test(password)) {
            errors.password = "Invalida password. Must contain one number!";
        };

        return errors;
    };

    return (
        <div className="signIn">
            <Form class="was-validated" onSubmit={е => handleSubmit(е)}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label >Email address</Form.Label>
                    <Form.Control onBlur={event => setEmail(event.target.value)} defaultValue={email} type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onBlur={event => setPassword(event.target.value)}
                        defaultValue={password} type="password" placeholder="Password" />
                </Form.Group>
                
                {errorsMessages}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    signIn: (email, password) => dispatch(authRedux.SingIn(email, password))
});

export default connect(null, mapDispatchToProps)(SignIn);