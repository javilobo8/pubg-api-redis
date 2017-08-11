const {expect} = require('chai');
const {PubgAPI} = require('../../');

describe('Profile', () => {
  const api = new PubgAPI({
    apikey: process.env.PUBGTRACKERAPIKEY,
    redisConfig: {
      host: '127.0.0.1',
      port: 6379,
    },
  });
  const nickname = 'javilobo8';
  const steamId = '76561198084956266';

  beforeEach((done) => setTimeout(done, 1000));

  describe('byNickname', () => {
    it('should return profile object', (done) => {
      api.profile.byNickname(nickname)
        .then((body) => {
          expect(body).to.be.an('object');
          done();
        });
    });
  });

  describe('bySteamId', () => {
    it('should return profile object', (done) => {
      api.profile.bySteamId(steamId)
        .then((body) => {
          expect(body).to.be.an('object');
          done();
        });
    });
  });
});
