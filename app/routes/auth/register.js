import Ember from "ember";

const {Route, inject} = Ember;

export default Route.extend({

  flashMessages: inject.service(),

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
            .danger('There was a problem with your username or password, please try again');

        } else {

          // All other API errors
          flashMessages.danger('Server Error');

        }
      });
    }
  },


  model() {
    return this.store.createRecord('user');
  }
});
