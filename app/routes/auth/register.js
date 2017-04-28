import Ember from "ember";

const {Route} = Ember;

export default Route.extend({

  actions: {
    doRegister() {
      const flashMessages = this.get('flashMessages');

      this.get('currentModel').save()
        .then(() => {
          this.transitionTo('auth.login');
          flashMessages.success('Registered sucessfully!');
        }).catch((response) => {

        const {errors} = response;

        // Check if any errors have a 401 code
        if (errors.mapBy('code').indexOf(401) >= 0) {

          // Unauthorized
          flashMessages
            .error('There was a problem with your username or password, please try again');
        } else {
          // All other API errors
          flashMessages.error('Server Error');
        }
      });
    }
  },

  model() {
    return this.store.createRecord('user');
  }
});
