import React from "react";
import {Route, Switch } from 'react-router-dom';
import Photos from '../containers/Photos';
import Welcome from '../containers/Welcome';
import SignUp from '../containers/Auth/SignUp';
import NotFound from '../components/NotFound';


export default ({childProps}) => 
  <Switch>
    {childProps.isAuthenticated ?
      <Route path="/" exact component={Photos} />
      :
      <Route path="/" exact component={Welcome} />
    }
    <Route path="/signup" component={SignUp} />
    <Route component={NotFound} />
  </Switch>
