export function initialize(application) {
  application.inject('route', 'flashMessages', 'service:notification-messages');
  application.inject('controller', 'flashMessages', 'service:notification-messages');
}

export default {
  name: 'inject-notifications',
  initialize
};
