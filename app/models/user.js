import DS from 'ember-data';
import Ember from 'ember';

const {attr, hasMany} = DS;
const {computed} = Ember;

export default DS.Model.extend({
  email: attr('string'),
  password: attr('string'),
  passwordConfirmation: attr('string'),
  avatar: attr('file'),
  rooms: hasMany('room'),
  messages: hasMany('message'),


  avatarUrl: computed('avatar.file_name', function(){
    return this.get('avatar.file_name') ? `/uploads/${this.get('avatar.file_name')}` : null;
  })
});
