const basePercentHP = 100;
const selfPercentHP = basePercentHP / 200;
const enemyPercentHP = basePercentHP / 200;
const baseSpeed = 1;

const ingameWeaponForcedSCSpeed = {
  increasedSpeed: [
    'katzbalger cassandra',
    'masamune mitsurugi',
    'kamizoroe taki',
    'falcon maxi',
    'infernal edge necrid',
    'pakayun yoshimitsu',
    'styx cervantes',
    'gladius sophitia',
  ],
  decreasedSpeed: [
    'estoc raphael',
    'double crescent blade talim',
    'duel rod kilik',
    'war hammer astaroth',
  ],
};

const ingameWeaponForcedSCLife = {
  increasedLife: [
    'krita-yuga xianghua',
    'bulova astaroth',
    'cane of byrna link',
    'ambassador seungmina',
    'kris naga taki',
  ],
  decreasedLife: [
    'katzbalger cassandra',
    'soul calibur (evil) xianghua',
    'soul edge (complete) ivy',
    'soul edge (complete) nightmare',
    'han guang yunsung',
  ],
};

module.exports.selfPercentHP = selfPercentHP;
module.exports.enemyPercentHP = enemyPercentHP;
module.exports.baseSpeed = baseSpeed;
module.exports.ingameWeaponForcedSCSpeed = ingameWeaponForcedSCSpeed;
module.exports.ingameWeaponForcedSCLife = ingameWeaponForcedSCLife;
