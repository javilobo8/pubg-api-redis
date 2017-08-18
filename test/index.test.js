/* eslint-disable no-unused-expressions */
const {expect} = require('chai');
const pkg = require('../');

describe('PubgAPI', () => {
  const apikey = process.env.PUBG_APIKEY;

  describe('when created', () => {
    it('should export PubgAPI and PubgAPIErrors', () => {
      expect(pkg.PubgAPI).to.exist;
      expect(pkg.PubgAPIErrors).to.exist;
    });

    it('should initialize with api key and no cache', () => {
      const {PubgAPI} = pkg;
      const api = new PubgAPI({apikey});

      expect(api).to.be.instanceOf(PubgAPI);
    });

    it('should fail with no apikey', () => {
      try {
        const {PubgAPI} = pkg;
        // eslint-disable-next-line
        const api = new PubgAPI({});
      } catch (err) {
        expect(err).to.be.instanceOf(pkg.PubgAPIErrors.EmptyApiKey);
      }
    });

    it('should have pubg-tracker-api methods', () => {
      const {PubgAPI} = pkg;
      const api = new PubgAPI({apikey});

      expect(api.getProfileByNickname).to.exist;
      expect(api.getAccountBySteamID).to.exist;
    });
  });

  describe('when getProfileByNickname', () => {
    const nickname = 'javilobo8';
    const {PubgAPI} = pkg;
    const api = new PubgAPI({apikey});

    it('should get profile object', (done) => {
      api.getProfileByNickname(nickname)
        .then((profile) => {
          const stats = profile.getStats();
          expect(profile.content).to.exist;
          expect(stats).to.exist;
          done();
        });
    });
  });

  describe('when getProfileByNickname fails', () => {
    const nickname = 'javilobos8';
    const {PubgAPI} = pkg;
    const api = new PubgAPI({apikey});

    it('should throw an error', (done) => {
      api.getProfileByNickname(nickname)
        .then(() => {})
        .catch((err) => {
          expect(err).to.be.instanceOf(pkg.PubgAPIErrors.ProfileNotFound);
          done();
        });
    });
  });

  describe('when getAccountBySteamID', () => {
    const steamId = '76561198084956266';
    const {PubgAPI} = pkg;
    const api = new PubgAPI({apikey});

    it('should get account data', (done) => {
      api.getAccountBySteamID(steamId)
        .then((data) => {
          expect(data).to.exist;
          done();
        });
    });
  });
});
