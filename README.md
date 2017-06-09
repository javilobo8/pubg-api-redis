[![npm version](https://badge.fury.io/js/pubg-api-redis.svg)](https://badge.fury.io/js/pubg-api-redis)

# pubg-api-redis

Playerunknown's Battlegrounds API Wrapper with Redis caching

## Installation

```
npm install -S pubg-api-redis
```

## Usage

```javascript
const {PubgAPI, PubgAPIErrors} = require('pubg-api-redis');

// If no Redis configuration it wont be cached
const api = new PubgAPI({
  apikey: 'XXXXX',
  redisConfig: {
    host: '127.0.0.1',
    port: 6379,
  },
});

api.profile.byNickname('javilobo8')
  .then((data) => {
    console.log(data);
  });

api.profile.bySteamId('76561198084956266')
  .then((data) => {
    console.log(data);
  });

```

## Tests

You can run tests with your development API KEY stored in environment variable
```
PUBGTRACKERAPIKEY=<your-api-key> npm t
```

