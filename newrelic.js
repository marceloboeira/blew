/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
exports.config = {
  /**
   * Array of application names.
   */
  app_name : ['blew.io'],
  /**
   * Your New Relic license key.
   */
  license_key : process.env.NEWRELIC_KEY || 'app_key',
  logging : {
    level : 'trace'
  }
};
