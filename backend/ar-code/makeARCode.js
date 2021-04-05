const { weapon } = require('./util/data/weapon');

const {
  getAttributesData,
} = require('./util/helper/makeCode/getAttributesData');

const {
  resetWeaponObject,
} = require('./util/helper/makeCode/resetWeaponObject');

const {
  setWeaponAsFloat,
  convertWeaponToHex,
} = require('./util/helper/makeCode/setWeapon');

const { writeCode } = require('./writeCode');

const makeARCode = (attributes, weaponName, weaponData) => {
  const attrData = getAttributesData(attributes);

  resetWeaponObject(weapon);

  setWeaponAsFloat(weapon, attrData, weaponName);
  convertWeaponToHex(weapon);

  return writeCode(weapon, weaponData);
};

module.exports.makeARCode = makeARCode;
