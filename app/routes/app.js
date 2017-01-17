import Ember from "ember";
import config from "../config/environment";
import fetch from "ember-network/fetch";

const {Route, inject} = Ember;

export default Route.extend({
  session: inject.service(),
  phoenixSocket: inject.service(),

  beforeModel() {
    if (!this.get('session').get('isAuthenticated')) {
      this.transitionTo('auth.login');
    }
  },
  afterModel() {
    return fetch(`${config.DS.host}/${config.DS.namespace}/user/current`, {
      type: 'GET',
      headers: {
        'Authorization': `Bearer ${this.get('session').get('session.content.authenticated.access_token')}`
      }
    }).then((raw) => {
      return raw.json().then((data) => {
        const currentUser = this.store.push(data);
        this.set('session.currentUser', currentUser);


        const socketService = this.get('phoenixSocket');
        const session = this.get('session');

        const host = config.DS.host;

        console.log(host);

        const socket = socketService.connect('ws://localhost:4000', {token: session.get('data.authenticated.access_token')});

        let room = socket.channel("rooms:lobby", {});
        room.join().receive("ok", () => {
          console.log("Welcome to Phoenix Chat!");
        });
        room.on( "new:message", msg => alert(msg) )
      });
    });
  }
});