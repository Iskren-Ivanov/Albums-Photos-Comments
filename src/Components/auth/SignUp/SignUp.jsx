import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Button, } from 'react-bootstrap';
import * as EmailValidator from "email-validator";
import authRedux from '../../../store/actions/auth';

import './SignUp.css';

const SignUp = (props) => {
    let history = useHistory();

    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (props.successSignUp) {
            setPassword('');
            setConfirmPassword('');
            setEmail('');
            props.clearTheSuccessfullBooleans();
            history.push('/signIn')
        };
    }, [props.successSignUp]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const err = validate(email, password, confirmPassword);
        setLoading(true);
        if (err) {
            setError(err);
        } else {
            props.signUp(email, password);
        }
        setLoading(false);

    };

    const validate = (email, password, confirmPassword) => {
        let err;
        if (!email) {
            err = "Email is required!";
        } else if (!EmailValidator.validate(email)) {
            err = "Invalid email address!";
        };
        const passwordRegex = /(?=.*[0-9])/;
        if (!password) {
            err = "Password is required!";
        } else if (password.length < 8) {
            err = "Password must be 8 characters long!";
        } else if (!passwordRegex.test(password)) {
            err = "Invalida password. Must contain one number!";
        };

        if (confirmPassword !== password) {
            err = "Passwords are not the same!";
        };
        return err;
    };

    return (
        <div className="signUp">
            <Form noValidate onSubmit={handleSubmit} className="was-validated">
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
                        defaultValue={confirmPassword} type="password" placeholder="Confirm Password" />
                </Form.Group>
                {error && <div className="error">{error}</div>}
                <Button disabled={loading} variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/signIn">Sign in</Link>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    const { successSignUp } = state.auth;
    return { successSignUp };
};

const mapDispatchToProps = (dispatch) => ({
    signUp: async (email, password) => await dispatch(authRedux.SingUp(email, password)),
    clearTheSuccessfullBooleans: () => dispatch(authRedux.ClearTheSuccessfullBooleans())
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);