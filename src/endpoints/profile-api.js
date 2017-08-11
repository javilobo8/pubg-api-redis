const queryString = require('query-string');

class ProfileApi {

  /**
   * Creates an instance of ProfileApi.
   * @param {function} request
   * @param {number} expiration
   *
   * @memberof ProfileApi
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
   * @memberof ProfileApi
   */
  byNickname(_nickname) {
    const playerName = encodeURIComponent(String(_nickname).toLowerCase().replace(/\s/g, ''));
    const uri = `https://pubgtracker.com/api/profile/pc/${playerName}`;
    return this.request(this.SERVICE, uri, this.expiration);
  }

  /**
   * Get profile info by Steam ID
   *
   * @param {string} steamId
   * @returns {Promise}
   *
   * @memberof ProfileApi
   */
  bySteamId(steamId) {
    const query = queryString.stringify({steamId}, {encode: true});
    const uri = `https://pubgtracker.com/api/search?${query}`;
    return this.request(this.SERVICE, uri, this.expiration);
  }
}

module.exports = ProfileApi;
