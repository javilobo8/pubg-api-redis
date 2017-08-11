const {
  PubgAPI,
  PubgAPIErrors,
} = require('./index');
const fs = require('fs');

const APIKEY = 'd4fb35fe-aaab-451d-a49b-8973ed609972';

const api = new PubgAPI({apikey: APIKEY});

api.profile.byNickname('twitchBLADECITO')
  .then((stats) => {
    const data = stats.getStats({});
    console.log(data);
  });

