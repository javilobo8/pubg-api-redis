const redis = require('redis');
const Promise = require('bluebird');

class RedisCache {
  constructor(config) {
    this.redis = redis.createClient(config);

    this.expiration = config.expiration || 500;
  }

  get(key) {
    return new Promise((resolve, reject) => {
      this.redis.get(key, (err, content) => {
        if (err) {
          reject(err);
        }

        resolve(content);
      });
    });
  }

  set(key, value) {
    return new Promise((resolve, reject) => {
      this.redis.setex(key, this.expiration, value, (err) => {
        if (err) {
          reject(err);
        }

        resolve(null);
      });
    });
  }
}

class NoCache {
  constructor() {
    this.get = () => Promise.resolve();
    this.set = () => Promise.resolve();
  }
}

exports.RedisCache = RedisCache;
exports.NoCache = NoCache;
