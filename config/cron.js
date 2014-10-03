
var cron = require('cron');

module.exports.cron = {

	start: function() {
		console.info('CRON: injectng... ');
		var cronJob = cron.job("* * * * * *", function(){
	    console.info('CRON: Job 1 Start... ');
	    console.info('CRON: Job 1 Finish... ');
		}); 
		cronJob.start();

		var cronJob2 = cron.job("*/5 * * * * *", function(){
	    console.info('CRON: Job 2 Start... ');
	    console.info('CRON: Job 2 Finish... ');
		}); 
		cronJob2.start();
	},

}