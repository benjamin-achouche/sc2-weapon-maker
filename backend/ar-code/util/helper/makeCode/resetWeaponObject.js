const resetWeaponObject = (weapon) => {
  for (const attr in weapon) {
    if ('activeSC' in weapon[attr].value) {
      weapon[attr].value.activeSC = { 1: null, 2: null, 3: null };
    }
    if ('chargingSC' in weapon[attr].value) {
      if (
        weapon[attr].value.chargingSC !== null &&
        (typeof weapon[attr].value.chargingSC === 'string' ||
          typeof weapon[attr].value.chargingSC === 'number')
      ) {
        weapon[attr].value.chargingSC = null;
      } else if (
        weapon[attr].value.chargingSC !== null &&
        typeof weapon[attr].value.chargingSC === 'object'
      ) {
        weapon[attr].value.chargingSC = { 1: null, 2: null, 3: null };
      }
    }
  }
};

module.exports.resetWeaponObject = resetWeaponObject;
