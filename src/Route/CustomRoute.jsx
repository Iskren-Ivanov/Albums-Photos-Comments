import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from '../Components/Home/Home';
import Contacts from '../Components/Contacts/Contacts';
import SignUp from '../Components/auth/SignUp/SignUp';
import SignIn from '../Components/auth/SignIn/SignIn';
import Albums from '../Components/Form/Albums/Albums';
import Photos from '../Components/Form/Photos/Photos';
import UserProfile from '../Components/UserProfile/UserProfile';
import PrivateRoute from './PrivateRoute.jsx';
import ForgotPassword from '../Components/ForgotPassword/ForgotPassword';

const CustomRoute = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/contacts" component={Contacts} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/signIn" component={SignIn} />
        <Route path="/forgotPassword" component={ForgotPassword} />
        <PrivateRoute exact path="/albums"><Albums /></PrivateRoute>
        <PrivateRoute path="/albums/:id/photos"><Photos /></PrivateRoute>
        <PrivateRoute path="/profile"><UserProfile /></PrivateRoute>
        <Redirect to="/" />
    </Switch>
);


export default CustomRoute;