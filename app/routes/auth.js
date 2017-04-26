import Ember from 'ember';

const { Route, inject: {service} } = Ember;

export default Route.extend({
  session: service(),
  beforeModel() {
    if(this.get('session').get('isAuthenticated')) {
      this.transitionTo('app.index');
    }
  }
});
