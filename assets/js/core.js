$(function(){

	/** 
	 * Pjax to load only what you need
	 * 	
	 * @see https://github.com/vimia/blew/issues/5
	 * @see https://github.com/vimia/blew/issues/5
	 */
	var Global = {
		  pjax: {
		  	options: {
		  		timeout: 10000, // Prevent redirects ...
		  		replace: true
		  	},
		  	history: [],
		  	caller: "[pjax]",
				container: "[pjax-container]",
				modalCaller: "[pjax-modal]",
				modalCloser: "[pjax-modal-closer]",
			  modalContainer: "[pjax-modal-container]",
			  $:{
					caller: $("[pjax]"),
					container: $("[pjax-container]"),
					modalCaller: $("[pjax-modal]"),
					modalCloser: $("[pjax-modal-closer]"),
					modalContainer: $("[pjax-modal-container]"),
				},		  	
		  }
	};
	
	var pjax = Global.pjax;
	var $pjax = Global.pjax.$;

	$(document).pjax(pjax.caller, pjax.container, pjax.options);
	$(document).pjax(pjax.modalCaller, pjax.modalContainer, pjax.options);

	$(document).on('pjax:send', function() {
  	// Save history
  	pjax.history.push(location.href);
  	// Clear modal content
  	$pjax.modalContainer.empty();

  	//mixpanel
  	mixpanel.track("PJAX Send");
	});
	
	$(document).on('pjax:complete', function(e) {		
  	
  	// Make update pjax content needs after it loads
  	modalLiveUpdate();
  	momentLiveUpdate();
  	highlightLiveUpdate();
  	analyticsLiveUpdate();
  	mixpanel.track("PJAX Complete");
  });

	$(document).on('pjax:end', function(e) {
		//keep
		mixpanel.track("PJAX End");
  });

	$(document).on('pjax:timeout', function (e, a, b){
		console.log(e);
		console.log(a);
		console.log(b);
		mixpanel.track("PJAX Timeout");
	});

  $(document).on('pjax:error', function(e, a, b) {
		//keep
		console.log(e);
		console.log(a);
		console.log(b);
		mixpanel.track("PJAX Error");
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
	highlightLiveUpdate();
	
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


	/** 
	 * Make PJAX work with bootstrap modals
	 * 	
	 * @see https://github.com/vimia/blew/issues/40
	 */
	var modalLiveUpdate = function() {
		var md = $('.modal[show]');
		
		md.modal({keyboard:false, show:true, backdrop:'static'});

		$(pjax.modalCloser).click(function(e){
			var el = $(this);
			var md = $(el.attr(pjax.modalCloser));
			md.modal('hide');
		});

		md.on('hidden.bs.modal', function (e) {
			var url = '/';
			if (pjax.history.length > 1) {
				var previous = pjax.history[pjax.history.length-1];
				if (previous != location.href) {
					url = previous;
				}
			}
			window.history.pushState(' ', ' ', previous);
		});
	};
	modalLiveUpdate();


	
	/** 
	 * Make PJAX work with GA.js
	 * 	
	 * @see https://github.com/vimia/blew/issues/35
	 */
	var analyticsLiveUpdate = function() {
		ga('send', 'pageview', location.pathname + location.search + location.hash);
	};
});