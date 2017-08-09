const request = require('request-promise');
const redis = require('redis');
const Promise = require('bluebird');

const {EmptyApiKey, ProfileNotFound} = require('./pubg-api.errors');
const ProfileAPI = require('./endpoints/profile');

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
    if (!apikey) throw new EmptyApiKey();
    this.apikey = apikey;

    this.redisConfig = redisConfig;

    this.expiration = 300; // Default: 5 minutes

    this.req = request.defaults({
      headers: {
        'TRN-Api-Key': this.apikey,
      },
    });

    if (this.redisConfig) {
      this.expiration = this.redisConfig.expiration || this.expiration;
      this.cache = redis.createClient();
    }

    this.profile = new ProfileAPI(this.handleRequest.bind(this), this.expiration);
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
  handleRequest(uri, expiration) {
    if (this.cache) {
      return this.cache.getAsync(uri)
        .then((res) => {
          if (res) {
            return JSON.parse(res);
          }
          return this.makeAPIRequest(uri, expiration);
        });
    }
    return this.makeAPIRequest(uri, expiration);
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
  makeAPIRequest(uri, expiration) {
    return Promise.resolve(this.req({uri}))
      .then((body) => {
        const jsonData = JSON.parse(body);

        if (!jsonData.AccountId) {
          throw new ProfileNotFound();
        }

        if (this.cache) {
          return this.cache.setexAsync(uri, expiration, body)
            .then(() => jsonData);
        }
        return jsonData;
      })
      .catch((response) => {
        if (response.statusCode !== 200) {
          throw new ProfileNotFound();
        }
        throw new Error(response.error);
      });
  }
}

module.exports = PubgAPI;
