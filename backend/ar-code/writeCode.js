const { writeStatic } = require('./util/helper/writeCode/writeStatic');
const { writeSCInactive } = require('./util/helper/writeCode/writeSCInactive');
const { writeSCCharging } = require('./util/helper/writeCode/writeSCCharging');
const { writeSCActive } = require('./util/helper/writeCode/writeSCActive');
const { writeHP } = require('./util/helper/writeCode/writeHP');
const { writeSCState } = require('./util/helper/writeCode/writeSCState');

const writeCode = (weapon, weaponData) => {
  const codeArray = [];

  writeStatic(codeArray, weapon, weaponData);
  writeSCInactive(codeArray, weapon);
  writeSCCharging(codeArray, weapon);
  writeSCActive(codeArray, weapon);
  writeHP(codeArray, weapon);
  writeSCState(codeArray, weapon);

  return codeArray.join('\r\n');
};

module.exports.writeCode = writeCode;
