const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const weaponSchema = new Schema({
  character: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  attributes: {
    attack: { type: Number, required: true },
    defense: { type: Number, required: true },
    speed: { type: Number, required: true },
    selfGuardPiercing: { type: Number, required: true },
    enemyGuardPiercing: { type: Number, required: true },
    reach: { type: Number, required: true },
    counters: { type: Number, required: true },
    enemyDamageReflection: { type: Number, required: true },
    lifeContinuous: { type: Number, required: true },
    lifeHit: { type: Number, required: true },
    lifeVampire: { type: Number, required: true },
    lessHealthMoreAttack: { type: Number, required: true },
    lessHealthMoreDefense: { type: Number, required: true },
    lessHealthMoreSpeed: { type: Number, required: true },
    lessHealthMoreLifeCont: { type: Number, required: true },
    lessHealthSCLvUp: { type: Number, required: true },
    SCAttack: { type: Number, required: true },
    SCDefense: { type: Number, required: true },
    SCSpeed: { type: Number, required: true },
    SCEnemyGuardPiercing: { type: Number, required: true },
    SCLifeContinuous: { type: Number, required: true },
    SCChargeSpeed: { type: Number, required: true },
    SCType: { type: Number, required: true },
  },
  points: { type: Number, required: true },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
});

module.exports = mongoose.model('Weapon', weaponSchema);
