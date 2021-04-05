const { attributesAdrs, soulChargeAdrs } = require('../../data/addresses');
const { soulChargeAdrsVal } = require('../../data/addressesValues');

const writeSCActive = (codeArray, weapon) => {
  let SCActiveCodeArray = [];
  let SCActiveCount = 0;

  for (let i = 1; i <= 3; i++) {
    SCActiveCodeArray = [];
    SCActiveCount = 0;

    for (const attr in weapon) {
      if (
        attr !== 'selfGuardPiercing' &&
        attr !== 'lifeHit' &&
        attr !== 'lifeVampire' &&
        attr !== 'enemyDamageReflection' &&
        attr !== 'SCState'
      ) {
        if (
          'activeSC' in weapon[attr].value &&
          weapon[attr].value.activeSC[1] !== null
        ) {
          SCActiveCount++;
          SCActiveCodeArray.push(
            `${attributesAdrs[attr]} ${weapon[attr].value.activeSC[i]}`
          );
        }
      }
    }
    if (SCActiveCount === 0) {
      break;
    } else if (SCActiveCount === 1) {
      codeArray.push(`08${soulChargeAdrs} ${soulChargeAdrsVal.active[i]}`);
      codeArray.push(SCActiveCodeArray[0]);
    } else if (SCActiveCount === 2) {
      codeArray.push(`48${soulChargeAdrs} ${soulChargeAdrsVal.active[i]}`);
      codeArray.push(SCActiveCodeArray[0], SCActiveCodeArray[1]);
    } else if (SCActiveCount > 2) {
      codeArray.push(`88${soulChargeAdrs} ${soulChargeAdrsVal.active[i]}`);
      for (const SCActiveCode of SCActiveCodeArray) {
        codeArray.push(SCActiveCode);
      }
      codeArray.push('00000000 40000000');
    }
  }
};

module.exports.writeSCActive = writeSCActive;
