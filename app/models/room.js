import DS from 'ember-data';

const {hasMany, belongsTo, attr} = DS;

export default DS.Model.extend({
  name: attr('string'),
  owner: belongsTo('user'),
  messages: hasMany('message'),
  insertedAt: attr('date'),
  updatedAt: attr('date')
});
