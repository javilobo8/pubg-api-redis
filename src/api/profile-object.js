const {MATCH} = require('../util/constants');
const {StatsNotFound, ProfileNotFound} = require('../pubg-errors');

function formatProperty(prop) {
  const str = String(prop).replace(/\s/g, '');
  return `${str.charAt(0).toLowerCase()}${str.slice(1)}`;
}

class Profile {
  constructor(content) {
    if (content.error) {
      throw new ProfileNotFound(content.message);
    }

    this.content = content;
    this.currentSeason = content.defaultSeason;
    this.currentSeasonLabel = content.seasonDisplay;
    this.lastUpdated = content.LastUpdated;
    this.selectedRegion = content.selectedRegion;
    this.defaultSeason = content.defaultSeason;
    this.playerName = content.PlayerName;
    this.stats = content.Stats;

    if (!this.stats) {
      throw new StatsNotFound();
    }
  }

  getStats(options = {}) {
    const {
      region = this.selectedRegion,
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
    data.season = season;
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
}

module.exports = Profile;
