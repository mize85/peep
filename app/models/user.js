import DS from 'ember-data';

const {attr, hasMany} = DS;

export default DS.Model.extend({
  email: attr('string'),
  password: attr('string'),
  passwordConfirmation: attr('string'),
  gravatar: attr('string'),
  rooms: hasMany('room'),
  messages: hasMany('message')
});
