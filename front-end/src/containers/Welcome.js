import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {signIn} from '../redux/actions';
import Alert from 'react-bootstrap/Alert';
import SignInForm from '../components/SignInForm';
import Error from '../components/Error';

class Welcome extends Component {
  render() {
    return (
      <div className="container">
        {console.log("loaing: ", this.props.loading)}
        <h1 className="Display-1">Castle Rock Photos</h1>
        {this.props.message && 
          <Alert variant="success">
            {this.props.message}
          </Alert>
        }
        {this.props.error && <Error error={this.props.error} /> }
        <p className="lead text-muted">Log in for your photos</p>
        <SignInForm
          action={this.props.signIn}
          loading={this.props.loading}
          sub="Sign In"
        />
        <hr/>
        Need an account?  <Link to="/signup">Sign Up!</Link>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  message: state.Auth.message,
  loading: state.Auth.loading,
  error: state.Auth.error,
});

const mapDispatchToProps = dispatch => ({
  signIn: (user, password) => dispatch(signIn(user, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
