const {assign} = require('lodash');

const REGION = {
  ALL: 'agg',
  AS: 'as',
  EU: 'eu',
  NA: 'na',
  OC: 'oc',
  SA: 'sa',
  SEA: 'sea',
  KRJP: 'krjp',
};

const SEASON = {
  EA2017pre1: '2017-pre1',
  EA2017pre2: '2017-pre2',
  EA2017pre3: '2017-pre3',
  EA2017pre4: '2017-pre4',
  EA2017pre5: '2017-pre5',
  EA2017pre6: '2017-pre6',
  '2018-01': '2018-01',
};

const MATCH = {
  SOLO: 'solo',
  DUO: 'duo',
  SQUAD: 'squad',
  SOLOFPP: 'solo-fpp',
  DUOFPP: 'duo-fpp',
  SQUADFPP: 'squad-fpp',
};

exports.REGION = REGION;
exports.SEASON = SEASON;
exports.MATCH = assign({}, MATCH, {DEFAULT: MATCH.SOLO});
