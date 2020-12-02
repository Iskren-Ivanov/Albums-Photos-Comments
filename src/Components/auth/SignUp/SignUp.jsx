import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Button, } from 'react-bootstrap';
import * as EmailValidator from "email-validator";
import authRedux from '../../../store/actions/auth';

import './SignUp.css';

const SignUp = (props) => {
    let history = useHistory();

    const [errorsMessages, setErrorsMessages] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validate(email, password, confirmPassword);

        if (username.trim() === "") {
            setErrorsMessages(<div className="error">Тhe name is required!</div>);
        }
        else if (errors.password) {
            setErrorsMessages(<div className="error">{errors.password}</div>);
        }
        else if (errors.email) {
            setErrorsMessages(<div className="error">{errors.email}</div>);
        } else {
            history.push('/login');
            props.signUp(email, password, username);
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            setEmail('');
        }
    };

    const validate = (email, password, confirmPassword) => {
        let errors = {};
        if (!email) {
            errors.email = "Email is required!";
        } else if (!EmailValidator.validate(email)) {
            errors.email = "Invalid email address!";
        };
        const passwordRegex = /(?=.*[0-9])/;
        if (!password) {
            errors.password = "Password is required!";
        } else if (password.length < 8) {
            errors.password = "Password must be 8 characters long!";
        } else if (!passwordRegex.test(password)) {
            errors.password = "Invalida password. Must contain one number!";
        };

        if (confirmPassword !== password) {
            errors.password = "Passwords are not the same!";
        };

        return errors;
    };

    return (
        <div className="signUp">
            <Form onSubmit={handleSubmit} class="was-validated">
                <Form.Group controlId="usernameForm">
                    <Form.Label>Username</Form.Label>
                    <Form.Control onBlur={event => setUsername(event.target.value)} defaultValue={email} type="username" placeholder="username" />
                </Form.Group>
                <Form.Group controlId="emailForm">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onBlur={event => setEmail(event.target.value)} defaultValue={email} type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
            </Form.Text>
                </Form.Group>

                <Form.Group controlId="passwordForm">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onBlur={event => setPassword(event.target.value)}
                        defaultValue={password} type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group controlId="confirmPasswordForm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control onBlur={event => setConfirmPassword(event.target.value)}
                        defaultValue={password} type="password" placeholder="Password" />
                </Form.Group>
                {errorsMessages}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    signUp: (email, password) => dispatch(authRedux.SingUp(email, password))
});

export default connect(null, mapDispatchToProps)(SignUp);