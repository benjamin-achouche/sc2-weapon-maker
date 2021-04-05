export const attack = {
  name: 'Attack',
  description:
    'The percentage indicates the increase/decrease of the attack power.',
};

export const defense = {
  name: 'Defense',
  description:
    'The percentage indicates the increase/decrease of the defense power.',
};

export const speed = {
  name: 'Speed',
  description:
    "The percentage indicates the increase/decrease of the character's speed.",
};

export const selfGP = {
  name: 'Guard Piercing (Self)',
  description: `The percentage indicates the amount of damage that go through your guard.
"No Guard" means you can't guard at all.`,
};

export const enemyGP = {
  name: 'Guard Piercing (Enemy)',
  description:
    "The percentage indicates the amount of damage that go through the enemy's guard.",
};

export const reach = {
  name: 'Weapon Reach',
  description: 'How far you have to be from the enemy to hit him.',
};

export const counters = {
  name: 'Counters',
  description: `"Damage" means any damage you take are counters.
"Attack" means any damage you inflict are counters.`,
};

export const enemyDmgRefl = {
  name: 'Damage Reflects Back (Enemy)',
  description: `A portion of the damage you take will reflect back at the enemy.
The percentage indicates the amount of damage that will reflect back.`,
};

export const lifeCont = {
  name: 'Recovers/Drains Health (Constantly)',
  description: `Your health recovers/drains, constantly.
The value indicates by how much.`,
};

export const lifeHit = {
  name: 'Recovers/Drains Health (All Attacks)',
  description: `Your health recovers/drains, for every attack you perform.
The value indicates by how much.`,
};

export const lifeVamp = {
  name: 'Recovers Health (Successful Strikes)',
  description: `You heal off a portion of the damage you inflict.
The percentage indicates the amount of health you take back.`,
};

export const healthAtt = {
  name: 'Attack - (Life Bar)',
  description: `Your attack power increases as your life bar decreases.
The percentage indicates by how much.`,
};

export const healthDef = {
  name: 'Defense - (Life Bar)',
  description: `Your defense power increases as your life bar decreases.
The percentage indicates by how much.`,
};

export const healthSpd = {
  name: 'Speed - (Life Bar)',
  description: `Your speed increases as your life bar decreases.
The percentage indicates by how much.`,
};

export const healthLife = {
  name: 'Recovers Health - (Life Bar)',
  description: `Your health recovery increases as your life bar decreases.
The value indicates by how much.`,
};

export const healthSCLvUp = {
  name: 'Soul Charge - (Life Bar)',
  description: `Your Soul Charge level increases as your life bar decreases.
The value indicates the maximum level you can reach.`,
  note: `Note: You can't use a non-neutral value along with the "Always LVX" value for the "Soul Charge - (Type)" attribute.`,
};

export const SCAttack = {
  name: 'Attack - (Soul Charge)',
  description: `Your attack power increases during Soul Charge.
The higher the Soul Charge level, the higher the increase.
The percentage indicates the maximum increase you can reach.`,
};

export const SCDefense = {
  name: 'Defense - (Soul Charge)',
  description: `Your defense power increases during Soul Charge.
The higher the Soul Charge level, the higher the increase.
The percentage indicates the maximum increase you can reach.`,
};

export const SCSpeed = {
  name: 'Speed - (Soul Charge)',
  description: `Your speed increases during Soul Charge.
The higher the Soul Charge level, the higher the increase.
The percentage indicates the maximum increase you can reach.`,
};

export const SCEnemyGP = {
  name: 'Guard Piercing (Enemy) - (Soul Charge)',
  description: `Your ability to damage the enemy through his guard increases during Soul Charge.
The higher the Soul Charge level, the higher the increase.
The percentage indicates the maximum increase you can reach.`,
};

export const SCLifeCont = {
  name: 'Recovers/Drains Health (Constantly) - (Soul Charge)',
  description: `Your health recovery increases during Soul Charge.
The higher the Soul Charge level, the higher the increase.
The value indicates the maximum increase you can reach.`,
};

export const SCChargeSpd = {
  name: 'Soul Charge - (Charging Speed)',
  description: `The percentage indicates the increase/decrease of the time it takes the character to Soul Charge.`,
  note: `Note: You can't use a non-neutral value along with the "Always LVX" value for the "Soul Charge - (Type)" attribute.`,
};

export const SCType = {
  name: 'Soul Charge - (Type)',
  description: `"Regular" means the character uses a normal Soul Charge.
"Lasting" means the Soul Charge doesn't wear off when hitting the enemy.
"Always LVX" means the character is always at Soul Charge level X.`,
  note: `Note: You can't use "Always LVX" along with non-neutral values for the "Soul Charge - (Charging Speed)" and "Soul Charge - (Life Bar)" attributes.`,
};
