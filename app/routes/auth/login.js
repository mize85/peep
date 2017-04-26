import Ember from "ember";

const {Route, inject: {service}} = Ember;


export default Route.extend({

  session: service(),
  flashMessages: service('notification-messages'),

  actions: {
    doLogin() {
      const flashMessages = this.get('flashMessages');
      const user = this.get('currentModel');
      this.get('session')
        .authenticate(
          'authenticator:application', user.email, user.password
        ).then(() => {

        // Successful Login
        flashMessages.success('Logged in!');

      }).catch((response) => {

        const { errors } = response;

        // Check if any errors have a 401 code
        if (errors.mapBy('code').indexOf(401) >= 0) {
          // Unauthorized
          flashMessages.error('There was a problem with your username or password, please try again');
        } else {
          // All other API errors
          flashMessages.error('Server Error');
        }
      });
    }
  },
  model() {
    return {
      email: '',
      password: ''
    };
  }
});
