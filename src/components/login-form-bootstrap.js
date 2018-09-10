import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {login} from '../actions/auth';
import {required, nonEmpty} from '../validators';
import './login-form.css';

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
     
<html>
  <head>

  <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  </head>
<div id="LoginForm">
<div class="container">
<h1 class="form-heading">Login Form</h1>
<div class="login-form">
<div class="main-div">
    <div class="panel">
   <h2>User Login</h2>
   <p>Please enter your email and password</p>
   </div>
    <form   
        id="Login"
        onSubmit={this.props.handleSubmit(values =>
                this.onSubmit(values)
        )}>
        {error}
        <div class="form-group">


            {/* <input type="email" class="form-control" id="inputEmail" placeholder="Email Address" /> */}
            <Field
                    component={Input}
                    type="email" class="form-control" id="inputEmail" placeholder="Email Address"
                    validate={[required, nonEmpty]}
                />


        </div>

        
        <div class="form-group">

            {/* <input type="password" class="form-control" id="inputPassword" placeholder="Password" /> */}
            <Field
                    component={Input}
                    type="password" class="form-control" id="inputPassword" placeholder="Password"
                    validate={[required, nonEmpty]}
            />

        </div>
        <div class="forgot">
        <a href="reset.html">Forgot password?</a>
        </div>
        <button type="submit" class="btn btn-primary" disabled={this.props.pristine || this.props.submitting}>Login</button>

    </form>
    </div>
</div></div></div>

</html>

        )
    }
}
export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginFormB);