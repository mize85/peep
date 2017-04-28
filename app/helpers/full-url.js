import Ember from 'ember';
import config from 'peep/config/environment';


export function fullUrl(params/*, hash*/) {

  if(params && params[0].indexOf('http') !== -1){
    return params[0];
  }
  return  `${config.DS.protocol}://${config.DS.host}${params[0]}`;
}

export default Ember.Helper.helper(fullUrl);
