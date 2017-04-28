import Ember from "ember";
import { task, timeout } from 'ember-concurrency';

const {inject: {service}, RSVP: {hash}, $, run} = Ember;


export default Ember.Route.extend({
  phoenixSocket: service(),
  ajax: service(),


  scrollTask: task(function * () {
    yield timeout(300);
    this._scrollBottom();
  }).restartable(),

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
        this.get('scrollTask').perform();
      }).catch(() => {
        this.get('flashMessages').error('problem posting message');
      }).finally(() => {
        messageRecord.unloadRecord();
      });
    },

    scrollBottom(){
      this.get('scrollTask').perform();
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
      run.later(this, () => {
        this.get('scrollTask').perform();
      }, 200);
    });

    // setup socket
    const socketService = this.get('phoenixSocket');

    let room = socketService.joinChannel(`room:${model.room.get('name')}`, {}, (msg) => {
      this.get('flashMessages').info(msg);
    });

    room.on("new:msg", payload => {
      const msg = this.store.push(payload);
      this.get('currentModel.room.messages').addObject(msg);
      this.get('scrollTask').perform();
    });
  }
});
