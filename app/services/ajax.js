import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';
import config from 'peep/config/environment';

const {inject: {service}, computed} = Ember;


export default AjaxService.extend({
  host: `${config.DS.protocol}://${config.DS.host}`,
  namespace: config.DS.namespace,
  session: service(),
  headers: computed('session.authToken', {
    get() {
      let headers = {};
      const authToken = this.get('session.data.authenticated.access_token');
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }
      return headers;
    }
  })
});
