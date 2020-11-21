import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router';

const PrivateRoute = ({ children, ...rest }) => {
    return (
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
};

export default PrivateRoute;