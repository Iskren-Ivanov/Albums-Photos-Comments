import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from '../Components/Home/Home';
import Contacts from '../Components/Contacts/Contacts';
import SignUp from '../Components/auth/SignUp/SignUp';
import SignIn from '../Components/auth/SignIn/SignIn';
import Albums from '../Components/Form/Albums/Albums';
import Photos from '../Components/Form/Photos/Photos';

import PrivateRoute from './PrivateRoute.jsx';

const CustomRoute = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/contacts" component={Contacts} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/signIn" component={SignIn} />
        <PrivateRoute exact path="/albums"><Albums /></PrivateRoute>
        <PrivateRoute path="/albums/:id/photos"><Photos /></PrivateRoute>
        <Redirect to="/" />
    </Switch>
);


export default CustomRoute;