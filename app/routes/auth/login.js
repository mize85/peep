import Ember from "ember";

const {Route, inject: {service}} = Ember;


export default Route.extend({

  session: service(),

  actions: {
    doLogin() {
      const user = this.get('currentModel');
      this.get('session')
        .authenticate(
          'authenticator:application', user.email, user.password
        );
    }
  },
  model() {
    return {
      email: '',
      password: ''
    };
  }
});
