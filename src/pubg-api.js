const redis = require('redis');
const Promise = require('bluebird');
const request = require('request-promise');

class Client {

  constructor(apikey, redisConfig) {
    if (!apikey) {
      throw new Error('No API key provided');
    }

    if (redisConfig) {
      this.redis = redis.createClient(redisConfig);

      this.expiration = 500;

      this.cache = {

        get: (key) => new Promise((resolve, reject) => {
          this.redis.get(key, (err, content) => {
            if (err) {
              reject(err);
            }

            resolve(content);
          });
        }),

        set: (key, value) => new Promise((resolve, reject) => {
          this.redis.set(key, this.expiration, value, (err) => {
            if (err) {
              reject(err);
            }

            resolve(null);
          });
        }),
      };
    }

    this.apikey = apikey;
    this.requestHeaders = {
      'TRN-Api-Key': this.apikey,
    };
  }

  doRequest(uri) {
    return Promise.resolve(request(uri, {headers: this.requestHeaders}))
      .then(());
  }
} 