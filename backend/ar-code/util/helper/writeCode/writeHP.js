const {
  attributesAdrs,
  HPAdrs,
  soulChargeAdrs,
} = require('../../data/addresses');
const { HPAdrsVal, soulChargeAdrsVal } = require('../../data/addressesValues');

const writeHP = (codeArray, weapon) => {
  let HPInactiveCodeArray = [];
  let HPActiveCodeArray = [];
  let HPChargingCodeArray = [];
  let HPCount = 0;
  let HPHasBeenWritten = false;
  let hasHPActiveSC = false;
  let hasHPChargingSCShort = false;
  let hasHPChargingSCLong = false;
  let atLeastOneHasHPActiveSC = false;
  let atLeastOneHasHPChargingSC = false;

  for (let i = 0; i < HPAdrsVal.length; i++) {
    HPInactiveCodeArray = [];
    HPChargingCodeArray = [];
    HPActiveCodeArray = [];
    HPCount = 0;
    HPHasBeenWritten = false;
    atLeastOneHasHPActiveSC = false;
    atLeastOneHasHPChargingSC = false;

    for (const attr in weapon) {
      hasHPActiveSC = false;
      hasHPChargingSCShort = false;
      hasHPChargingSCLong = false;

      if (attr !== 'SCState') {
        if ('HP' in weapon[attr].value) {
          if (weapon[attr].value.HP.default.length === 0) {
            continue;
          }

          HPCount++;

          weapon[attr].value.HP.activeSC[1].length > 0
            ? (hasHPActiveSC = true)
            : null;

          if ('chargingSC' in weapon[attr].value.HP) {
            if (Array.isArray(weapon[attr].value.HP.chargingSC)) {
              weapon[attr].value.HP.chargingSC.length > 0
                ? (hasHPChargingSCShort = true)
                : null;
            } else {
              weapon[attr].value.HP.chargingSC[1].length > 0
                ? (hasHPChargingSCLong = true)
                : null;
            }
          }
        } else {
          continue;
        }

        if (HPCount > 0) {
          HPInactiveCodeArray.push(
            `${attributesAdrs[attr]} ${weapon[attr].value.HP.default[i]}`
          );
          if (hasHPActiveSC) {
            atLeastOneHasHPActiveSC = true;
            for (let j = 1; j <= 3; j++) {
              HPActiveCodeArray.push(
                `${attributesAdrs[attr]} ${weapon[attr].value.HP.activeSC[j][i]}`
              );
            }
          }
          if (hasHPChargingSCShort) {
            atLeastOneHasHPChargingSC = true;
            for (let j = 1; j <= 3; j++) {
              HPChargingCodeArray.push(
                `${attributesAdrs[attr]} ${weapon[attr].value.HP.chargingSC[i]}`
              );
            }
          }
          if (hasHPChargingSCLong) {
            atLeastOneHasHPChargingSC = true;
            for (let j = 1; j <= 3; j++) {
              HPChargingCodeArray.push(
                `${attributesAdrs[attr]} ${weapon[attr].value.HP.chargingSC[j][i]}`
              );
            }
          }
        }
      }
    }
    if (HPCount === 0) {
      break;
    }
    !HPHasBeenWritten
      ? codeArray.push(
          `${
            HPCount > 2 || atLeastOneHasHPActiveSC || atLeastOneHasHPChargingSC
              ? i === 0
                ? '8'
                : 'A'
              : i === 0
              ? (0 + 4 * (HPCount - 1)).toString()
              : (2 + 4 * (HPCount - 1)).toString()
          }${HPAdrs} ${HPAdrsVal[i]}`
        )
      : null;
    //-----------------------------------------------------------------------------------------------
    if (HPCount === 1) {
      if (atLeastOneHasHPActiveSC || atLeastOneHasHPChargingSC) {
        codeArray.push(`08${soulChargeAdrs} ${soulChargeAdrsVal.inactive}`);
      }
      codeArray.push(HPInactiveCodeArray[0]);

      if (atLeastOneHasHPChargingSC) {
        for (let j = 1; j <= 3; j++) {
          codeArray.push(
            `08${soulChargeAdrs} ${soulChargeAdrsVal.charging[j]}`
          );
          codeArray.push(HPChargingCodeArray[j - 1]);
        }
      }

      if (atLeastOneHasHPActiveSC) {
        for (let j = 1; j <= 3; j++) {
          codeArray.push(`08${soulChargeAdrs} ${soulChargeAdrsVal.active[j]}`);
          codeArray.push(HPActiveCodeArray[j - 1]);
        }
      }
    }
    //-----------------------------------------------------------------------------------------------
    else if (HPCount >= 2) {
      if (atLeastOneHasHPActiveSC || atLeastOneHasHPChargingSC) {
        codeArray.push(`48${soulChargeAdrs} ${soulChargeAdrsVal.inactive}`);
      }
      codeArray.push(HPInactiveCodeArray[0], HPInactiveCodeArray[1]);

      if (atLeastOneHasHPChargingSC) {
        for (let j = 1; j <= 3; j++) {
          codeArray.push(
            `${HPChargingCodeArray.length < 6 ? '0' : '4'}8${soulChargeAdrs} ${
              soulChargeAdrsVal.charging[j]
            }`
          );
          codeArray.push(HPChargingCodeArray[j - 1]);
          HPChargingCodeArray.length < 6
            ? null
            : codeArray.push(HPChargingCodeArray[j + 2]);
        }
      }

      if (atLeastOneHasHPActiveSC) {
        for (let j = 1; j <= 3; j++) {
          codeArray.push(
            `${HPActiveCodeArray.length < 6 ? '0' : '4'}8${soulChargeAdrs} ${
              soulChargeAdrsVal.active[j]
            }`
          );
          codeArray.push(HPActiveCodeArray[j - 1]);
          HPActiveCodeArray.length < 6
            ? null
            : codeArray.push(HPActiveCodeArray[j + 2]);
        }
      }
    }
    //-----------------------------------------------------------------------------------------------
    if (HPCount === 3) {
      if (atLeastOneHasHPActiveSC || atLeastOneHasHPChargingSC) {
        codeArray.push(`08${soulChargeAdrs} ${soulChargeAdrsVal.inactive}`);
      }
      codeArray.push(HPInactiveCodeArray[2]);

      if (HPChargingCodeArray.length === 9) {
        for (let j = 6; j <= 8; j++) {
          codeArray.push(
            `08${soulChargeAdrs} ${soulChargeAdrsVal.charging[j - 5]}`
          );
          codeArray.push(HPChargingCodeArray[j]);
        }
      }

      if (HPActiveCodeArray.length === 9) {
        for (let j = 6; j <= 8; j++) {
          codeArray.push(
            `08${soulChargeAdrs} ${soulChargeAdrsVal.active[j - 5]}`
          );
          codeArray.push(HPActiveCodeArray[j]);
        }
      }
    } else if (HPCount === 4) {
      if (atLeastOneHasHPActiveSC || atLeastOneHasHPChargingSC) {
        codeArray.push(`48${soulChargeAdrs} ${soulChargeAdrsVal.inactive}`);
      }
      codeArray.push(HPInactiveCodeArray[2], HPInactiveCodeArray[3]);

      if (HPActiveCodeArray.length >= 9) {
        for (let j = 6; j <= 8; j++) {
          codeArray.push(
            `${HPChargingCodeArray.length < 12 ? '0' : '4'}8${soulChargeAdrs} ${
              soulChargeAdrsVal.charging[j - 5]
            }`
          );
          codeArray.push(HPChargingCodeArray[j]);
          HPChargingCodeArray.length < 12
            ? null
            : codeArray.push(HPChargingCodeArray[j + 3]);
        }
      }

      if (HPActiveCodeArray.length >= 9) {
        for (let j = 6; j <= 8; j++) {
          codeArray.push(
            `${HPActiveCodeArray.length < 12 ? '0' : '4'}8${soulChargeAdrs} ${
              soulChargeAdrsVal.active[j - 5]
            }`
          );
          codeArray.push(HPActiveCodeArray[j]);
          HPActiveCodeArray.length < 12
            ? null
            : codeArray.push(HPActiveCodeArray[j + 3]);
        }
      }
    }

    if (HPCount > 2 || atLeastOneHasHPActiveSC || atLeastOneHasHPChargingSC) {
      codeArray.push('00000000 40000000');
    }
    HPHasBeenWritten = true;
  }
};

module.exports.writeHP = writeHP;
