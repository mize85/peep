import Ember from "ember";

const {Controller, inject: {service}} = Ember;

export default Controller.extend({
  session: service('session'),
  errors: null,

  actions: {
    authenticate() {
      let {identification, password} = this.getProperties('identification', 'password');
      this.get('session').authenticate('authenticator:oauth2-password-grant', identification, password).catch((reason) => {
        this.set('errors', reason.error || reason);
      });
    }
  }
});
