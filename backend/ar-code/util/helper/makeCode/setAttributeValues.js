const { calcValue } = require('./calcValue');
const {
  resetHPArrays,
  fillHPArrays,
  fillDefenseHPArrays,
} = require('./manageHPArrays');

const {
  baseSpeed,
  ingameWeaponForcedSCSpeed,
  ingameWeaponForcedSCLife,
} = require('../../data/ingameValues');

const { weapon } = require('../../data/weapon');

const setDefenseAttributeValues = (
  attribute,
  attrData,
  selfPctHP,
  SCActive,
  lessHealth
) => {
  if (attrData[SCActive]) {
    for (let i = 1; i <= 3; i++) {
      attribute.activeSC[i] =
        selfPctHP /
        calcValue(
          attribute.default,
          attrData[SCActive],
          1,
          0,
          false,
          null,
          null,
          null,
          i
        );
      attribute.chargingSC[i] =
        selfPctHP /
        calcValue(
          attribute.default,
          attrData[SCActive],
          1,
          0,
          false,
          null,
          null,
          null,
          i
        );
    }
  }

  resetHPArrays(attribute.HP, 'defense');
  fillDefenseHPArrays(attrData[lessHealth], attribute, selfPctHP, null);

  attribute.default = selfPctHP / attribute.default;
};

const setAttributeValues = (
  chargingSCSpeedMultiplier,
  weaponName,
  attribute,
  attrType,
  attrData,
  selfPctHP = null,
  enemyPctHP = null,
  SCActive = null,
  lessHealth = null,
  SCCharging = null
) => {
  let SCSpeedCorrector = 1;
  let SCLifeCorrector = 0;
  let forceCalculationSCSpeed = false;
  let forceCalculationSCLife = false;
  chargingSCSpeedMultiplier =
    chargingSCSpeedMultiplier === null ? 1 : chargingSCSpeedMultiplier;
  attribute.default = attrData[attrType];

  if (attrType === 'defense') {
    setDefenseAttributeValues(
      attribute,
      attrData,
      selfPctHP,
      SCActive,
      lessHealth
    );
    return;
  }

  selfPctHP = selfPctHP === null ? 1 : selfPctHP;
  enemyPctHP = enemyPctHP === null ? 1 : enemyPctHP;

  if (attrType === 'speed') {
    if (
      ingameWeaponForcedSCSpeed.increasedSpeed.find(
        (name) => name === weaponName
      )
    ) {
      SCSpeedCorrector = 1 / 1.1;
    } else if (
      ingameWeaponForcedSCSpeed.decreasedSpeed.find(
        (name) => name === weaponName
      )
    ) {
      SCSpeedCorrector = 1.1;
    }
    attribute.default *= baseSpeed;
  }

  if (attrType === 'lifeContinuous') {
    if (
      ingameWeaponForcedSCLife.increasedLife.find((name) => name === weaponName)
    ) {
      SCLifeCorrector = -24 / 60 / selfPctHP / enemyPctHP;
    } else if (
      ingameWeaponForcedSCLife.decreasedLife.find((name) => name === weaponName)
    ) {
      SCLifeCorrector = 12 / 60 / selfPctHP / enemyPctHP;
    }
  }

  if (
    attrData[SCActive] ||
    SCSpeedCorrector !== 1 ||
    (attrType === 'selfGuardPiercing' && weapon.defense.value.activeSC[1]) ||
    (attrType === 'enemyGuardPiercing' && weapon.attack.value.activeSC[1])
  ) {
    if (
      SCSpeedCorrector !== 1 ||
      (attrType === 'selfGuardPiercing' && weapon.defense.value.activeSC[1]) ||
      (attrType === 'enemyGuardPiercing' && weapon.attack.value.activeSC[1])
    ) {
      forceCalculationSCSpeed = true;
    }
    for (let i = 1; i <= 3; i++) {
      attribute.activeSC[i] = calcValue(
        attribute.default,
        attrData[SCActive],
        SCSpeedCorrector,
        0,
        forceCalculationSCSpeed,
        selfPctHP,
        enemyPctHP,
        attrType,
        i
      );
    }
  }

  if (attrData[SCCharging] || SCLifeCorrector !== 0) {
    if (SCLifeCorrector !== 0) {
      forceCalculationSCLife = true;
    }
    attribute.chargingSC = calcValue(
      attribute.default,
      attrData[SCCharging] * chargingSCSpeedMultiplier,
      1,
      SCLifeCorrector,
      forceCalculationSCLife,
      selfPctHP,
      enemyPctHP,
      attrType
    );
  }

  attribute.HP ? resetHPArrays(attribute.HP) : null;
  if (attrData[lessHealth]) {
    fillHPArrays(
      attrData[lessHealth],
      attribute,
      SCSpeedCorrector,
      selfPctHP,
      enemyPctHP,
      attrType
    );
  }

  if (attrType === 'selfGuardPiercing') {
    attribute.default *= weapon.defense.value.default;
  } else if (attrType === 'enemyGuardPiercing') {
    attribute.default *= weapon.attack.value.default;
  } else {
    attribute.default *= selfPctHP * enemyPctHP;
  }
};

module.exports.setAttributeValues = setAttributeValues;
