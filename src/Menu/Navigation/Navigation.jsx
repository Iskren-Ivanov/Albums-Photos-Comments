import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Navbar, Nav, } from 'react-bootstrap';
import LogoutBtn from '../../Components/UI/Buttons/Logout/Logout';
import SignInOrSignUpButton from '../../Components/UI/Buttons/SwitchSignInOrSignUp/SignInOrSignUp';

const Navigation = () => {
    const { authData } = useSelector(store => store.auth);

    let navWithUserOrNot = authData ?
        (
            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/contacts">Contacts</Nav.Link>
                <Nav.Link href="/albums">Albums</Nav.Link>
            </Nav>
        )
        :
        (
            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/contacts">Contacts</Nav.Link>
            </Nav>
        );

    return (
        <div >
            <Navbar bg="primary" variant="dark">
                {navWithUserOrNot}
                <Form inline>
                    {authData ? <LogoutBtn /> : <SignInOrSignUpButton />}
                </Form>
            </Navbar>
        </div>
    );
};

export default Navigation;