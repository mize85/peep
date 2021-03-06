/**
 * Created by larsbunting on 15.01.17.
 */
import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
import config from '../config/environment';

export default OAuth2PasswordGrant.extend({
  serverTokenEndpoint: `${config.DS.protocol}://${config.DS.host}/${config.DS.namespace}/token`
});
