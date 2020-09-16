import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import {
  signUp,
  confirmSignUp,
} from '../../redux/actions';

import Error from '../../components/Error';
import Confirm from '../../components/Confirm';
import SignInForm from '../../components/SignInForm';

const Confirmation = ({loading, action}) => {

  return(
    <>
      <p className="lead text-muted">Please check your email for the confirmation code that was generated.  If you don't see an email from us, please check your junk folder or contact <a href="mailto:support@castlerock.ai">support@castlerock.ai</a>
      </p>
      <Confirm 
        action={action}
        loading={loading}
      /> 
    </>
  )
}




class SignUp extends Component {

  render() {
    return (
      <>
        { this.props.isAuthenticated && <Redirect to="/" />}
        <div className="container">
          <h1 className="Display-1">Castle Rock Photos</h1>
          { this.props.error && 
            <Error error={this.props.error} />
          }

          { this.props.user  ? 
              <Confirmation 
                loading={this.props.loading}
                action={(code) => {
                    console.log("code: ", code, this.props.user, this.props.history);
                    this.props.confirmSignUp(this.props.user, code, this.props.history)
                }}
            /> 
            :
            <>
              <p className="lead text-muted">Sign Up to store all your photos.</p> 
              <SignInForm 
                action={this.props.signUp}
                loading={this.props.loading}
                sub="Sign Up"
              />
              <hr/>
              Already have an account?  <Link to="/">Sign In</Link>
            </>
          }
        </div>
      </>
    )
  }
};

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
  loading: state.Auth.loading,
  error: state.Auth.error,
});

const mapDispatchToProps = dispatch => ({
  signUp: (user, password) => dispatch(signUp(user, password)),
  confirmSignUp: (user, code, history) => dispatch(confirmSignUp(user, code, history)),
});


export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
