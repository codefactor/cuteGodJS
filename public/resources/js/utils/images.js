(function($) {
	"use strict";
	window.images = {
		/**
		 * Get the Images for the current level.
		 *
		 * @param {Object} level
		 * @return {Promise.<Object>}
		 */
		level : function(level) {
			var srcArray = [];
			var srcFound = {};
			$.each(level.blocks, function(id, block) {
				$.each(block.states, function(i, state) {
					var src = meta.imagePrefix + state.imageSrc;
					// ensure srcArray contains only unique urls
					if (srcFound[src] !== true) {
						srcFound[src] = true;
						srcArray.push(src);
					}
				});
			});
			return this.load(srcArray);
		},

		/**
		 * @param {Array.<String>} srcArray
		 * @return {Promise.<Object>} Promise for Object storing all Images
		 */
		load : function(srcArray) {
			var dfd = $.Deferred();
			var images = {};
			var srcLength = srcArray.length;
			if (srcLength > 0) {
				var completed = 0;
				$.each(srcArray, function(i, src) {
					function done() {
						completed++;
						dfd.notify(completed, srcLength, 'Downloading: ' + completed + ' of ' + srcLength);
						if (completed == srcLength) {
							dfd.resolve(images);
						}
					}
					var image = new Image();
					image.onload = function() {
						images[src] = image;
						done();
					};
					image.onerror = done;
					image.src = src;
				});
			} else {
				dfd.resolve(images);
			}
			return dfd.promise();
		}
	}
})(jQuery);