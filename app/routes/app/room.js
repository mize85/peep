import Ember from "ember";

const {inject: {service}, RSVP: {hash}, $, run} = Ember;

export default Ember.Route.extend({
  flashMessages: service(),
  phoenixSocket: service(),

  actions: {
    sendMessage() {
      const msg = this.get('currentModel.newMessage');

      let messageRecord = this.store.createRecord('message', {
        body: msg,
        room: this.get('currentModel.room')
      });

      messageRecord.save().then(() => {
        this.set('currentModel.newMessage', '');
        this._scrollBottom();
      }).catch(() => {
        this.store.unloadRecord(messageRecord);
        this.get('flashMessages').danger('problem posting message');
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

      if(!this.store.peekRecord('message', payload.data.id)){
        const msg = this.store.push(payload);
        this.get('currentModel.room.messages').addObject(msg);
      }
      this._scrollBottom();
    });
  }
});
