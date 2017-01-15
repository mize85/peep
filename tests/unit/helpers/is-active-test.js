
import { isActive } from 'peep/helpers/is-active';
import { module, test } from 'qunit';

module('Unit | Helper | is active');

// Replace this with your real tests.
test('it works', function(assert) {
  let result = isActive(['index', 'index']);
  assert.equal(result, true);

  result = isActive(['index', 'notIndex']);
  assert.equal(result, false);
});

