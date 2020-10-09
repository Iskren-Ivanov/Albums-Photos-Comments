const initState = {
    message: null,
    authData: null,
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SIGN_UP_ERROR':
            return {
                ...state,
                message: action.message.response.data.error.message,
            };
        case 'SIGN_UP_SUCCESS':
            return {
                ...state,
                message: action.message,
            }
        case 'SIGN_IN_ERROR':
            return {
                ...state,
                authData: null,
                message: action.message.response.data.error.message
            }
        case 'SIGN_IN_SUCCESS':
            return {
                ...state,
                authData: action.authData,
                message: action.message,
            }
        case 'LOGOUT':
            return {
                authData: null,
            }
        case 'SIGN_UP_WITH_ID_TOKEN':
            return {
                ...state,
                authData: action.authData,
            };
        case 'GET_LOCALE_STORE_DATA_FOR_START':
            return {
                ...state,
                authData: action.authData,
            }
        default:
            return state;
    }
};

export default authReducer;