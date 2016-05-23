var test = require('tape');

// For each unit test you write,
// answer these questions:
// what is the actual output
// what is the expected output
// what should the feature do?
//
const isOdd = (x) => x % 2 === 1;

test('isOdd', assert => {

  assert.equal(isOdd(3), true,
    '3 Should be true');
  assert.equal(isOdd(4), false,
    '4 Should be false');

  assert.end();
});