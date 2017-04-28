import DS from 'ember-data';
const {attr, hasMany} = DS;

export default DS.Model.extend({
  email: attr('string'),
  firstName: attr('string'),
  lastName: attr('string'),
  password: attr('string'),
  passwordConfirmation: attr('string'),
  avatar: attr('file'),
  avatarUrl: attr('string'),
  thumbUrl: attr('string'),

  rooms: hasMany('room'),
  messages: hasMany('message')
});
