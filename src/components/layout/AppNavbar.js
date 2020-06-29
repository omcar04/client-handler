import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { auth } from "firebase";

class AppNavbar extends Component {
  state = {
    isAutheticated: false,
  };

  static getDerivedStateFromProps(props, state) {
    const { auth } = props;

    if (auth.uid) {
      return { isAutheticated: true };
    } else {
      return { isAutheticated: false };
    }
  }

  onLogoutClick = (e) => {
    e.preventDefault();

    const { firebase } = this.props;

    firebase.logout();
  };

  render() {
    const { isAutheticated } = this.state;
    const { auth } = this.props;
    const { allowRegistration } = this.props.settings;
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Client Panel
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarMain"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarMain">
          <ul className="navbar-nav mr-auto">
            {isAutheticated ? (
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Dashboard
                </Link>
              </li>
            ) : null}
          </ul>

          {isAutheticated ? (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="#!" className="nav-link">
                  {auth.email}
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/settings" className="nav-link">
                  Settings
                </Link>
              </li>
              <li className="nav-item">
                <Link to="#!" className="nav-link" onClick={this.onLogoutClick}>
                  Logout
                </Link>
              </li>
            </ul>
          ) : null}

          {allowRegistration && !isAutheticated ? (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
            </ul>
          ) : null}
        </div>
      </nav>
    );
  }
}

AppNavbar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings,
  }))
)(AppNavbar);
