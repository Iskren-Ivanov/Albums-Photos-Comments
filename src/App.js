import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import authRedux from './store/actions/auth';

import MyRoute from './Route/CustomRoute';
import Header from './Header/Header';
import Menu from './Menu/Menu';
import { NotificationContainer } from 'react-notifications';

import './App.css';
import 'react-notifications/lib/notifications.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App(props) {
  useEffect(() => {
    const localStoreData = JSON.parse(localStorage.getItem('userData'));

    if (localStoreData) {
      props.getLocalStoreDataForStart(localStoreData);
    }
  }, [props]);

  return (
    <div className="App">
      <NotificationContainer />
      <Header />
      <Menu />
      <MyRoute />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getLocalStoreDataForStart: (localStoreData) => dispatch(authRedux.GetLocalStoreDataForStart(localStoreData)),
});


export default connect(null, mapDispatchToProps)(App);
