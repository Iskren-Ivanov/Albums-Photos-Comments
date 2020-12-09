import React from 'react';
import { Route, Redirect } from 'react-router';

const PrivateRoute = ({ children, ...rest }) => (
    <Route
        {...rest}
        render={({ location }) =>
            localStorage.getItem('userData') ? (
                children
            ) : (
                    <Redirect
                        to="/"
                    />
                )
        }
    />
);

export default PrivateRoute;