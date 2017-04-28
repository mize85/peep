import Ember from "ember";
import ApplicationRouteMixin from "ember-simple-auth/mixins/application-route-mixin";

const {Route, inject: {service}} = Ember;

export default Route.extend(ApplicationRouteMixin, {
  session: service(),
  flashMessages: service('notification-messages'),

  init(){
    this._super(...arguments);
    const fM = this.get('flashMessages');
    if (fM) {
      fM.setDefaultAutoClear(true);
    }
  },

  actions: {
    logout() {
      this.get('session').invalidate();
      // Generate a message
      this.get('flashMessages').success('Logged out');
    }
  }
});
