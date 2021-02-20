import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, ButtonGroup } from 'react-bootstrap';
import './SignInOrSignUp.css';

const SignInOrSignUp = () => {
    let history = useHistory();

    const handleClickSingUp = () => {
        history.push('/signUp');
    };

    const handleClickSignIn = () => {
        history.push('/signIn');
    };

    return (
        <div className="logAndReg-container">
            <ButtonGroup aria-label="Basic example">
                <Button variant="primary" onClick={handleClickSignIn} >Sign In</Button>
                <Button variant="primary" onClick={handleClickSingUp} >Sign Up</Button>
            </ButtonGroup>
        </div>
    );
};

export default SignInOrSignUp;