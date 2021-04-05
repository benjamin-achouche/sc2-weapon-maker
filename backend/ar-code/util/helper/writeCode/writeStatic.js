const { attributesAdrs, charactersAdrs } = require('../../data/addresses');
const {
  charactersAdrsVal,
  siegfriedCostumeAdrsVal,
} = require('../../data/addressesValues');

const writeStatic = (codeArray, weapon, weaponData) => {
  codeArray.push(
    `${charactersAdrs} ${charactersAdrsVal[weaponData.character]}`
  );
  weaponData.character === 'siegfried'
    ? codeArray.push(siegfriedCostumeAdrsVal)
    : null;
  codeArray.push(
    `${attributesAdrs.selfGuardPiercing} ${weapon.selfGuardPiercing.value.default}`
  );
  codeArray.push(`${attributesAdrs.lifeHit} ${weapon.lifeHit.value.default}`);
  codeArray.push(
    `${attributesAdrs.lifeVampire} ${weapon.lifeVampire.value.default}`
  );
  codeArray.push(
    `${attributesAdrs.enemyDamageReflection} ${weapon.enemyDamageReflection.value.default}`
  );
};

module.exports.writeStatic = writeStatic;
