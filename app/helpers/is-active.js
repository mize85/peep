import Ember from 'ember';

export function isActive(params/*, hash*/) {

  const [routeName, activeRoute] = params;
  return activeRoute === routeName;
}

export default Ember.Helper.helper(isActive);
