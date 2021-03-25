import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Navbar, Nav, } from 'react-bootstrap';
import LogoutBtn from '../../Components/UI/Buttons/Logout/Logout';
import SignInOrSignUpButton from '../../Components/UI/Buttons/SwitchSignInOrSignUp/SignInOrSignUp';
import { Link } from 'react-router-dom';

import './Navigation.css';

const Navigation = () => {
    const { authData } = useSelector(store => store.auth);
    return (
        <div>
            <Navbar bg="primary" variant="dark">
                {authData ?
                    <Nav className="mr-auto navLeftSide">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/contacts">Contacts</Nav.Link>
                        <Nav.Link href="/albums">Albums</Nav.Link>
                    </Nav>
                    :
                    <Nav className="mr-auto navLeftSide">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/contacts">Contacts</Nav.Link>
                    </Nav>
                }
                <Form inline>
                    {authData && <Link color="primary" className="mr-auto  link" to={'/profile'} >Profile</Link>}
                    {authData ? <LogoutBtn /> : <SignInOrSignUpButton />}
                </Form>
            </Navbar>
        </div >
    );
};

export default Navigation;