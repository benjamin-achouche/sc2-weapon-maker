const expect = require('chai').expect;

const {
  fillHPArrays,
  fillDefenseHPArrays,
} = require('../ar-code/util/helper/makeCode/manageHPArrays');

let weapon;
let attrDataHPObj;
let attribute;
let SCSpeedCorrector;
let selfPctHP;
let enemyPctHP;
let attrType;

describe('fillHPArrays', () => {
  it('should return undefined', () => {
    attrDataHPObj = 0;

    expect(fillHPArrays(weapon, attrDataHPObj)).to.equal(undefined);
  });
});

describe('fillDefenseHPArrays', () => {
  it('should return undefined', () => {
    attrDataHPObj = 0;

    expect(fillDefenseHPArrays(weapon, attrDataHPObj)).to.equal(undefined);
  });
});
