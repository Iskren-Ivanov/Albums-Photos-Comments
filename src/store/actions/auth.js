import axios from 'axios';
import { NotificationManager } from 'react-notifications';

const appKey = 'AIzaSyBd2itbl2Cdjth1i_XqxU1sRdThY5lC6RM';
const baseUrlSignIn = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
const baseUrlSignUp = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';

const SingUp = (email, password, username) => {
    return dispatch => {
        const authData = {
            email,
            password,
            username,
            returnSecureToken: true
        };

        axios.post(baseUrlSignUp + appKey, authData)
            .then(response => {
                NotificationManager.success('Success Sign Up!', 'Sign Up', 3000);
                dispatch({ type: 'SIGN_UP_SUCCESS', message: 'Success Sign Up!' });
            })
            .catch(err => {
                NotificationManager.warning('Еxisting Registration!', 'Error', 3000);
                dispatch({ type: 'SIGN_UP_ERROR', message: err });
            });
    };
};

const SingIn = (email, password) => {
    return dispatch => {
        const authData = {
            email,
            password,
            returnSecureToken: true
        };

        axios.post(baseUrlSignIn + appKey, authData)
            .then(response => {
                NotificationManager.success('Success Sign In!', 'Sign In', 3000);
                dispatch({ type: 'SIGN_IN_SUCCESS', authData: response.data, message: 'Success Sign In!' });
                localStorage.setItem('userData', JSON.stringify(response.data));
            }).catch(error => {
                NotificationManager.warning('Invalid User!', 'Error', 3000);
                dispatch({ type: 'SIGN_IN_ERROR', message: error });
            });
    };
};

const Logout = () => {
    return dispatch => {
        dispatch({ type: 'LOGOUT' });
    };
};

const GetLocaleStoreDataForStart = (localeStoreData) => {
    return dispatch => {
        dispatch({ type: 'SIGN_UP_WITH_ID_TOKEN', authData: localeStoreData })
    };
};


export default {
    SingUp,
    SingIn,
    GetLocaleStoreDataForStart,
    Logout,
};