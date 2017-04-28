import { moduleFor, test } from 'ember-qunit';

moduleFor('route:app/room', 'Unit | Route | app/room', {
  // Specify the other units that are required for this test.
  needs: ['service:session', 'service:phoenixSocket', 'service:ajax']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
