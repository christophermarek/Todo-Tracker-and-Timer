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


  return (
    <nav className="navbar">

        <ul className="nav-links">
        <li className="nav-item">
          <Link to="/timetracker">Home</Link>
        </li>

        {auth.isAuthenticated ? (
          <>
            <li className="nav-item">
              <Link to="/timetracker">Time Tracker</Link>
            </li>

            <li className="nav-item" onClick={onLogOut}>
              <a href="#">Log out</a>
            </li>
          </>
        ) : (
          <>
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