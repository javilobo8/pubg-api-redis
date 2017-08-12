const request = require('request-promise');
const redis = require('redis');
const Promise = require('bluebird');

const {EmptyApiKey, ProfileNotFound} = require('./pubg-api.errors');
const ProfileAPI = require('./endpoints/profile-api');
const Profile = require('./endpoints/profile-object');

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

class PubgAPI {

  /**
   * Creates an instance of PubgAPI.
   * @param {string} {apikey}
   *
   * @memberof PubgAPI
   */
  constructor({apikey, redisConfig}) {
    this.GAME = 'PUBG';

    if (!apikey) {
      throw new EmptyApiKey();
    }

    this.apikey = apikey;
    this.redisConfig = redisConfig;
    this.expiration = 300; // Default: 5 minutes

    this.request = request.defaults({
      headers: {
        'TRN-Api-Key': this.apikey,
      },
    });

    if (this.redisConfig) {
      this.expiration = this.redisConfig.expiration || this.expiration;
      this.redis = redis.createClient();
    }

    this.profile = new ProfileAPI(this.handleRequest.bind(this), this.expiration);
  }

  createCacheKey(service, uri) {
    return `${this.GAME};${service};${uri}`;
  }

  /**
   * Handle request
   *
   * @param {string} uri
   * @param {number} expiration
   * @returns {Promise}
   *
   * @memberof PubgAPI
   */
  handleRequest(service, uri, expiration) {
    if (this.redis) {
      return this.getDataFromCache(service, uri, expiration);
    }

    return this.makeAPIRequest(service, uri, expiration);
  }

  getDataFromCache(service, uri, expiration) {
    const cacheKey = this.createCacheKey(service, uri);

    return this.redis.getAsync(cacheKey)
      .then((cacheData) => {
        if (cacheData) {
          const jsonData = JSON.parse(cacheData);
          const dataObject = parseByService(jsonData, service);

          return dataObject;
        }

        return this.makeAPIRequest(service, uri, expiration);
      });
  }

  saveDataToCache(service, uri, expiration, body) {
    const cacheKey = this.createCacheKey(service, uri);

    return this.redis.setexAsync(cacheKey, expiration, body);
  }

  /**
   * Make API request
   *
   * @param {string} uri
   * @param {number} expiration
   * @returns {Promise}
   *
   * @memberof PubgAPI
   */
  makeAPIRequest(service, uri, expiration) {
    return Promise.resolve(this.request({uri, method: 'GET'}))
      .then((body) => {
        const jsonData = JSON.parse(body);

        if (!jsonData.AccountId) {
          throw new ProfileNotFound();
        }

        if (this.redis) {
          return this.saveDataToCache(service, uri, expiration, body)
            .then(() => parseByService(jsonData, service));
        }

        return parseByService(jsonData, service);
      })
      .catch((response) => {
        if (response.statusCode !== 200) {
          throw new ProfileNotFound();
        }

        throw new Error(response.error);
      });
  }
}

function parseByService(cacheData, service) {
  switch (service) {
    case 'PROFILE':
      return new Profile(cacheData);
    default:
      return null;
  }
}

module.exports = PubgAPI;
