import {combineReducers} from 'redux';
import {LOGOUT_USER } from './auth/constants';
import Auth from './auth/reducers';
import Photos from './photos/reducers';

const appReducer =  combineReducers({
    Auth,
    Photos,
});

export const rootReducer = (state, action) => {
  // clear state 
  if (action.type === LOGOUT_USER) {
    state = { };
  }
  return appReducer(state,action)
}

