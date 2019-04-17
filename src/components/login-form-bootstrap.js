import React from "react";
import { Field, reduxForm, focus } from "redux-form";
import Input from "./input";
import { login } from "../actions/auth";
import { required, nonEmpty } from "../validators";
import "./login-form.css";

export class LoginFormB extends React.Component {
  onSubmit(values) {
    return this.props.dispatch(login(values.username, values.password));
  }

  render() {
    let error;
    if (this.props.error) {
      error = (
        <div className="form-error" aria-live="polite">
          {this.props.error}
        </div>
      );
    }
    return (
      <div id="LoginForm">
        <div class="container">
          <h1 class="form-heading">Login Form</h1>
          <div class="login-form">
            <div class="main-div">
              <div class="panel">
                <h2>User Login</h2>
              </div>
              <form
                id="Login"
                onSubmit={this.props.handleSubmit(values =>
                  this.onSubmit(values)
                )}
              >
                {error}
                <div class="form-group">
                  <Field
                    name="username"
                    component={Input}
                    type="text"
                    className="form-control"
                    id="inputUsername"
                    placeholder="Username"
                    validate={[required, nonEmpty]}
                  />
                </div>

                <div class="form-group">
                  <Field
                    name="password"
                    component={Input}
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    placeholder="Password"
                    validate={[required, nonEmpty]}
                  />
                </div>

                <div class="forgot">
                  <a href="reset.html">Forgot password?</a>
                </div>

                <button
                  type="submit"
                  class="btn btn-primary"
                  disabled={this.props.pristine || this.props.submitting}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default reduxForm({
  form: "login",
  onSubmitFail: (errors, dispatch) => dispatch(focus("login", "username"))
})(LoginFormB);
