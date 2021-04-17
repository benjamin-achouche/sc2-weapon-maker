const { setAttributeValues } = require('./setAttributeValues');
const { floatToHexConverter } = require('./floatToHexConverter');

const { selfPercentHP, enemyPercentHP } = require('../../data/ingameValues');

const setWeaponAsFloat = (weapon, attrData, weaponName) => {
  setAttributeValues(
    weapon,
    1,
    weaponName,
    weapon.attack.value,
    'attack',
    attrData,
    null,
    enemyPercentHP,
    'SCAttack',
    'lessHealthMoreAttack'
  );

  setAttributeValues(
    weapon,
    1,
    weaponName,
    weapon.defense.value,
    'defense',
    attrData,
    selfPercentHP,
    null,
    'SCDefense',
    'lessHealthMoreDefense'
  );

  setAttributeValues(
    weapon,
    1,
    weaponName,
    weapon.speed.value,
    'speed',
    attrData,
    null,
    null,
    'SCSpeed',
    'lessHealthMoreSpeed',
    'SCChargeSpeed'
  );

  setAttributeValues(
    weapon,
    1,
    weaponName,
    weapon.selfGuardPiercing.value,
    'selfGuardPiercing',
    attrData,
    selfPercentHP
  );

  setAttributeValues(
    weapon,
    1,
    weaponName,
    weapon.enemyGuardPiercing.value,
    'enemyGuardPiercing',
    attrData,
    null,
    enemyPercentHP,
    'SCEnemyGuardPiercing'
  );

  setAttributeValues(
    weapon,
    1,
    weaponName,
    weapon.enemyDamageReflection.value,
    'enemyDamageReflection',
    attrData
  );

  setAttributeValues(
    weapon,
    weapon.speed.value.chargingSC,
    weaponName,
    weapon.lifeContinuous.value,
    'lifeContinuous',
    attrData,
    selfPercentHP,
    null,
    'SCLifeContinuous',
    'lessHealthMoreLifeCont',
    'SCChargeLifeContinuous'
  );

  setAttributeValues(
    weapon,
    1,
    weaponName,
    weapon.lifeHit.value,
    'lifeHit',
    attrData,
    selfPercentHP
  );

  setAttributeValues(
    weapon,
    1,
    weaponName,
    weapon.lifeVampire.value,
    'lifeVampire',
    attrData
  );

  // SC - Life Bar
  weapon.SCState.value.HP.health = attrData.lessHealthSCLvUp.health;
  if (weapon.SCState.value.HP.health) {
    weapon.SCState.value.HP.health = weapon.SCState.value.HP.health.map(
      (health) => floatToHexConverter(health)
    );
  }
  weapon.SCState.value.HP.SCLvl = attrData.lessHealthSCLvUp.SCLvl;

  // SC - Type
  weapon.SCState.value.always = attrData.SCType;
};

const convertWeaponToHex = (weapon) => {
  for (const attr in weapon) {
    if (attr !== 'SCState') {
      weapon[attr].value.default = floatToHexConverter(
        weapon[attr].value.default
      );
      if (
        weapon[attr].value.activeSC &&
        weapon[attr].value.activeSC[1] !== null
      ) {
        for (let i = 1; i <= 3; i++) {
          weapon[attr].value.activeSC[i] = floatToHexConverter(
            weapon[attr].value.activeSC[i]
          );
        }
      }
      if (attr === 'defense' && weapon[attr].value.chargingSC[1] !== null) {
        for (let i = 1; i <= 3; i++) {
          weapon[attr].value.chargingSC[i] = floatToHexConverter(
            weapon[attr].value.chargingSC[i]
          );
        }
      } else if (
        attr !== 'defense' &&
        'chargingSC' in weapon[attr].value &&
        weapon[attr].value.chargingSC !== null
      ) {
        weapon[attr].value.chargingSC = floatToHexConverter(
          weapon[attr].value.chargingSC
        );
      }
      if (weapon[attr].value.HP) {
        if (weapon[attr].value.HP.default.length > 0) {
          for (let i = 0; i < weapon[attr].value.HP.default.length; i++) {
            weapon[attr].value.HP.default[i] = floatToHexConverter(
              weapon[attr].value.HP.default[i]
            );
          }
        }
        if (weapon[attr].value.HP.activeSC[1].length > 0) {
          for (let i = 1; i <= 3; i++) {
            for (let j = 0; j < weapon[attr].value.HP.activeSC[i].length; j++) {
              weapon[attr].value.HP.activeSC[i][j] = floatToHexConverter(
                weapon[attr].value.HP.activeSC[i][j]
              );
            }
          }
        }
        if (weapon[attr].value.HP.chargingSC) {
          if (
            attr === 'defense' &&
            weapon[attr].value.HP.chargingSC[1].length > 0
          ) {
            for (let i = 1; i <= 3; i++) {
              for (
                let j = 0;
                j < weapon[attr].value.HP.chargingSC[i].length;
                j++
              ) {
                weapon[attr].value.HP.chargingSC[i][j] = floatToHexConverter(
                  weapon[attr].value.HP.chargingSC[i][j]
                );
              }
            }
          } else if (
            attr !== 'defense' &&
            weapon[attr].value.HP.chargingSC.length > 0
          ) {
            for (let i = 0; i < weapon[attr].value.HP.chargingSC.length; i++) {
              weapon[attr].value.HP.chargingSC[i] = floatToHexConverter(
                weapon[attr].value.HP.chargingSC[i]
              );
            }
          }
        }
      }
    }
  }
};

module.exports.setWeaponAsFloat = setWeaponAsFloat;
module.exports.convertWeaponToHex = convertWeaponToHex;
