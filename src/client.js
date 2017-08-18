/* eslint-disable constructor-super */
const Promise = require('bluebird');
const request = require('request-promise');

const {RedisCache, NoCache} = require('./cache');
const {EmptyApiKey, ProfileNotFound} = require('./pubg-errors');
const PubgTrackerAPI = require('./api/pubg-tracker-api');

class Client extends PubgTrackerAPI {

  constructor({apikey, redisConfig}) {
    super();

    this.GAME = 'PUBG';

    if (!apikey) {
      throw new EmptyApiKey(apikey);
    }

    if (redisConfig) {
      this.cache = new RedisCache(redisConfig);
    } else {
      this.cache = new NoCache();
    }

    this.apikey = apikey;
    this.requestHeaders = {
      'TRN-Api-Key': this.apikey,
    };
  }

  createKey(uri) {
    return `${this.GAME};${uri}`;
  }

  handleCache(uri) {
    const key = this.createKey(uri);

    return this.cache.get(key)
      .then((content) => {
        if (!content) {
          return this.makeHttpRequest(uri);
        }
        return JSON.parse(content);
      });
  }

  makeHttpRequest(uri) {
    let data;

    return Promise.resolve(request(uri, {headers: this.requestHeaders}))
      .then((body) => {
        try {
          data = JSON.parse(body);
        } catch (err) {
          throw new Error('Failed to parse JSON', err, body);
        }

        if (data.error) {
          throw new ProfileNotFound(data.message);
        }

        const key = this.createKey(uri);

        return this.cache.set(key, body);
      })
      .then(() => data);
  }
}

module.exports = Client;
