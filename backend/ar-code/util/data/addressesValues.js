const {
  floatToHexConverter,
} = require('../helper/makeCode/floatToHexConverter');

const characters = {
  assassin: '0000001F',
  astaroth: '00000012',
  berserker: '00000020',
  cassandra: '00000017',
  cervantes: '00000014',
  charade: '00000018',
  heihachi: '0000001B',
  inferno: '00000013',
  ivy: '0000000B',
  kilik: '0000000C',
  link: '0000001B',
  lizardman: '0000001E',
  maxi: '00000004',
  mitsurugi: '00000001',
  necrid: '00000019',
  nightmare: '00000011',
  raphael: '00000015',
  seungmina: '00000002',
  siegfried: '00000011',
  sophitia: '00000006',
  spawn: '0000001B',
  taki: '00000003',
  talim: '00000016',
  voldo: '00000005',
  xianghua: '0000000D',
  yoshimitsu: '0000000F',
  yunsung: '0000001A',
};

const HP = [floatToHexConverter(240)];
for (let i = 0; i < 20; i += 1) {
  HP.push(floatToHexConverter(240 - 12 * i));
}

const soulCharge = {
  inactive: '00000000',
  charging: {
    1: '00000003',
    2: '00000002',
    3: '00000001',
  },
  active: {
    1: '00000006',
    2: '00000005',
    3: '00000004',
  },
};

const siegfriedCostume = 'C83614A5 00000002';

module.exports.charactersAdrsVal = characters;
module.exports.HPAdrsVal = HP;
module.exports.soulChargeAdrsVal = soulCharge;
module.exports.siegfriedCostumeAdrsVal = siegfriedCostume;
