const queryString = require('query-string');
const Profile = require('./profile-object');

class PubgTrackerAPI {

  getProfileByNickname(nickname) {
    const playerName = encodeURIComponent(String(nickname).toLowerCase().replace(/\s/g, ''));
    const uri = `https://pubgtracker.com/api/profile/pc/${playerName}`;

    return this.handleCache(uri)
      .then((content) => new Profile(content));
  }

  getAccountBySteamID(steamId) {
    const query = queryString.stringify({steamId}, {encode: true});
    const uri = `https://pubgtracker.com/api/search?${query}`;

    return this.handleCache(uri);
  }

}

module.exports = PubgTrackerAPI;
