const assert = require('assert');
const { divide } = require('./calculator');

// Test successful division
assert.strictEqual(divide(10, 2), 5, '10 / 2 should equal 5');

// Test division with negative numbers
assert.strictEqual(divide(-10, 2), -5, '-10 / 2 should equal -5');

// Test division resulting in a float
assert.strictEqual(divide(5, 2), 2.5, '5 / 2 should equal 2.5');

// Test dividing zero
assert.strictEqual(divide(0, 5), 0, '0 / 5 should equal 0');

// Test for division by zero
assert.throws(() => {
  divide(10, 0);
}, new Error('Cannot divide by zero'), 'Dividing by zero should throw an error');

console.log('calculator.divide tests passed');