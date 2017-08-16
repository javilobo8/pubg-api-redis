const {expect} = require('chai');
const {PubgAPI} = require('../../');

describe('SearchAPI', () => {
  const api = new PubgAPI({
    apikey: process.env.PUBGTRACKERAPIKEY,
    redisConfig: {
      host: '127.0.0.1',
      port: 6379,
    },
  });
  const steamId = '76561198084956266';

  beforeEach((done) => setTimeout(done, 1000));

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
