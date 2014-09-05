$(function(){
	var pjaxContainer = '[pjax-container]';
	var $pjaxContainer = $(pjaxContainer);

	var pjaxModalContainer = '[pjax-modal-container]';
	var $pjaxModalContainer = $(pjaxModalContainer);

	var pjaxModalClose = '[pjax-modal-close]';
	
	$(pjaxModalClose).click(function(e){
		e.preventDefault();
		history.back();
	});
	/** 
	 * Pjax to load only what you need
	 * 	
	 * @see https://github.com/vimia/blew/issues/5
	 */
	$(document).pjax('a[pjax]', pjaxContainer);
	$(document).pjax('a[pjax-modal]', pjaxModalContainer);
	
	$(document).on('pjax:send', function() {
  		
  		// Clear modal content
  		$pjaxModalContainer.empty();
	});
	
	$(document).on('pjax:complete', function() {
  		
  		// Make update pjax content needs after it loads
  		momentLiveUpdate();
  		highlightLiveUpdate();
  	});

	$(document).on('pjax:end', function() {
		//keep
  	});
	
	/** 
	 * Highlight.js to make code looks pretty 
	 * 	
	 * @see https://github.com/vimia/blew/issues/29
	 */
	var highlightLiveUpdate = function() {
		$('code[highlight]').each(function(i, block) {
  			hljs.highlightBlock(block);
		});
	};

	/** 
	 * Moment.js to make timestamps looks pretty 
	 * 	
	 * @see https://github.com/vimia/blew/issues/14
	 */
	var momentLiveUpdate = function() {
		$('date, time').each(function(i, e) {
    		var d = moment($(e).attr('source'));
			$(e).html(d.fromNow());
		});
	};
	momentLiveUpdate();
	setInterval(momentLiveUpdate, 60000);



	var $btnEditPassword = $("#btnChangePassword");
	var $btnEditProfile = $("#btnChangeProfile");
	
});


var editPassword = function (e, cb) {
	// Load Pajax Modal

	// Force Modal


};