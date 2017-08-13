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
const {PubgAPI, PubgAPIErrors, REGION, SEASON, MATCH} = require('pubg-api-redis');

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
  .then((profile) => {
    const data = profile.content;
    const stats = profile.getStats({
      region: REGION.ALL, // defaults to data.selectedRegion
      season: SEASON.EA2017pre3, // defaults to data.defaultSeason
      match: MATCH.SOLO // defaults to SOLO
    });
    console.log(stats);
  });

api.profile.bySteamId('76561198084956266')
  .then((profile) => {
    const data = profile.content;
    const stats = profile.getStats()
    console.log(stats);
  });

```

Example output
```
{ region: 'eu',
  season: '2017-pre3',
  match: 'solo',
  lastChange: '2017-08-11T08:35:43.8927348Z',
  playerName: 'player',
  performance:
   { killDeathRatio: 4.97,
     winRatio: 17.95,
     timeSurvived: 91485.95,
     roundsPlayed: 78,
     wins: 14,
     winTop10Ratio: 0.48,
     top10s: 29,
     top10Ratio: 37.18,
     losses: 64,
     winPoints: 1743 },
  skillRating: { rating: 2124, bestRating: 2163.89, bestRank: 25 },
  perGame:
   { damagePg: 447.86,
     headshotKillsPg: 0.96,
     healsPg: 1.87,
     killsPg: 4.08,
     moveDistancePg: 3726.9,
     revivesPg: '0',
     roadKillsPg: 0.03,
     teamKillsPg: 0.03,
     timeSurvivedPg: 1172.9,
     top10sPg: 0.37 },
  combat:
   { kills: 318,
     assists: 19,
     suicides: 2,
     teamKills: 2,
     headshotKills: 75,
     headshotKillRatio: 0.24,
     vehicleDestroys: 4,
     roadKills: 2,
     dailyKills: 37,
     weeklyKills: 172,
     roundMostKills: 13,
     maxKillStreaks: 3,
     weaponAcquired: '0' },
  survival:
   { days: 8,
     longestTimeSurvived: 2095.71,
     mostSurvivalTime: 2095.71,
     avgSurvivalTime: 1172.9 },
  distance:
   { walkDistance: 115835.2,
     rideDistance: 174863,
     moveDistance: 290698.2,
     avgWalkDistance: 1485.07,
     avgRideDistance: 2241.83,
     longestKill: 376.65 },
  support:
   { heals: 146,
     revives: '0',
     boosts: 248,
     damageDealt: 34932.97,
     dBNOs: '0' } }
```

## Tests

You can run tests with your development API KEY stored in environment variable
```
PUBGTRACKERAPIKEY=<your-api-key> npm t
```
