import Ember from 'ember';

const {Route} = Ember;

export default Route.extend({

  model() {
    let roomRouteModel = this.modelFor('app.room');
    return roomRouteModel.room.get('messages');
  }
});