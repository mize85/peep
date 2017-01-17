import Ember from 'ember';
import { Socket } from 'phoenix';






export default Ember.Service.extend({

  connect(url, options) {
    // connect the socket
    const socket = new Socket("ws://localhost:4000/socket", { params: {token: options.token} });
    socket.connect();
    return socket;
  }
});