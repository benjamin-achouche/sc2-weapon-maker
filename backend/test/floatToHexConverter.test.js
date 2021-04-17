const expect = require('chai').expect;

const {
  floatToHexConverter,
} = require('../ar-code/util/helper/makeCode/floatToHexConverter');

describe('floatToHexConverter', () => {
  it('should return 3f800000', () => {
    const value = 1;

    expect(floatToHexConverter(value)).to.equal('3f800000');
  });
});
