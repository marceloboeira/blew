/** 
 * CronJobs Setup
 *
 * @see https://github.com/vimia/blew/issues/65
 */

var cron = require('cron');
var _ = require('lodash');

module.exports.cron = {

	start: function(s) {
		_.forEach(sails.config.cron.jobs, function(job, time) {
				cron.job(time, job).start(); 
		});
	},

	/** 
   * Injecting CronJobs Live time
   *
   * @see https://github.com/vimia/blew/issues/73
   */
	addJob: function(time, function) {
		//keep
	},

	// Base Jobs
	jobs: {
		"*/10 * * * * *": function(){
			console.log("Example cron job");
		}	
	}
}