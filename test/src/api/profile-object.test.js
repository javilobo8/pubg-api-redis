/* eslint-disable no-unused-expressions */
const {expect} = require('chai');
const Profile = require('../../../src/api/profile-object');
const {StatsNotFound} = require('../../../src/pubg-errors');

describe('profile-object', () => {
  describe('Profile', () => {
    it('should throw an error if profile is empty object', () => {
      try {
        const profile = new Profile({});
        profile.getStats();
      } catch (err) {
        expect(err).to.be.instanceof(StatsNotFound);
      }
    });
  });
});
