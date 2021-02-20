import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as EmailValidator from "email-validator";
import { useHistory, Link } from 'react-router-dom';

import authRedux from '../../../store/actions/auth';
import { Form, Button, } from 'react-bootstrap';
import './SignIn.css';

const SignIn = (props) => {
    useEffect(() => {
        if (props.successSignIn) {
            history.push('/');
            setEmail('');
            setPassword('');
            props.clearTheSuccessfullBooleans();
        };
    }, [props.successSignIn]);

    const history = useHistory();

    const [error, setError] = useState(null);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        const err = validate(email, password);
        if (err) {
            setError(err);
        } else {
            props.signIn(email, password);
        }
        setLoading(false);
    };

    const validate = (email, password) => {
        let err;
        if (!email) {
            err = 'Email is required';
        } else if (!EmailValidator.validate(email)) {
            err = 'Invalid email address!';
        }
        const passwordRegex = /(?=.*[0-9])/;
        if (!password) {
            err = 'Password is required!';
        } else if (password.length < 8) {
            err = 'Password must be 8 characters long!';
        } else if (!passwordRegex.test(password)) {
            err = 'Invalida password. Must contain one number!';
        };
        return err;
    };

    return (
        <div className="signIn">
            <Form className="was-validated" onSubmit={е => handleSubmit(е)}>
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
                {error && <div className="error">{error}</div>}
                <Button disabled={loading} variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <div className="w-100 text-center mt-2">
                <Link to="/forgotPassword"> Forgot Password? </Link>
            </div>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signUp"> Sign up</Link>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const { successSignIn } = state.auth;
    return { successSignIn };
};

const mapDispatchToProps = (dispatch) => ({
    signIn: async (email, password) => await dispatch(authRedux.SingIn(email, password)),
    clearTheSuccessfullBooleans: () => dispatch(authRedux.ClearTheSuccessfullBooleans())
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);