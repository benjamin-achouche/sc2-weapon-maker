const {
  attackVal,
  defenseVal,
  speedVal,
  selfGuardPiercingVal,
  enemyGuardPiercingVal,
  enemyDamageReflectionVal,
  lifeContinuousVal,
  lifeHitVal,
  lifeVampireVal,
  lessHealthMoreAttackVal,
  lessHealthMoreDefenseVal,
  lessHealthMoreSpeedVal,
  lessHealthMoreLifeContVal,
  lessHealthSCLvUpVal,
  SCLifeContinuousVal,
  SCTypeVal,
} = require('../../data/attributesValues');

const getAttributesData = (attributes) => {
  const attrData = {
    attack: attackVal.default[attributes.attack],
    defense: defenseVal.default[attributes.defense],
    speed: speedVal.default[attributes.speed],
    selfGuardPiercing: selfGuardPiercingVal[attributes.selfGuardPiercing],
    enemyGuardPiercing:
      enemyGuardPiercingVal.default[attributes.enemyGuardPiercing],
    enemyDamageReflection:
      enemyDamageReflectionVal[attributes.enemyDamageReflection],
    lifeContinuous: lifeContinuousVal[attributes.lifeContinuous],
    lifeHit: lifeHitVal[attributes.lifeHit],
    lifeVampire: lifeVampireVal[attributes.lifeVampire],
    lessHealthMoreAttack:
      lessHealthMoreAttackVal[attributes.lessHealthMoreAttack],
    lessHealthMoreDefense:
      lessHealthMoreDefenseVal[attributes.lessHealthMoreDefense],
    lessHealthMoreSpeed: lessHealthMoreSpeedVal[attributes.lessHealthMoreSpeed],
    lessHealthMoreLifeCont:
      lessHealthMoreLifeContVal[attributes.lessHealthMoreLifeCont],
    lessHealthSCLvUp: lessHealthSCLvUpVal[attributes.lessHealthSCLvUp],
    SCAttack: attackVal.activeSC[attributes.SCAttack],
    SCDefense: defenseVal.activeSC[attributes.SCDefense],
    SCChargeDefense: defenseVal.chargingSC[attributes.SCDefense],
    SCSpeed: speedVal.activeSC[attributes.SCSpeed],
    SCChargeSpeed: speedVal.chargingSC[attributes.SCChargeSpeed],
    SCEnemyGuardPiercing:
      enemyGuardPiercingVal.activeSC[attributes.SCEnemyGuardPiercing],
    SCLifeContinuous: SCLifeContinuousVal.activeSC[attributes.SCLifeContinuous],
    SCChargeLifeContinuous:
      SCLifeContinuousVal.chargingSC[attributes.SCLifeContinuous],
    SCType: SCTypeVal[attributes.SCType],
  };
  return attrData;
};

module.exports.getAttributesData = getAttributesData;
