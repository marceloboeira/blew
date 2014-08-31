
$(function(){
	var pjaxContainer = '[pjax-container]';
	var $pjaxContainer = $('[pjax-container]');
	/*! 
	  * Pjax to load only what you need
	  * 	
	  *	@see https://github.com/vimia/blew/issues/5
	  */
	$(document).pjax('a[pjax]', pjaxContainer);
	
	$(document).on('pjax:send', function() {
  		//keep
	});
	
	$(document).on('pjax:complete', function() {
  		
  		// Make update pjax content needs after it loads
  		momentLiveUpdate();
  		highlightLiveUpdate();
  	});

	$(document).on('pjax:end', function() {
		//keep
  	});
	
	/*! 
	  * Highlight.js to make code looks pretty 
	  * 	
	  *	@see https://github.com/vimia/blew/issues/29
	  */
	var highlightLiveUpdate = function() {
		$('code[highlight]').each(function(i, block) {
  			hljs.highlightBlock(block);
		});
	};

	/*! 
	  * Moment.js to make timestamps looks pretty 
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