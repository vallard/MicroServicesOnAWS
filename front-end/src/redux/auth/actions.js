import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  SET_ERROR, 
  REGISTER_USER,
  SET_NEW_USER,
  CONFIRM_USER,
  CURRENT_AUTHENTICATED_USER,
  GET_CURRENT_SESSION,
  NO_CURRENT_SESSION,
  SET_MESSAGE,
} from './constants';

export const signIn = (user, password) => ({
  type: LOGIN_USER,
  user, 
  password,
});

export const signUp = (user, password) => ({
  type: REGISTER_USER,
  user,
  password,
});

export const signOut = () => ({
  type: LOGOUT_USER,
});

export const currentAuthenticatedUser = () => ({
  type: CURRENT_AUTHENTICATED_USER,
});

export const loginUserSuccess = (user) => ({
  type: LOGIN_USER_SUCCESS,
  user,
});

export const noCurrentSession = () => ({
  type: NO_CURRENT_SESSION,
});

export const getCurrentSession = () => ({
  type: GET_CURRENT_SESSION,
});


export const confirmSignUp = (user, code, history) => ({
  type: CONFIRM_USER,
  user,
  code,
  history,
});

export const setError = (error) => ({
  type: SET_ERROR,
  error: error,
});

export const setUnverifiedUser = (user) => ({
  type: SET_NEW_USER,
  user,
});

export const setMessage = (message) => ({
  type: SET_MESSAGE,
  message,
});
