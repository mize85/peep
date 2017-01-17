import Ember from 'ember';

const { inject, RSVP: { hash } } = Ember;

export default Ember.Route.extend({
  flashMessages: inject.service(),
  phoenixSocket: inject.service(),

  actions: {
    sendMessage() {
      let msg = this.get('currentModel.newMessage');
      let messageRecord = this.store.createRecord('message', {
        body: msg,
        room: this.get('currentModel.room')
      });
      messageRecord.save().then(() => {
        this.set('currentModel.newMessage', '');
      }).catch(() => {
        this.get('flashMessages').danger('problem posting message');
      });

    }
  },
  model() {
    return hash({
      room: this._super(...arguments),
      newMessage: ''
    });
  },

  afterModel(model, transition){
    this._super(...arguments);

    // setup socket

    const socketService = this.get('phoenixSocket');
    const session = this.get('session');

    let room = socketService.joinChannel(`room:${model.room.get('name')}`, {}, () => {console.log("joined room...")});
    room.on( "new:msg", msg => {
      console.log(msg);
      this.store.createRecord('message', {
        body: msg.body,
        room: this.get('currentModel.room')
      });
    });




  }
});