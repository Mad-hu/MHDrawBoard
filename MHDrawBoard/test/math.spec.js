const {assert} = require('chai');
const math = require('../lib/math')

describe('math', function () {
  describe('#cube()', function () {
    it('should return true cube(2)', function () {
      assert.equal(math.cube(2), 8);
    });
  });
});