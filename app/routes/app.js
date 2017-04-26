import Ember from "ember";
import fetch from "ember-network/fetch";
import config from "../config/environment";

const {Route, inject: {service}} = Ember;
const {DS: {protocol, host, namespace}} = config;

export default Route.extend({
  session: service(),
  phoenixSocket: service(),

  beforeModel() {
    if (!this.get('session').get('isAuthenticated')) {
      this.transitionTo('auth.login');
    }
  },
  afterModel() {
    return fetch(`${protocol}://${host}/${namespace}/user/current`, {
      type: 'GET',
      headers: {
        'Authorization': `Bearer ${this.get('session').get('session.content.authenticated.access_token')}`
      }
    }).then((raw) => {
      return raw.json().then((data) => {
        const currentUser = this.store.push(data);
        this.set('session.currentUser', currentUser);

        // setup socket
        const socketService = this.get('phoenixSocket');
        const session = this.get('session');
        const wsProtocol = protocol === 'http' ? 'ws' : 'wss';
        socketService.connect(`${wsProtocol}://${host}/socket`, {params: {guardian_token: session.get('data.authenticated.access_token')}});
      });
    });
  }
});
