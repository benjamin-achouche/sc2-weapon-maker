const { HPAdrs, soulChargeAdrs } = require('../../data/addresses');

const writeSCState = (codeArray, weapon) => {
  if (weapon.SCState.value.HP.health !== null) {
    for (let i = 0; i < weapon.SCState.value.HP.health.length; i++) {
      codeArray.push(`2${HPAdrs} ${weapon.SCState.value.HP.health[i]}`);
      codeArray.push(`00${soulChargeAdrs} ${weapon.SCState.value.HP.SCLvl[i]}`);
    }
  }
  if (weapon.SCState.value.always !== null) {
    codeArray.push(`00${soulChargeAdrs} ${weapon.SCState.value.always}`);
  }
};

module.exports.writeSCState = writeSCState;
