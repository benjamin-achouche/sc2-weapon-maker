const { attributesAdrs, soulChargeAdrs } = require('./addresses');

const weapon = {
  attack: {
    address: attributesAdrs.attack,
    value: {
      default: null,
      activeSC: {
        1: null,
        2: null,
        3: null,
      },
      HP: {
        default: [],
        activeSC: {
          1: [],
          2: [],
          3: [],
        },
      },
    },
  },
  defense: {
    address: attributesAdrs.defense,
    value: {
      default: null,
      activeSC: {
        1: null,
        2: null,
        3: null,
      },
      chargingSC: {
        1: null,
        2: null,
        3: null,
      },
      HP: {
        default: [],
        activeSC: {
          1: [],
          2: [],
          3: [],
        },
        chargingSC: {
          1: [],
          2: [],
          3: [],
        },
      },
    },
  },
  speed: {
    address: attributesAdrs.speed,
    value: {
      default: null,
      activeSC: {
        1: null,
        2: null,
        3: null,
      },
      chargingSC: null,
      HP: {
        default: [],
        activeSC: {
          1: [],
          2: [],
          3: [],
        },
        chargingSC: [],
      },
    },
  },
  selfGuardPiercing: {
    address: attributesAdrs.selfGuardPiercing,
    value: {
      default: null,
      activeSC: {
        1: null,
        2: null,
        3: null,
      },
    },
  },
  enemyGuardPiercing: {
    address: attributesAdrs.enemyGuardPiercing,
    value: {
      default: null,
      activeSC: {
        1: null,
        2: null,
        3: null,
      },
    },
  },
  enemyDamageReflection: {
    address: attributesAdrs.enemyDamageReflection,
    value: {
      default: null,
    },
  },
  lifeContinuous: {
    address: attributesAdrs.lifeContinuous,
    value: {
      default: null,
      activeSC: {
        1: null,
        2: null,
        3: null,
      },
      chargingSC: null,
      HP: {
        default: [],
        activeSC: {
          1: [],
          2: [],
          3: [],
        },
        chargingSC: [],
      },
    },
  },
  lifeHit: {
    address: attributesAdrs.lifeHit,
    value: {
      default: null,
    },
  },
  lifeVampire: {
    address: attributesAdrs.lifeVampire,
    value: {
      default: null,
    },
  },
  SCState: {
    address: soulChargeAdrs,
    value: {
      HP: {
        health: null,
        SCLvl: null,
      },
      always: null,
    },
  },
};

module.exports.weapon = weapon;
