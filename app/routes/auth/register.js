import Ember from "ember";

export default Ember.Route.extend({

  actions: {
    doRegister() {
      this.get('currentModel').save()
        .then(() => {
          this.transitionTo('auth.login');
          this.get('flashMessages').success('Registered sucessfully!');

        }).catch((response) => {

        const {errors} = response;

        // Check if any errors have a 401 code
        if (errors.mapBy('code').indexOf(401) >= 0) {

          // Unauthorized
          this.get('flashMessages')
            .danger('There was a problem with your username or password, please try again');

        } else {

          // All other API errors
          this.get('flashMessages').danger('Server Error');

        }
      });
    }
  },


  model() {
    return this.store.createRecord('user');
  }
});
