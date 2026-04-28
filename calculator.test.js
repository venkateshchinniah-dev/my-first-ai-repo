const assert = require('assert');
const { add, subtract } = require('./calculator');

assert.strictEqual(add(2, 3), 5, '2 + 3 should equal 5');
assert.strictEqual(add(-1, 1), 0, '-1 + 1 should equal 0');
assert.strictEqual(add(0, 0), 0, '0 + 0 should equal 0');
assert.strictEqual(add(2.5, 1.5), 4, '2.5 + 1.5 should equal 4');

assert.strictEqual(subtract(3, 2), 1, '3 - 2 should equal 1');
assert.strictEqual(subtract(0, 5), -5, '0 - 5 should equal -5');
assert.strictEqual(subtract(-2, -3), 1, '-2 - -3 should equal 1');
assert.strictEqual(subtract(2.5, 1.5), 1, '2.5 - 1.5 should equal 1');

console.log('calculator.add and calculator.subtract tests passed');
