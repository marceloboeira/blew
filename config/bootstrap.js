
module.exports.bootstrap = function(cb) {
  cb();
  
  /** 
   * Injecting EJS Filters in the FilterService
   *
   * @see https://github.com/vimia/blew/issues/23
   */
  sails.config.http.locals.filters = FilterService;	 
  _.extend(sails.hooks.http.app.locals, sails.config.http.locals);

  /** 
   * Injecting CronJobs
   *
   * @see https://github.com/vimia/blew/issues/65
   */
  sails.config.cron.start(sails);
};
