[![npm version](https://badge.fury.io/js/pubg-api-redis.svg)](https://badge.fury.io/js/pubg-api-redis)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# pubg-api-redis

Playerunknown's Battlegrounds API Wrapper with Redis caching.

* The API is maintained and provided by [https://pubgtracker.com](https://pubgtracker.com) and all credits go to them. Thank you :D

## Installation

```
npm install -S pubg-api-redis
```

## Usage

First, generate your development APIKEY from [PUBG Tracker (https://pubgtracker.com/site-api)](https://pubgtracker.com/site-api)

```javascript
const {PubgAPI, PubgAPIErrors} = require('pubg-api-redis');

// If no Redis configuration it wont be cached
const api = new PubgAPI({
  apikey: 'XXXXX',
  redisConfig: {
    host: '127.0.0.1',
    port: 6379,
    expiration: 300, // Optional - defaults to 300.
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
