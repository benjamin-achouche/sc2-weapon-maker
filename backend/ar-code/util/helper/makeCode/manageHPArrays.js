const { HPAdrsVal } = require('../../data/addressesValues');

const { calcValue } = require('./calcValue');

const resetHPArrays = (attrHPObj, attrType) => {
  attrHPObj.default = [];

  if (attrHPObj.activeSC) {
    for (let i = 1; i <= 3; i++) {
      attrHPObj.activeSC[i] = [];
    }
  }

  if (attrHPObj.chargingSC) {
    if (attrType === 'defense') {
      for (let i = 1; i <= 3; i++) {
        attrHPObj.chargingSC[i] = [];
      }
    } else {
      attrHPObj.chargingSC = [];
    }
  }
};

const fillHPArrays = (
  attrDataHPObj,
  attribute,
  SCSpeedCorrector,
  selfPctHP,
  enemyPctHP,
  attrType
) => {
  if (attrDataHPObj === 0) {
    return;
  }

  selfPctHP = selfPctHP === null ? 1 : selfPctHP;
  enemyPctHP = enemyPctHP === null ? 1 : enemyPctHP;

  for (let i = 0; i < HPAdrsVal.length; i++) {
    attribute.HP.default.push(
      calcValue(
        attribute.default,
        (i * attrDataHPObj) / (HPAdrsVal.length - 1),
        1,
        0,
        true,
        selfPctHP,
        enemyPctHP,
        attrType
      )
    );

    if (attribute.HP.activeSC && attribute.activeSC[1]) {
      for (let j = 1; j <= 3; j++) {
        attribute.HP.activeSC[j].push(
          SCSpeedCorrector *
            calcValue(
              attribute.activeSC[j] / selfPctHP / enemyPctHP / SCSpeedCorrector,
              (i * attrDataHPObj) / (HPAdrsVal.length - 1),
              1,
              0,
              true,
              selfPctHP,
              enemyPctHP,
              attrType
            )
        );
      }
    }

    if (attribute.HP.chargingSC && attribute.chargingSC) {
      attribute.HP.chargingSC.push(
        calcValue(
          attribute.chargingSC / selfPctHP / enemyPctHP,
          (i * attrDataHPObj) / (HPAdrsVal.length - 1),
          1,
          0,
          true,
          selfPctHP,
          enemyPctHP,
          attrType
        )
      );
    }
  }
};

const fillDefenseHPArrays = (
  attrDataHPObj,
  attribute,
  selfPctHP,
  enemyPctHP
) => {
  if (attrDataHPObj === 0) {
    return;
  }

  selfPctHP = selfPctHP === null ? 1 : selfPctHP;
  enemyPctHP = enemyPctHP === null ? 1 : enemyPctHP;

  for (let i = 0; i < HPAdrsVal.length; i++) {
    attribute.HP.default.push(
      selfPctHP ** 2 /
        calcValue(
          attribute.default,
          (i * attrDataHPObj) / (HPAdrsVal.length - 1),
          1,
          0,
          true,
          selfPctHP,
          enemyPctHP
        )
    );

    if (attribute.HP.activeSC && attribute.activeSC[1]) {
      for (let j = 1; j <= 3; j++) {
        attribute.HP.activeSC[j].push(
          calcValue(
            attribute.activeSC[j] / selfPctHP / enemyPctHP,
            -(i * attrDataHPObj) / (HPAdrsVal.length - 1),
            1,
            0,
            true,
            selfPctHP,
            enemyPctHP
          )
        );
      }
    }

    if (attribute.HP.chargingSC && attribute.chargingSC[1]) {
      for (let j = 1; j <= 3; j++) {
        attribute.HP.chargingSC[j].push(
          calcValue(
            attribute.chargingSC[j] / selfPctHP / enemyPctHP,
            -(i * attrDataHPObj) / (HPAdrsVal.length - 1),
            1,
            0,
            true,
            selfPctHP,
            enemyPctHP
          )
        );
      }
    }
  }
};

module.exports.resetHPArrays = resetHPArrays;
module.exports.fillHPArrays = fillHPArrays;
module.exports.fillDefenseHPArrays = fillDefenseHPArrays;
