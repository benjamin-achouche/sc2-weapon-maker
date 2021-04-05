const { attributesAdrs, soulChargeAdrs } = require('../../data/addresses');

const { soulChargeAdrsVal } = require('../../data/addressesValues');

const writeSCCharging = (codeArray, weapon) => {
  let SCChargingCodeArray = [];
  let SCChargingCount = 0;

  if (weapon.SCState.value.always === null) {
    for (let i = 1; i <= 3; i++) {
      SCChargingCodeArray = [];
      SCChargingCount = 0;

      for (const attr in weapon) {
        if (
          attr !== 'selfGuardPiercing' &&
          attr !== 'lifeHit' &&
          attr !== 'lifeVampire' &&
          attr !== 'enemyDamageReflection' &&
          attr !== 'SCState'
        ) {
          if ('chargingSC' in weapon[attr].value) {
            if (
              weapon[attr].value.chargingSC !== null &&
              typeof weapon[attr].value.chargingSC === 'string'
            ) {
              SCChargingCount++;
              SCChargingCodeArray.push(
                `${attributesAdrs[attr]} ${weapon[attr].value.chargingSC}`
              );
            } else if (
              weapon[attr].value.chargingSC !== null &&
              typeof weapon[attr].value.chargingSC === 'object' &&
              weapon[attr].value.chargingSC[1] !== null
            ) {
              SCChargingCount++;
              SCChargingCodeArray.push(
                `${attributesAdrs[attr]} ${weapon[attr].value.chargingSC[i]}`
              );
            }
          }
        }
      }
      if (SCChargingCount === 0) {
        break;
      } else if (SCChargingCount === 1) {
        codeArray.push(`08${soulChargeAdrs} ${soulChargeAdrsVal.charging[i]}`);
        codeArray.push(SCChargingCodeArray[0]);
      } else if (SCChargingCount === 2) {
        codeArray.push(`48${soulChargeAdrs} ${soulChargeAdrsVal.charging[i]}`);
        codeArray.push(SCChargingCodeArray[0], SCChargingCodeArray[1]);
      } else if (SCChargingCount > 2) {
        codeArray.push(`88${soulChargeAdrs} ${soulChargeAdrsVal.charging[i]}`);
        for (const SCChargingCode of SCChargingCodeArray) {
          codeArray.push(SCChargingCode);
        }
        codeArray.push('00000000 40000000');
      }
    }
  }
};

module.exports.writeSCCharging = writeSCCharging;
