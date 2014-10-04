
var cron = require('cron');
var _ = require('lodash');

module.exports.cron = {

	start: function(s) {
		_.forEach(sails.config.cron.jobs, function(job, time) {
				cron.job(time, job).start(); 
		});
	},

	addJob: function(time, function) {
		//keep
	},

	jobs: {
		"*/10 * * * * *": function(){
			console.log("Example cron job");
		}	
	}

}