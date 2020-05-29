import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logOutUser } from '../../store/actions/authActions';
import './styles.css';
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const Navbar = ({ auth, logOutUser, history }) => {
  const onLogOut = (event) => {
    event.preventDefault();
    logOutUser(history);
  };


  return (

      <Tabs         
      orientation="vertical"
      >
      <Tab label="Home" component={Link} to="/"/>
      <Tab label="Time Tracker" component={Link} to="/timetracker" />
      
        {auth.isAuthenticated ? (
          <>
            <li className="nav-item" onClick={onLogOut}>
              <a href="#">Log out</a>
            </li>
          </>
        ) : (
          <>
            <Tab label="login" component={Link} to="/login" />
          </>
        )}
      
      </Tabs>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(withRouter, connect(mapStateToProps, { logOutUser }))(Navbar);