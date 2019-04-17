import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import "./landing-page.css";

import LoginForm from "./login-form";
import LoginFormB from "./login-form-bootstrap";

export function LandingPage(props) {
  // If we are logged in redirect straight to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="home">
      <h2>Schedule With Me</h2>
      <LoginFormB />
      <p className="register">
        New to us? Click here:{" "}
        <Link to="/register" className="button">
          Register
        </Link>
      </p>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
