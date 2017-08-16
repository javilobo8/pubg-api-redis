const queryString = require('query-string');

class SearchAPI {

  /**
   * Creates an instance of SearchAPI.
   * @param {function} request
   * @param {number} expiration
   *
   * @memberof SearchAPI
   */
  constructor(request, expiration) {
    this.SERVICE = 'SEARCH';
    this.request = request;
    this.expiration = expiration;
  }

  /**
   * Get account info by Steam ID
   *
   * @param {string} steamId
   * @returns {Promise}
   *
   * @memberof SearchAPI
   */
  bySteamId(steamId) {
    const query = queryString.stringify({steamId}, {encode: true});
    const uri = `https://pubgtracker.com/api/search?${query}`;
    return this.request(this.SERVICE, uri, this.expiration);
  }
}

module.exports = SearchAPI;
