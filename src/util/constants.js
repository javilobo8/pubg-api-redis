const {assign} = require('lodash');

const REGION = {
  ALL: 'agg',
  AS: 'as',
  EU: 'eu',
  NA: 'na',
  OC: 'oc',
  SA: 'sa',
  SEA: 'sea',
};

const SEASON = {
  EA2017pre1: '2017-pre1',
  EA2017pre2: '2017-pre2',
  EA2017pre3: '2017-pre3',
  EA2017pre4: '2017-pre4',
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
