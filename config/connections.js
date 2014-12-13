/**
 * Connections
 * 
 * The `connections` configuration object lets you create different global "saved settings"
 * that you can mix and match in your models.  The `default` option indicates which 
 * "saved setting" should be used if a model doesn't have a connection specified.
 *
 * Note: If you're using version control, you should put your passwords/api keys 
 * in `config/local.js`, not here, in case you inadvertently push them up to your repository.
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.connections = {
  
  development: {
    adapter: process.env.DEV_DB_ADAPTER ||  'sails-disk',
  },

  test: {
    adapter: process.env.TEST_DB_ADAPTER ||  'sails-disk',
  },

  staging: {
    adapter: process.env.STAGING_DB_ADAPTER ||  'sails-disk',
    url: process.env.STAGING_DB_URL || 'localhost',
    ssl: process.env.STAGING_DB_SSL || true, 
  },

  production: {
    adapter: process.env.PROD_DB_ADAPTER ||  'sails-disk',
    url: process.env.PROD_DB_URL || 'localhost',
    ssl: process.env.PROD_DB_SSL || true,
  }
};




