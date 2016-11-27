(function($) {
	"use strict";

    var DATA = {
        '0,0': {
            0: {
                0: [2, 3, 4],
                1: [2, 3, 4],
                2: [2, 3, 4, 9],
                3: [2, 2, 2, 11, 11, [7, 7]],
                4: [2, 2, 6, 0, 0, [7, 0]],
                5: [2, 2, 2, 11, 11, [7, 1]],
                6: [2, 3, 4],
                7: [2, 3, 4]
            },
            1: {
                0: [2, 3, 4],
                1: [2, 3, 4],
                2: [2, 3, 4, 10],
                3: [2, 2, 2, 11, 11, [7, 6]],
                4: [2, 2, 6, 0, 0, 11],
                5: [2, 2, 2, 11, 11, [7, 2]],
                6: [2, 3, 4],
                7: [2, 3, 4]
            },
            2: {
                0: [2, 3, 4],
                1: [2, 3, 5],
                2: [2, 3, 5],
                3: [2, 2, 2, 11, 11, [7, 5]],
                4: [2, 2, 6, [13, 0], 0, [7, 4]],
                5: [2, 2, 2, 11, 11, [7, 3]],
                6: [2, 3, 4, -1, 0, 0, [18, 1]],
                7: [2, 3, 4]
            },
            3: {
                0: [2, 3, 4],
                1: [2, 3, 5],
                2: [2, 3, 5],
                3: [2, 3, 4],
                4: [2, 2, 2],
                5: [2, 2, 2],
                6: [2, 3, 3],
                7: [2, 3, 3]
            },
            4: {
                0: [2, 3, 4],
                1: [2, 3, 4],
                2: [2, 3, 4],
                3: [2, 3, 4],
                4: [2, 2, 2],
                5: [2, 3, 3],
                6: [2, 3, 3],
                7: [2, 3, 3]
            },
            5: {
                0: [1, 1, 2],
                1: [2],
                2: [2],
                3: [2],
                4: [2, 2, [8, 2]],
                5: [2],
                6: [2],
                7: [2]
            },
            6: {
                0: [2, 1, [8, 2]],
                1: [2],
                2: [2],
                3: [2],
                4: [2, [8, 2]],
                5: [2],
                6: [2],
                7: [2]
            },
            7: {
                0: [2, 2],
                1: [2, [8, 1]],
                2: [2],
                3: [2],
                4: [2],
                5: [2],
                6: [2],
                7: [2]
            }
        }
    };

	$(function() {
		function resize() {
			canvas.css({
				width: $(window).width() + 'px',
				height: $(window).height() + 'px'
			});
		}

		var body = $('body').css('overflow', 'hidden');
		var canvas = $('<canvas></canvas>').css({
			position: 'absolute',
			top: 0, left: 0,
			zIndex: 1
		}).appendTo(body);
		var ctx = canvas[0].getContext('2d');

		$(window).resize(resize);
		resize();

        track(images.level(meta)).done(function(images) {
            meta.images = images;
            // Render the scene
        });
	});
})(jQuery);