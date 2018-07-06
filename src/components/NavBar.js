import React, { Component } from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchProtectedData} from '../actions/protected-data';

class NavBar extends Component {

  componentDidMount() {
    this.props.dispatch(fetchProtectedData());
  }

  render() {
    return (
      <div className="dashboard">
                <div className="dashboard-username">
                    Username: {this.props.username}
                </div>
                <div className="dashboard-name">Name: {this.props.name}</div>
                <div className="dashboard-protected-data">
                    Protected data: {this.props.protectedData}
                </div>
                <br />
                  <button onClick={
                          e => {e.preventDefault() // to stop bubbling up and prevent the form to show up
                              this.props.onLogOut()
                              //how to connect to logOUtPage to redirect to '/'?
                          }            
                      } 
                  > 
                  Log out
                  </button>
                  {/* <Redirect to="/" onClick={
                          e => {e.stopPropagation() // to stop bubbling up and prevent the form to show up
                              onLogOut()
                              //how to connect to logOUtPage to redirect to '/'?
                          } 
                        }
                  >
                  Log out</Redirect> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {currentUser} = state.auth;
  return{
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    protectedData: state.protectedData.data
  }
}

export default requiresLogin()(connect(mapStateToProps)(NavBar));