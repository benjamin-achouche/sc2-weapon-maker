const attack = {
  default: {
    1: 1 / 1.5,
    2: 1 / 1.25,
    3: 1 / 1.125,
    4: 1,
    5: 1.1,
    6: 1.2,
    7: 1.3,
    8: 1.5,
  },
  activeSC: {
    1: 0,
    2: 0.1,
    3: 0.25,
    4: 0.5,
  },
};

const defense = {
  default: {
    1: 1 / 1.5,
    2: 1 / 1.25,
    3: 1 / 1.125,
    4: 1,
    5: 1.1,
    6: 1.2,
    7: 1.3,
    8: 1.5,
  },
  activeSC: {
    1: 0,
    2: 0.1,
    3: 0.25,
    4: 0.5,
  },
  chargingSC: {
    1: 0,
    2: 0.1,
    3: 0.25,
    4: 0.5,
  },
};

const speed = {
  default: {
    1: 1 / 1.25,
    2: 1 / 1.125,
    3: 1,
    4: 1.125,
    5: 1.25,
  },
  activeSC: {
    1: -0.25,
    2: -0.125,
    3: 0,
    4: 0.125,
    5: 0.25,
  },
  chargingSC: {
    1: -0.5,
    2: -0.25,
    3: 0,
    4: 0.25,
    5: 0.5,
  },
};

const selfGuardPiercing = {
  1: 1,
  2: 0.5,
  3: 0.4,
  4: 0.3,
  5: 0.2,
  6: 0.1,
  7: 0,
};

const enemyGuardPiercing = {
  default: {
    1: 0,
    2: 0.1,
    3: 0.2,
    4: 0.3,
    5: 0.4,
    6: 0.5,
  },
  activeSC: {
    1: 0,
    2: 0.1,
    3: 0.25,
    4: 0.5,
  },
};

const enemyDamageReflection = {
  1: 0,
  2: 0.08,
  3: 0.15,
  4: 0.25,
};

const lifeContinuous = {
  1: -7.5 / 60,
  2: -5 / 60,
  3: -2.5 / 60,
  4: 0,
  5: 2.5 / 60,
  6: 5 / 60,
  7: 7.5 / 60,
};

const lifeHit = {
  1: 4.5,
  2: 3,
  3: 1.5,
  4: 0,
  5: -1.5,
  6: -3,
  7: -4.5,
};

const lifeVampire = {
  1: 0,
  2: 0.08,
  3: 0.15,
  4: 0.25,
};

const lessHealthMoreAttack = {
  1: 0,
  2: 0.25,
  3: 0.5,
  4: 1,
};

const lessHealthMoreDefense = {
  1: 0,
  2: 0.25,
  3: 0.5,
  4: 1,
};

const lessHealthMoreSpeed = {
  1: 0,
  2: 0.125,
  3: 0.25,
  4: 0.5,
};

const lessHealthMoreLifeCont = {
  1: 0,
  2: 5 / 60,
  3: 10 / 60,
  4: 15 / 60,
};

const lessHealthSCLvUp = {
  1: { health: null, SCLvl: null },
  2: { health: [240 / 2], SCLvl: ['00000006'] },
  3: { health: [(2 * 240) / 3, 240 / 3], SCLvl: ['00000006', '00000005'] },
  4: {
    health: [(3 * 240) / 4, (2 * 240) / 4, 240 / 4],
    SCLvl: ['00000006', '00000005', '00000004'],
  },
};

const SCLifeContinuous = {
  activeSC: {
    1: -7.5 / 60,
    2: -3.75 / 60,
    3: 0,
    4: 3.75 / 60,
    5: 7.5 / 60,
  },
  chargingSC: {
    1: -15 / 60,
    2: -7.5 / 60,
    3: 0,
    4: 7.5 / 60,
    5: 15 / 60,
  },
};

const SCType = {
  1: null,
  2: null,
  3: '00000006',
  4: '00000005',
  5: '00000004',
};

module.exports.attackVal = attack;
module.exports.defenseVal = defense;
module.exports.speedVal = speed;
module.exports.selfGuardPiercingVal = selfGuardPiercing;
module.exports.enemyGuardPiercingVal = enemyGuardPiercing;
module.exports.enemyDamageReflectionVal = enemyDamageReflection;
module.exports.lifeContinuousVal = lifeContinuous;
module.exports.lifeHitVal = lifeHit;
module.exports.lifeVampireVal = lifeVampire;

module.exports.lessHealthMoreAttackVal = lessHealthMoreAttack;
module.exports.lessHealthMoreDefenseVal = lessHealthMoreDefense;
module.exports.lessHealthMoreSpeedVal = lessHealthMoreSpeed;
module.exports.lessHealthMoreLifeContVal = lessHealthMoreLifeCont;

module.exports.lessHealthSCLvUpVal = lessHealthSCLvUp;
module.exports.SCLifeContinuousVal = SCLifeContinuous;
module.exports.SCTypeVal = SCType;
