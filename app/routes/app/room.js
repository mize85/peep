import Ember from "ember";

const {inject, RSVP: {hash}} = Ember;

export default Ember.Route.extend({
  flashMessages: inject.service(),
  phoenixSocket: inject.service(),

  roomSocket: null,

  actions: {
    sendMessage() {
      const msg = this.get('currentModel.newMessage');

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

    let room = socketService.joinChannel(`room:${model.room.get('name')}`, {}, (msg) => {
      console.log(msg)
    });

    this.set("roomSocket", room);

    room.on("new:msg", payload => {
      const msg = this.store.push(payload);
      this.get('currentModel.room.messages').addObject(msg);
    });
  }
});