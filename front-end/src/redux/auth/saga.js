import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import auth from './api';


import { 
  CONFIRM_USER,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  GET_CURRENT_SESSION,
} from './constants';


import {
  loginUserSuccess,
  noCurrentSession,
  setUnverifiedUser,
  setError,
  setMessage,
} from './actions';


function*  getCurrentSession() {
  try {
    const response = yield call(auth.currentAuthenticatedUser);
    yield put(loginUserSuccess(response));
  }catch(error) {
    yield put(noCurrentSession());
  }
}

function* register({user, password}) {
  try{ 
    const response = yield call(auth.signUp, {
      user: user,
      password: password,
    });
    console.log('response: ', response);
    yield put(setUnverifiedUser(response.user));

  }catch(error) {
    let message;
    switch (error.status) {
      case 500: 
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Invalid credentials';
        break
      default: 
        message = error.message;
    }
    console.log("failure", error.message);
    yield put(setError(message));
  }
}

function* confirmUser({user, code, history}) {
  try{
    yield call(auth.confirmSignUp, {
      user: user,
      code: code,
    })
    yield put(setMessage("Successfully registered!  You may now login!"))
    yield call(() => history.push('/')); 
  } catch(error) {
    console.log("could not verify user.");
    console.log(error);
    yield put(setError(error.message));
  }
}

function *login({user, password}) {
  try {
    const response = yield call(auth.signIn, {
      user: user, 
      password: password,
    });
    console.log("response: ", response);
    yield put(loginUserSuccess(response));
  } catch(error) {
    //console.log("error: ", error);
    yield put(setError(error.message))
  }
}

function *logout(action) {
  console.log("Signout.");
  try {
    yield call(auth.signOut);
    yield put(setMessage("You have successfully signed out! We miss you already."));
  } catch (err) {
    yield put(setError(err.message));
  }
}

export function* watchLogin(){
  yield takeEvery(GET_CURRENT_SESSION, getCurrentSession);
  yield takeEvery(REGISTER_USER, register);
  yield takeEvery(CONFIRM_USER, confirmUser);
  yield takeEvery(LOGIN_USER, login);
  yield takeEvery(LOGOUT_USER, logout);
}

function* authSaga(): any{
  yield all([
    fork(watchLogin),
  ]);
}

export default authSaga;
