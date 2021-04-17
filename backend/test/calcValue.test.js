const expect = require('chai').expect;

const { calcValue } = require('../ar-code/util/helper/makeCode/calcValue');

let weapon;
let defaultAttr;
let otherAttr;
let SCSpeedCorrector;
let SCLifeCorrector;
let forceCalc = false;
let selfPctHP = null;
let enemyPctHP = null;
let attrType = null;
let SCLvl = 3;

describe('calcValue', () => {
  it('should return null', () => {
    otherAttr = 0;
    forceCalc = false;

    expect(
      calcValue(
        weapon,
        defaultAttr,
        otherAttr,
        SCSpeedCorrector,
        SCLifeCorrector,
        forceCalc
      )
    ).to.equal(null);
  });

  it('should return 6, 9 or 15', () => {
    weapon = {
      defense: {
        value: {
          activeSC: {
            1: 2,
            2: 3,
            3: null,
          },
          default: 5,
        },
      },
    };
    defaultAttr = 3;
    otherAttr = 3;
    attrType = 'selfGuardPiercing';
    SCLvl = Math.ceil(3 * Math.random());

    expect(
      calcValue(
        weapon,
        defaultAttr,
        otherAttr,
        SCSpeedCorrector,
        SCLifeCorrector,
        forceCalc,
        selfPctHP,
        enemyPctHP,
        attrType,
        SCLvl
      )
    ).to.equal(
      weapon.defense.value.activeSC[SCLvl] !== null
        ? defaultAttr * weapon.defense.value.activeSC[SCLvl]
        : defaultAttr * weapon.defense.value.default
    );
  });

  it('should return 8, 15 or 30', () => {
    weapon = {
      attack: {
        value: {
          activeSC: {
            1: 2,
            2: 3,
            3: null,
          },
          default: 5,
        },
      },
    };
    defaultAttr = 3;
    otherAttr = 3;
    attrType = 'enemyGuardPiercing';
    SCLvl = Math.ceil(3 * Math.random());

    expect(
      calcValue(
        weapon,
        defaultAttr,
        otherAttr,
        SCSpeedCorrector,
        SCLifeCorrector,
        forceCalc,
        selfPctHP,
        enemyPctHP,
        attrType,
        SCLvl
      )
    ).to.equal(
      weapon.attack.value.activeSC[SCLvl] !== null
        ? (defaultAttr + (SCLvl * otherAttr) / 3) *
            weapon.attack.value.activeSC[SCLvl]
        : (defaultAttr + (SCLvl * otherAttr) / 3) * weapon.attack.value.default
    );
  });

  it('should return 24', () => {
    defaultAttr = 3;
    otherAttr = 3;
    SCLifeCorrector = 1;
    selfPctHP = 2;
    enemyPctHP = 2;
    attrType = 'lifeContinuous';
    SCLvl = 2;

    expect(
      calcValue(
        weapon,
        defaultAttr,
        otherAttr,
        SCSpeedCorrector,
        SCLifeCorrector,
        forceCalc,
        selfPctHP,
        enemyPctHP,
        attrType,
        SCLvl
      )
    ).to.equal(
      (defaultAttr + (SCLvl * otherAttr) / 3 + SCLifeCorrector) *
        selfPctHP *
        enemyPctHP
    );
  });
});
