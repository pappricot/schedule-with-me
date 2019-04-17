import React, { Component } from "react";
import { connect } from "react-redux";
import requiresLogin from "./requires-login";
import { fetchProtectedData } from "../actions/protected-data";
import "./NavBar.css";

class NavBar extends Component {
  componentDidMount() {
    this.props.dispatch(fetchProtectedData());
  }

  render() {
    return (
      <div className="NavBar">
        <div className="info">
          <h4 className="name">Username: {this.props.username}</h4>
          <h4 className="name">Name: {this.props.name}</h4>
        </div>
        <div className="buttonWrapper">
          <button
            className="btn btnLogOut"
            onClick={e => {
              e.preventDefault(); // to stop bubbling up and prevent the form to show up
              this.props.onLogOut();
              //how to connect to logOUtPage to redirect to '/'?
            }}
          >
            <h4 className="btnText">Log Out</h4>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    protectedData: state.protectedData.data
  };
};

export default requiresLogin()(connect(mapStateToProps)(NavBar));
