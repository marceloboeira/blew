
$(function(){
	
	/*! 
	  * Moment.js to make timestamps pretty 
	  * 	
	  *	@see https://github.com/vimia/blew/issues/14
	  */
	var momentLiveUpdate = function() {
		var now = new Date();
		$('date, time').each(function(i, e) {
    		var d = moment($(e).attr('source'));
			$(e).html(d.from(now));
		});
	};
	momentLiveUpdate();
	setInterval(momentLiveUpdate, 60000);
});