import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import authRedux from '../../../store/actions/auth';

import { Button, Modal, Form } from 'react-bootstrap';

const MyModal = ({ show, handleClose, changePassoword }) => {
    useEffect(() => {
        setVisible(show);
    }, [show]);

    const [visible, setVisible] = useState(false);

    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const err = validate(password, confirmPassword);
        if (err) {
            setError(err);
        } else {
            changePassoword(password);
        }
    };

    const validate = (password, confirmPassword) => {
        let err;
        const passwordRegex = /(?=.*[0-9])/;
        if (!password) {
            err = 'Password is required!';
        } else if (password.length < 8) {
            err = 'Password must be 8 characters long!';
        } else if (!passwordRegex.test(password)) {
            err = 'Invalida password. Must contain one number!';
        } else if (password !== confirmPassword) {
            err = 'Password and ConfirmPassword They Must Be The Same';
        };
        return err;
    };

    return (
        <div>
            <Modal show={visible} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Form className="was-validated" onSubmit={е => handleSubmit(е)}>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label >New Password</Form.Label>
                        <Form.Control onBlur={event => setPassword(event.target.value)} defaultValue={password} type="password" placeholder="Enter new password" />
                    </Form.Group>

                    <Form.Group controlId="formBasicConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control onBlur={event => setConfirmPassword(event.target.value)}
                            defaultValue={confirmPassword} type="password" placeholder="Confirm Password" />
                    </Form.Group>
                    {error && <div className="error">{error}</div>}
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
            </Button>
                    <Button variant="primary" type="submit">
                        Update
            </Button>
                </Form>
            </Modal>
        </div >
    );
};

const mapDispatchToProps = (dispatch) => ({
    changePassoword: (newPassword) => dispatch(authRedux.ChangePassword(newPassword))
});

export default connect(null, mapDispatchToProps)(MyModal);