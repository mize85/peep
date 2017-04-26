import Ember from "ember";

const {inject: {service}, RSVP: {hash}, $, run} = Ember;

export default Ember.Route.extend({
  flashMessages: service('notification-messages'),
  phoenixSocket: service(),
  ajax: service(),

  actions: {
    sendMessage() {
      const msg = this.get('currentModel.newMessage');

      const messageRecord = this.store.createRecord('message', {
        body: msg,
        room: this.get('currentModel.room')
      });

      const serialized = messageRecord.serialize();

      this.get('ajax').request(`/messages`, {
        method: 'POST',
        data: serialized
      }).then(() => {
        this.set('currentModel.newMessage', '');
        this._scrollBottom();
      }).catch(() => {
        this.get('flashMessages').error('problem posting message');
      }).finally(() => {
        messageRecord.unloadRecord();
      });
    },

    scrollBottom(){
      this._scrollBottom();
    }
  },
  model() {
    return hash({
      room: this._super(...arguments),
      newMessage: ''
    });
  },

  _scrollBottom(){
    $('.app--room').first().animate({ scrollTop: $('.app--room').first()[0].scrollHeight }, 250);
  },

  afterModel(model){
    this._super(...arguments);

    run.scheduleOnce('afterRender', () => {
      run.later(this, this._scrollBottom, 200);
    });

    // setup socket
    const socketService = this.get('phoenixSocket');

    let room = socketService.joinChannel(`room:${model.room.get('name')}`, {}, (msg) => {
      console.log(msg);
    });

    room.on("new:msg", payload => {
      const msg = this.store.push(payload);
      this.get('currentModel.room.messages').addObject(msg);
      this._scrollBottom();
    });
  }
});
