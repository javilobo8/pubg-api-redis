const queryString = require('query-string');
const request = 
class PUBGTracker {

  constructor(apikey) {
    this.apikey = apikey;
    this.cacheExpiration = 500;
  }

  getStatsByNickname(_nickname) {
    const playerName = encodeURIComponent(String(_nickname).toLowerCase().replace(/\s/g, ''));
    const uri = `https://pubgtracker.com/api/profile/pc/${playerName}`;
    return this.request(this.SERVICE, uri, this.expiration);
  }

  getAccountBySteamId(steamId) {
    const query = queryString.stringify({steamId}, {encode: true});
    const uri = `https://pubgtracker.com/api/search?${query}`;
    return this.request(this.SERVICE, uri, this.expiration);
  }

}

module.exports = PUBGTracker;
