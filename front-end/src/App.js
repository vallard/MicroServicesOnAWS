import React, {Component} from 'react';
import Routes from './routes';
import {connect} from 'react-redux';
import {getCurrentSession} from './redux/actions';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.getCurrentSession();
  }

  render() {
    return (
      <Routes childProps={{isAuthenticated: this.props.isAuthenticated}} />
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  getCurrentSession: () => dispatch(getCurrentSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
