/*
 * Progress singleton tracks one or more Promises for progress, 
 * displaying a single global progress indicator.
 */
(function($) {
	"use strict";
	var trackerId = 0; // Starts at 0 and increments
	var tracker = {}; // Stores all progress indicators
	var fadingAway = false;

	/**
	 * @inner
	 */
	function update() {
		var count = 0, 
			total = 0, 
			message = 0, 
			messageId = 0,
			finished = true;

		// Check all tracked progress indicators
		$.each(tracker, function(id, progress) {
			if (progress.finished) {
				count += 100;
				total += 100;
			} else if (!isNaN(progress.count) && !isNaN(progress.total)) {
				finished = false;
				count += Math.min(progress.count, progress.total);
				total += progress.total;
			} else {
				finished = false;
				total += 100;
			}
			if (id > messageId && progress.message) {
				message = progress.message;
				messageId = id;
			}
		});

		// Stop any animations that were happening
		$('#progress, #progress .bar').stop();

		if (!finished && fadingAway) {
			$('#progress').fadeIn();
			fadingAway = false;	
		}

		// Update the message
		var msgEl = $('#progress .message');
		if (message && typeof message == 'string') {
			if (!msgEl.length) {
				msgEl = $('<span class="message"></span>').appendTo('#progress');
			}
			msgEl.text(message);
		} else {
			msgEl.remove();
		}

		// Update the bar position
		var bar = $('#progress .bar');
		if (!bar.length) {
			bar = $('<span class="bar"></span>').appendTo($('<div id="progress"></div>').appendTo('body'));
			bar.css('width', 0);
		}

		// If count is 0, do not animate the width
		bar.animate({
			width: Math.round(100 * count / total) + '%'
		});

		// Fade away the indicator, if everything finished
		if (finished) {
			tracker = {};
			fadingAway = true;
			$('#progress .bar').animate({
				width : '100%'
			}, 100, null, function() {
				setTimeout(function(){
					if (fadingAway) {
						$('#progress').fadeOut(function() {
							$('#progress').remove();
							fadingAway = false;
						});
					}
				}, 100);
			});
		}
	}

	/**
	 * @param {Promise} promise
	 */
	window.track = function(promise) {
		// Ignore anything resolved within 100 milliseconds to avoid unnecessary status updates
		setTimeout(function() {
			if (promise.state() == 'pending') {
				var progress = tracker[++trackerId] = {
					finished : false,
					count : 0,
					total : 1
				};
				promise.progress(function(count, total, message){
					if (typeof count == 'object') {
						var event = count;
						count = event.count;
						total = event.total;
						message = event.message;
					}
					progress.count = count;
					progress.total = total;
					progress.message = message;
					update();
				});
				promise.fail(function() {
					progress.failed = true;
				});
				promise.always(function() {
					progress.finished = true;
					update();
				});
			}0
		}, 100);
		return promise;
	};
})(jQuery);