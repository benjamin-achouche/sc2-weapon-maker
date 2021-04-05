const { weapon } = require('../../data/weapon');
const { floatToHexConverter } = require('./floatToHexConverter');

const calcValue = (
  defaultAttr,
  otherAttr,
  SCSpeedCorrector,
  SCLifeCorrector,
  forceCalc = false,
  selfPctHP = null,
  enemyPctHP = null,
  attrType = null,
  SCLvl = 3
) => {
  if (otherAttr === 0 && !forceCalc) {
    return null;
  }

  enemyPctHP = enemyPctHP === null ? 1 : enemyPctHP;
  selfPctHP = selfPctHP === null ? 1 : selfPctHP;

  if (attrType === 'selfGuardPiercing') {
    const factor =
      weapon.defense.value.activeSC[SCLvl] !== null
        ? weapon.defense.value.activeSC[SCLvl]
        : weapon.defense.value.default;
    return defaultAttr * factor;
  } else if (attrType === 'enemyGuardPiercing') {
    const factor =
      weapon.attack.value.activeSC[SCLvl] !== null
        ? weapon.attack.value.activeSC[SCLvl]
        : weapon.attack.value.default;
    return (defaultAttr + (SCLvl * otherAttr) / 3) * factor;
  } else if (attrType === 'lifeContinuous') {
    return (
      (defaultAttr + (SCLvl * otherAttr) / 3 + SCLifeCorrector) *
      selfPctHP *
      enemyPctHP
    );
  }

  if (defaultAttr < 1 && defaultAttr + otherAttr < 1) {
    result =
      (1 / -(-1 / defaultAttr + (SCLvl * otherAttr) / 3)) *
      selfPctHP *
      enemyPctHP *
      SCSpeedCorrector;
  } else if (defaultAttr < 1 && defaultAttr + otherAttr >= 1) {
    result =
      (-(1 / defaultAttr - 1) + (SCLvl * otherAttr) / 3 + 1) *
      selfPctHP *
      enemyPctHP *
      SCSpeedCorrector;
  } else if (defaultAttr >= 1 && defaultAttr + otherAttr < 1) {
    result =
      (1 / (-(defaultAttr - 1 + (SCLvl * otherAttr) / 3) + 1)) *
      selfPctHP *
      enemyPctHP *
      SCSpeedCorrector;
  } else if (defaultAttr >= 1 && defaultAttr + otherAttr >= 1) {
    result =
      (defaultAttr + (SCLvl * otherAttr) / 3) *
      selfPctHP *
      enemyPctHP *
      SCSpeedCorrector;
  }

  return result;
};

module.exports.calcValue = calcValue;
