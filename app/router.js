import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('auth', function() {
    this.route('login');
    this.route('register');
  });
  this.route('users', function() {
    this.route('detail', {
      path: '/:user_id'
    });
  });

  this.route('app', function() {
    this.route('room', {
      path: 'room/:room_id'
    }, function() {});
  });

});

export default Router;
