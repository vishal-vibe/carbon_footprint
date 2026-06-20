// ==========================================================================
// EcoStep Carbon Calculation Unit Tests
// ==========================================================================

const assert = require('assert');
const carbonCalc = require('./public/utils.js');

console.log("Running Carbon Calculation Unit Tests...");

try {
  // Test Transport calculations
  console.log("Testing calculateTransport...");
  assert.strictEqual(carbonCalc.calculateTransport(0), 0);
  assert.strictEqual(carbonCalc.calculateTransport(-5), 0);
  assert.strictEqual(carbonCalc.calculateTransport(2.5), 2.0); // 2.5 * 0.20 * 4 = 2.0
  assert.strictEqual(carbonCalc.calculateTransport(10), 8.0);  // 10 * 0.20 * 4 = 8.0

  // Test Energy calculations
  console.log("Testing calculateEnergy...");
  assert.strictEqual(carbonCalc.calculateEnergy(0), 0);
  assert.strictEqual(carbonCalc.calculateEnergy(-2), 0);
  assert.strictEqual(carbonCalc.calculateEnergy(5), 52.5); // 5 * 0.35 * 30 = 52.5
  assert.strictEqual(carbonCalc.calculateEnergy(10), 105.0); // 10 * 0.35 * 30 = 105.0

  // Test Diet calculations
  console.log("Testing calculateDiet...");
  assert.strictEqual(carbonCalc.calculateDiet(0), 0);
  assert.strictEqual(carbonCalc.calculateDiet(-1.5), 0);
  assert.strictEqual(carbonCalc.calculateDiet(3.5), 157.5); // 3.5 * 1.5 * 30 = 157.5
  assert.strictEqual(carbonCalc.calculateDiet(2), 90.0);   // 2 * 1.5 * 30 = 90.0

  // Test Waste calculations
  console.log("Testing calculateWaste...");
  assert.strictEqual(carbonCalc.calculateWaste(0), 0);
  assert.strictEqual(carbonCalc.calculateWaste(-3), 0);
  assert.strictEqual(carbonCalc.calculateWaste(2), 24.0); // 2 * 3.0 * 4 = 24.0
  assert.strictEqual(carbonCalc.calculateWaste(5), 60.0); // 5 * 3.0 * 4 = 60.0

  console.log("\n✅ SUCCESS: All 16 unit test assertions passed successfully!");
  process.exit(0);
} catch (error) {
  console.error("\n❌ FAILURE: An assertion failed!");
  console.error(error);
  process.exit(1);
}
