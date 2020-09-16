import {
    LOGIN_USER,
    LOGOUT_USER,
    LOGIN_USER_SUCCESS,
    REGISTER_USER,
    SET_NEW_USER,
    CONFIRM_USER,
    FORGET_PASSWORD,
    FORGET_PASSWORD_SUCCESS,
    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    GET_CURRENT_SESSION,
    NO_CURRENT_SESSION,
    SET_MESSAGE,
    SET_ERROR,
} from './constants';

const initState = {
    user: null,
    loading: false,
    isAuthenticated: false,
    error: null,
    message: null,
}

const Auth = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_USER:
        return { ...state, loading: true };
    case LOGIN_USER_SUCCESS:
        return { ...state, user: action.user.attributes.email, isAuthenticated: true, loading: false, error: null, message: null};
    case LOGOUT_USER:
        return { ...state, user: null, isAuthenticated: false, loading: true, error: null, message: null};
    case SET_ERROR:
        return { ...state, error: action.error, loading: false, message: null };
    case REGISTER_USER:
        return { ...state, loading: true, message: null };
    case GET_CURRENT_SESSION:
        return { ...state, loading: true  };
    case NO_CURRENT_SESSION:
        return { ...state, loading: false };
    /* Set new unverified user after they register. */
    case SET_NEW_USER:
        return { ...state, user: action.user.username, isAuthenticated: false, loading: false, error: null };
    case CONFIRM_USER:
        return { ...state, user: action.user, isAuthenticated: false, loading: true, error: null  };
    case FORGET_PASSWORD:
        return { ...state, codeSent: false, loading: true };
    case FORGET_PASSWORD_SUCCESS:
        return { ...state, codeSent: true, confirmed: false, loading: false, error: null };
    case RESET_PASSWORD:
        return { ...state, confirmed: false, loading: true };
    case SET_MESSAGE:
        return { ...state, message: action.message, loading: false, error: null };
    case RESET_PASSWORD_SUCCESS:
        return { ...state, confirmed: true, loading: false, error: null, message: null };
    default: 
      return { ...state};
  }
};

export default Auth;
