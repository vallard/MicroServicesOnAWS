import { Auth } from 'aws-amplify';

const auth = {
  currentSession() {
    return Auth.currentSession();
  },
  async currentAuthenticatedUser() {
    return Auth.currentAuthenticatedUser();
  },

  signIn(userdata) {
    console.log("API signing in: ", userdata.user, userdata.password);
    return Auth.signIn(userdata.user, userdata.password);
  },

  signUp(userdata) {
    console.log("user data: ", userdata);
    return Auth.signUp({
      username: userdata.user,
      password: userdata.password,
      /*
      attributes: {
        email: userdata.user,
      }
      */
    });
  },
  confirmSignUp(userdata) {
    return Auth.confirmSignUp(userdata.user, userdata.code);
  },
  signOut() {
    return Auth.signOut();
  }
}

export default auth;
