import * as attrImgs from './weaponsImages';

import * as attrValues from './attributesValues';

import * as lvlPtsCost from './levelsPointsCost';

import * as Tooltips from './tooltips';

const weaponAttributes = {
  attack: {
    name: 'attack',
    image: attrImgs.attack,
    attributeValue: attrValues.attack,
    levels: attrValues.attack.length,
    lvlPtsCost: lvlPtsCost.attack,
    tooltip: Tooltips.attack,
  },
  defense: {
    name: 'defense',
    image: attrImgs.defense,
    attributeValue: attrValues.defense,
    levels: attrValues.defense.length,
    lvlPtsCost: lvlPtsCost.defense,
    tooltip: Tooltips.defense,
  },
  speed: {
    name: 'speed',
    image: attrImgs.speed,
    attributeValue: attrValues.speed,
    levels: attrValues.speed.length,
    lvlPtsCost: lvlPtsCost.speed,
    tooltip: Tooltips.speed,
  },
  selfGuardPiercing: {
    name: 'selfGuardPiercing',
    image: attrImgs.selfGP,
    attributeValue: attrValues.selfGP,
    levels: attrValues.selfGP.length,
    lvlPtsCost: lvlPtsCost.selfGP,
    tooltip: Tooltips.selfGP,
  },
  enemyGuardPiercing: {
    name: 'enemyGuardPiercing',
    image: attrImgs.enemyGP,
    attributeValue: attrValues.enemyGP,
    levels: attrValues.enemyGP.length,
    lvlPtsCost: lvlPtsCost.enemyGP,
    tooltip: Tooltips.enemyGP,
  },
  reach: {
    name: 'reach',
    image: attrImgs.reach,
    attributeValue: attrValues.reach,
    levels: attrValues.reach.length,
    lvlPtsCost: lvlPtsCost.reach,
    tooltip: Tooltips.reach,
  },
  counters: {
    name: 'counters',
    image: attrImgs.counters,
    attributeValue: attrValues.counters,
    levels: attrValues.counters.length,
    lvlPtsCost: lvlPtsCost.counters,
    tooltip: Tooltips.counters,
  },
  enemyDamageReflection: {
    name: 'enemyDamageReflection',
    image: attrImgs.enemyDmgRefl,
    attributeValue: attrValues.enemyDmgRefl,
    levels: attrValues.enemyDmgRefl.length,
    lvlPtsCost: lvlPtsCost.enemyDmgRefl,
    tooltip: Tooltips.enemyDmgRefl,
  },
  lifeContinuous: {
    name: 'lifeContinuous',
    image: attrImgs.lifeCont,
    attributeValue: attrValues.lifeCont,
    levels: attrValues.lifeCont.length,
    lvlPtsCost: lvlPtsCost.lifeCont,
    tooltip: Tooltips.lifeCont,
  },
  lifeHit: {
    name: 'lifeHit',
    image: attrImgs.lifeHit,
    attributeValue: attrValues.lifeHit,
    levels: attrValues.lifeHit.length,
    lvlPtsCost: lvlPtsCost.lifeHit,
    tooltip: Tooltips.lifeHit,
  },
  lifeVampire: {
    name: 'lifeVampire',
    image: attrImgs.lifeVamp,
    attributeValue: attrValues.lifeVamp,
    levels: attrValues.lifeVamp.length,
    lvlPtsCost: lvlPtsCost.lifeVamp,
    tooltip: Tooltips.lifeVamp,
  },

  lessHealthMoreAttack: {
    name: 'lessHealthMoreAttack',
    image: attrImgs.healthAtt,
    attributeValue: attrValues.healthAtt,
    levels: attrValues.healthAtt.length,
    lvlPtsCost: lvlPtsCost.healthAtt,
    tooltip: Tooltips.healthAtt,
  },
  lessHealthMoreDefense: {
    name: 'lessHealthMoreDefense',
    image: attrImgs.healthDef,
    attributeValue: attrValues.healthDef,
    levels: attrValues.healthDef.length,
    lvlPtsCost: lvlPtsCost.healthDef,
    tooltip: Tooltips.healthDef,
  },
  lessHealthMoreSpeed: {
    name: 'lessHealthMoreSpeed',
    image: attrImgs.healthSpd,
    attributeValue: attrValues.healthSpd,
    levels: attrValues.healthSpd.length,
    lvlPtsCost: lvlPtsCost.healthSpd,
    tooltip: Tooltips.healthSpd,
  },
  lessHealthMoreLifeCont: {
    name: 'lessHealthMoreLifeCont',
    image: attrImgs.healthLife,
    attributeValue: attrValues.healthLife,
    levels: attrValues.healthLife.length,
    lvlPtsCost: lvlPtsCost.healthLife,
    tooltip: Tooltips.healthLife,
  },
  lessHealthSCLvUp: {
    name: 'lessHealthSCLvUp',
    image: attrImgs.healthSCLvUp,
    attributeValue: attrValues.healthSCLvUp,
    levels: attrValues.healthSCLvUp.length,
    lvlPtsCost: lvlPtsCost.healthSCLvUp,
    tooltip: Tooltips.healthSCLvUp,
  },
  SCAttack: {
    name: 'SCAttack',
    image: attrImgs.SCAtt,
    attributeValue: attrValues.SCAttack,
    levels: attrValues.SCAttack.length,
    lvlPtsCost: lvlPtsCost.SCAttack,
    tooltip: Tooltips.SCAttack,
    isTransparent: false,
  },
  SCDefense: {
    name: 'SCDefense',
    image: attrImgs.SCDef,
    attributeValue: attrValues.SCDefense,
    levels: attrValues.SCDefense.length,
    lvlPtsCost: lvlPtsCost.SCDefense,
    tooltip: Tooltips.SCDefense,
    isTransparent: false,
  },
  SCSpeed: {
    name: 'SCSpeed',
    image: attrImgs.SCSpeed,
    attributeValue: attrValues.SCSpeed,
    levels: attrValues.SCSpeed.length,
    lvlPtsCost: lvlPtsCost.SCSpeed,
    tooltip: Tooltips.SCSpeed,
    isTransparent: false,
  },
  SCEnemyGuardPiercing: {
    name: 'SCEnemyGuardPiercing',
    image: attrImgs.SCEnemyGP,
    attributeValue: attrValues.SCEnemyGP,
    levels: attrValues.SCEnemyGP.length,
    lvlPtsCost: lvlPtsCost.SCEnemyGP,
    tooltip: Tooltips.SCEnemyGP,
    isTransparent: false,
  },
  SCLifeContinuous: {
    name: 'SCLifeContinuous',
    image: attrImgs.SCLifeCont,
    attributeValue: attrValues.SCLifeCont,
    levels: attrValues.SCLifeCont.length,
    lvlPtsCost: lvlPtsCost.SCLifeCont,
    tooltip: Tooltips.SCLifeCont,
    isTransparent: false,
  },
  SCChargeSpeed: {
    name: 'SCChargeSpeed',
    image: attrImgs.SCChargeSpd,
    attributeValue: attrValues.SCChargeSpd,
    levels: attrValues.SCChargeSpd.length,
    lvlPtsCost: lvlPtsCost.SCChargeSpd,
    tooltip: Tooltips.SCChargeSpd,
    isTransparent: false,
  },
  SCType: {
    name: 'SCType',
    image: attrImgs.SCType,
    attributeValue: attrValues.SCType,
    levels: attrValues.SCType.length,
    lvlPtsCost: lvlPtsCost.SCType,
    tooltip: Tooltips.SCType,
    isTransparent: false,
  },
};

export default weaponAttributes;
