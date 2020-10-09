import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from '../Components/Home/Home';
import Contacts from '../Components/Contacts/Contacts';
import SignUp from '../Components/auth/SignUp/SignUp';
import SignIn from '../Components/auth/SignIn/SignIn';
import Albums from '../Components/Form/Albums/Albums';
import Photos from '../Components/Form/Photos/Photos';

const CustomRoute = () => {
    const localStoreData = JSON.parse(localStorage.getItem('userData'));

    return localStoreData ? (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/contacts" component={Contacts} />
            <Route exact path="/albums" component={Albums} />
            <Route path="/albums/:id/photos" component={Photos} />
            <Redirect to="/" />
        </Switch>
    ) : (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/contacts" component={Contacts} />
                <Route path="/signUp" component={SignUp} />
                <Route path="/signIn" component={SignIn} />
                <Redirect to="/" />
            </Switch>
        );
};


export default CustomRoute;