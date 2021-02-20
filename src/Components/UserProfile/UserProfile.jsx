import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Modal from './Modal/Modal';

import './UserProfile.css';

const UserProfile = () => {
    const [modal, setModal] = useState(false);

    const { authData } = useSelector(store => store.auth);
    return (
        <div>
            <Modal show={modal} handleClose={() => setModal(false)} />
            <Card className="userProfileContainer">
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    <strong>Email:</strong> {authData && authData.email}
                    <Button onClick={() => setModal(true)} className="btn btn-primary w-100 mt-3">
                        Change Password
            </Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default UserProfile;