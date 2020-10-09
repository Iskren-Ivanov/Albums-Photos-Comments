import React from 'react';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import authAction from '../../../../store/actions/auth';

import './Logout.css';

const Logout = (props) => {
    const history = useHistory();
    
    const handleClick = () => {
        props.logout();
        localStorage.removeItem('userData');
        history.push('/');
    }

    return (
        <div className="logout-container">
            <Button color="primary"
                onClick={handleClick}>Logout</Button>{' '}
        </div >
    )
}

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(authAction.Logout()),
})

export default connect(null, mapDispatchToProps)(Logout);