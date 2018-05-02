/*
 * A very simple progressbar jQuery plugin. Can keep track of one or more promises and show
 * a progress bar indicating the % completion. The promise can optionally notify with arguments like
 * dfd.notify(count, total, message) to notify any progress along the way.
 * 
 * @example jQuery('body').progressbar(promise);
 */
(function($) {
	"use strict";
	/*
	 * A stateful Tracker object to be inserted into the jQuery data, in case multiple
	 * calls to progressbar are made on the same HTMLElement. There can be separate Trackers
	 * on the same page, if progressbar is called on a different HTMLElements.
	 * @inner
	 * @constructor
	 */
	function Tracker($this) {
		function fadeAway() {
			setTimeout(function(){
				if (fadingAway) {
					$('.progress', $this).fadeOut(function() {
						if (fadingAway) {
							$('.progress', $this).remove();
							fadingAway = false;
						}
					});
				}
			}, 100);
		}

		/**
		 * Called anytime the promise has progress, or completes.
		 * @inner
		 */
		function update() {
			var count = 0, 
				total = 0, 
				message = 0, 
				messageId = 0,
				finished = true,
				failed = false;

			// determine the aggregate state of all tracked progress
			$.each(tracker, function(id, progress) {
				if (progress.finished) {
					if (progress.failed) {
						failed = true;
					}
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

			// now update the progressbar view
			var progressEl = $('.progress', $this);

			// create the progress element if not created already
			if (progressEl.length === 0 && !finished) {
				progressEl = $('<div class="progress"><div class="meter"><span class="bar" style="width:0"></span></div></div>').appendTo($this);
			} else {
				// stop any animations currently happening
				$('.progress, .progress .bar', $this).stop();
			}

			// if fading away and not finished, then fade back in
			if (fadingAway && !finished) {
				progressEl.fadeIn();
				fadingAway = false;	
			}

			// update the progress message
			var msgEl = $('.message', progressEl);
			var hasMessage = typeof message === 'string' && message.length > 0;
			var messageExists = msgEl.length > 0;
			if (hasMessage && !messageExists) {
				// create the message element if it doesn't exist yet
				msgEl = $('<span class="message"></span>').appendTo(progressEl);
			}
			if (hasMessage) {
				// update the text of the message element
				msgEl.text(message);
			} else if (messageExists) {
				// remove the message element, it is no longer required
				msgEl.remove();
			}

			var bar = $('.bar', progressEl);

			// if everything is finished then start fading away
			if (finished) {

				if (failed) {
					$('.meter', progressEl).addClass('red');
				}

				tracker = {};
				fadingAway = true;

				if (failed) {
					setTimeout(fadeAway, 2000);
				} else {
					bar.animate({
						width : '100%'
					}, 100, null, fadeAway);
				}
			} else {
				// animate the bar's width to the progress percent
				bar.animate({
					width: Math.round(100 * count / total) + '%'
				});
			}
		}
	
		var trackerId = 0; // Starts at 0 and increments
		var tracker = {}; // Stores all progress indicators
		var fadingAway = false;

		this.add = function(promise) {
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
			promise.always(function(message) {
				progress.message = message;
				progress.finished = true;
				update();
			});
		}
	}

	$.fn.progressbar = function(promise) {
		var _this = this;
		// ignore promises if they resolve too quickly
		setTimeout(function() {
			if (promise.state() == 'pending') {
				var tracker = _this.data('progressbar-tracker');
				if (!tracker) {
					tracker = new Tracker(_this);
					_this.data('progressbar-tracker', tracker);
				}
				tracker.add(promise);
			}
		}, 100);
		return this;
	};
})(jQuery);