const { attributesAdrs, soulChargeAdrs } = require('../../data/addresses');
const { soulChargeAdrsVal } = require('../../data/addressesValues');

const writeSCInactive = (codeArray, weapon) => {
  codeArray.push(`88${soulChargeAdrs} ${soulChargeAdrsVal.inactive}`);

  for (const attr in weapon) {
    if (
      attr !== 'selfGuardPiercing' &&
      attr !== 'lifeHit' &&
      attr !== 'lifeVampire' &&
      attr !== 'enemyDamageReflection' &&
      attr !== 'SCState'
    ) {
      codeArray.push(`${attributesAdrs[attr]} ${weapon[attr].value.default}`);
    }
  }
  codeArray.push('00000000 40000000');
};

module.exports.writeSCInactive = writeSCInactive;
