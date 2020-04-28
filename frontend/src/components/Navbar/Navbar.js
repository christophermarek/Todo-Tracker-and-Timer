import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { logOutUser } from '../../store/actions/authActions';
import './styles.css';

const Navbar = ({ auth, logOutUser, history }) => {
  const onLogOut = (event) => {
    event.preventDefault();
    logOutUser(history);
  };

  //here is where i move my old navbar
  return (
    <nav className="navbar">
        <ul className="nav-links flex-1">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        {auth.isAuthenticated ? (
          <>
            
            <li className="flex-1" />
            <li className="nav-item" onClick={onLogOut}>
              <a href="#">Log out</a>
            </li>
          </>
        ) : (
          <>
            <li className="flex-1" />

            <li className="nav-item">
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(withRouter, connect(mapStateToProps, { logOutUser }))(Navbar);