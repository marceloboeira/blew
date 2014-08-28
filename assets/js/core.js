
$(function(){

	/*! 
	  * Moment.js to make timestamps pretty 
	  * 	
	  *	@see https://github.com/vimia/blew/issues/14
	  */
	var momentLiveUpdate = function() {
		$('date, time').each(function(i, e) {
    		var d = moment($(e).attr('source'));
			$(e).html(d.fromNow());
		});
	};
	momentLiveUpdate();
	setInterval(momentLiveUpdate, 60000);
});