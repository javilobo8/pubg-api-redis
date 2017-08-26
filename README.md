[![npm version](https://badge.fury.io/js/pubg-api-redis.svg)](https://badge.fury.io/js/pubg-api-redis)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# pubg-api-redis

Playerunknown's Battlegrounds API Wrapper with Redis caching.

* The API is maintained and provided by [https://pubgtracker.com](https://pubgtracker.com) and all credits go to them. Thank you :D

* It caches all http requests for 5 minutes in Redis.

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

api.getProfileByNickname('javilobo8')
  .then((profile) => {
    const data = profile.content;
    const stats = profile.getStats({
      region: REGION.ALL, // defaults to profile.content.selectedRegion
      season: SEASON.EA2017pre3, // defaults to profile.content.defaultSeason
      match: MATCH.SOLO // defaults to SOLO
    });
    console.log(stats);
  });

api.getAccountBySteamID('76561198084956266')
  .then((account) => {
    console.log(account);
  });

```

Example output with profile.getStats()
```json
{
  "region": "eu",
  "defaultRegion": "eu",
  "season": "2017-pre3",
  "defaultSeason": "2017-pre3",
  "match": "solo",
  "lastUpdated": "2017-08-26T07:04:22.1761241Z",
  "playerName": "fak3zito",
  "performance": {
    "killDeathRatio": 3.9,
    "winRatio": 12.59,
    "timeSurvived": 172745.7,
    "roundsPlayed": 143,
    "wins": 18,
    "winTop10Ratio": 0.38,
    "top10s": 48,
    "top10Ratio": 33.57,
    "losses": 125,
    "winPoints": 1862
  },
  "skillRating": {
    "rating": 2274,
    "bestRating": 2289.04,
    "bestRank": 35
  },
  "perGame": {
    "damagePg": 412.52,
    "headshotKillsPg": 1,
    "healsPg": 2.63,
    "killsPg": 3.41,
    "moveDistancePg": 3869.1,
    "revivesPg": "0",
    "roadKillsPg": 0.02,
    "teamKillsPg": 0.01,
    "timeSurvivedPg": 1208.01,
    "top10sPg": 0.34
  },
  "combat": {
    "kills": 488,
    "assists": 34,
    "suicides": 1,
    "teamKills": 1,
    "headshotKills": 143,
    "headshotKillRatio": 0.29,
    "vehicleDestroys": 10,
    "roadKills": 3,
    "dailyKills": 20,
    "weeklyKills": 85,
    "roundMostKills": 14,
    "maxKillStreaks": 2,
    "weaponAcquired": "0"
  },
  "survival": {
    "days": 21,
    "longestTimeSurvived": 2183.97,
    "mostSurvivalTime": 2183.97,
    "avgSurvivalTime": 1208.01
  },
  "distance": {
    "walkDistance": 295931.8,
    "rideDistance": 257349.8,
    "moveDistance": 553281.6,
    "avgWalkDistance": 2069.45,
    "avgRideDistance": 1799.65,
    "longestKill": 483.63
  },
  "support": {
    "heals": 376,
    "revives": "0",
    "boosts": 427,
    "damageDealt": 58990.98,
    "dBNOs": "0"
  },
  "rankData": {
    "wins": 518,
    "rating": 263,
    "kills": 59,
    "winPoints": 518
  }
}
```

### `rankData.rating` is the leaderboard position

## Tests

You can run tests with your development API KEY stored in environment variable
```
PUBG_APIKEY=<your-api-key> npm t
```
