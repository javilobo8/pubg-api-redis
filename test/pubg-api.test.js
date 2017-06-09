/* eslint-disable no-unused-expressions */
const {expect} = require('chai');
const {PubgAPI, PubgAPIErrors} = require('../');
const Promise = require('bluebird');

describe('pubg-api-redis', () => {
  const nickname = 'javilobo8';

  it('should export PubgAPI and PubgAPIErrors', () => {
    expect(PubgAPI).to.exist;
    expect(PubgAPIErrors).to.exist;
  });

  describe('PubgAPI', () => {
    it('should initialize correct with an api key', (done) => {
      const api = new PubgAPI({
        apikey: process.env.PUBGTRACKERAPIKEY,
        redisConfig: {
          host: '127.0.0.1',
          port: 6379,
        },
      });
      expect(api).to.be.instanceof(PubgAPI);
      done();
    });

    it('should throw an error if no api key', (done) => {
      try {
        // eslint-disable-next-line
        const api = new PubgAPI({});
      } catch (err) {
        expect(err).to.be.instanceof(PubgAPIErrors.EmptyApiKey);
        done();
      }
    });

    it('should use redis caching if config', (done) => {
      const api = new PubgAPI({
        apikey: process.env.PUBGTRACKERAPIKEY,
        redisConfig: {
          host: '127.0.0.1',
          port: 6379,
        },
      });
      const uri = `https://pubgtracker.com/api/profile/pc/${nickname}`;
      const handleRequest = api.handleRequest(uri, 5000);
      expect(handleRequest).to.be.instanceOf(Promise);
      done();
    });

    it('should bypass redis caching if no config', (done) => {
      const api = new PubgAPI({apikey: process.env.PUBGTRACKERAPIKEY});
      const uri = `https://pubgtracker.com/api/profile/pc/${nickname}`;
      const handleRequest = api.handleRequest(uri, 5000);
      expect(handleRequest).to.be.instanceOf(Promise);
      done();
    });
  });

  describe('PubgAPI methods', () => {
    const api = new PubgAPI({
      apikey: process.env.PUBGTRACKERAPIKEY,
      redisConfig: {
        host: '127.0.0.1',
        port: 6379,
      },
    });

    it('should return a Promise in makeAPIRequest', (done) => {
      const uri = `https://pubgtracker.com/api/profile/pc/${nickname}`;
      const makeAPIRequest = api.makeAPIRequest(uri, 5000);
      expect(makeAPIRequest).to.be.instanceOf(Promise);
      done();
    });

    it('should throw an ProfileNotFound if api fails', (done) => {
      const uri = 'https://pubgtracker.com/api/profildddse/pc/12sdaf345';
      api.makeAPIRequest(uri, 5000)
        .catch((err) => {
          console.log(err);
          console.log(Object.keys(err));
          expect(err).to.be.instanceOf(PubgAPIErrors.ProfileNotFound);
          done();
        });
    });

    it('should throw ProfileNotFound', (done) => {
      const wrongNickname = 'oowprfbadua028bd.dla';
      const uri = `https://pubgtracker.com/api/profile/pc/${wrongNickname}`;
      api.makeAPIRequest(uri, 5000)
        .catch((err) => {
          expect(err).to.be.instanceOf(PubgAPIErrors.ProfileNotFound);
          done();
        });
    });
  });
});
