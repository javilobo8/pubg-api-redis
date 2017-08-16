class ProfileAPI {

  /**
   * Creates an instance of ProfileAPI.
   * @param {function} request
   * @param {number} expiration
   *
   * @memberof ProfileAPI
   */
  constructor(request, expiration) {
    this.SERVICE = 'PROFILE';
    this.request = request;
    this.expiration = expiration;
  }

  /**
   * Get profile info by nickname
   *
   * @param {string} nickname
   * @returns {Promise}
   *
   * @memberof ProfileAPI
   */
  byNickname(_nickname) {
    const playerName = encodeURIComponent(String(_nickname).toLowerCase().replace(/\s/g, ''));
    const uri = `https://pubgtracker.com/api/profile/pc/${playerName}`;
    return this.request(this.SERVICE, uri, this.expiration);
  }
}

module.exports = ProfileAPI;
