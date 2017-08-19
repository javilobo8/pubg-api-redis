const {MATCH} = require('../util/constants');
const {StatsNotFound} = require('../pubg-errors');
const {values} = require('lodash');

function formatProperty(prop) {
  const str = String(prop).replace(/\s/g, '');
  return `${str.charAt(0).toLowerCase()}${str.slice(1)}`;
}

class Profile {
  constructor(content) {
    this.content = content;
    this.currentSeason = content.defaultSeason;
    this.currentSeasonLabel = content.seasonDisplay;
    this.lastUpdated = content.LastUpdated;
    this.defaultRegion = content.selectedRegion;
    this.defaultSeason = content.defaultSeason;
    this.playerName = content.PlayerName;
    this.stats = content.Stats;
    this.matchHistory = content.MatchHistory;

    if (!this.stats) {
      throw new StatsNotFound();
    }
  }

  getStats(options = {}) {
    const {
      region = this.defaultRegion,
      season = this.defaultSeason,
      match = MATCH.DEFAULT,
    } = options;

    const selectedStats = this.stats.find((stat) => (
      stat.Region === region
      && stat.Season === season
      && stat.Match === match
    ));

    if (!selectedStats) {
      throw new StatsNotFound();
    }

    let data = {};

    data.region = region;
    data.defaultRegion = this.defaultRegion;
    data.season = season;
    data.defaultSeason = this.defaultSeason;
    data.match = match;
    data.lastUpdated = this.lastUpdated;
    data.playerName = this.playerName;

    data = selectedStats.Stats.reduce((curr, entry) => {
      const stats = curr;
      const value = entry.ValueInt || entry.ValueDec || entry.value;

      const category = formatProperty(entry.category);
      const field = formatProperty(entry.field);

      if (!curr[category]) {
        stats[category] = {};
      }

      stats[category][field] = value;

      return stats;
    }, data);

    return data;
  }

  getStatsForAllMatches(options = {}) {
    const {
      region = this.defaultRegion,
      season = this.defaultSeason,
    } = options;
    const matches = values(MATCH);

    const data = {};

    matches.forEach((match) => {
      try {
        const statsOptions = Object.assign({}, {match}, {region, season});
        data[match] = this.getStats(statsOptions);
      } catch (err) {
        data[match] = null;
        console.log(`No matches for '${match}' queue`);
      }
    });

    return data;
  }

  getMatchHistory() {
    const data = {};

    data.total = this.matchHistory.length;
    data.matchHistory = this.matchHistory.map((entry) =>
      Object.keys(entry).reduce((acc, curr) =>
        Object.assign({}, acc, {[formatProperty(curr)]: entry[curr]})
      , {})
    );

    return data;
  }
}

module.exports = Profile;
