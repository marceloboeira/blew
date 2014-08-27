

module.exports.connections = {

  development: {
    adapter: process.env.DEV_DB_ADAPTER ||  'sails-disk',
  },

  test: {
    adapter: process.env.TEST_DB_ADAPTER ||  'sails-disk',
  },

  stage: {
    adapter: process.env.STAGE_DB_ADAPTER ||  'sails-disk',
    url: process.env.STAGE_DB_URL || 'localhost',
    ssl: true
  },

  production: {
    adapter: process.env.PROD_DB_ADAPTER ||  'sails-disk',
    url: process.env.PROD_DB_URL || 'localhost',
    ssl: true
  }
};
