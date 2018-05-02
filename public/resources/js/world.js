$(function() {
    "use strict";

    var socket, world, container = $('body');

    function initTile(tile, data) {
        var tiles = $('<div></div>').css({
            position: 'relative'
        }).appendTo(container);
        var tile = createTile(tile, data).css({
            position: 'absolute',
            top: 0, left: 0
        });
        tile.appendTo(tiles);
        var tile2 = createTile(tile, data).css({
            position: 'absolute',
            top: (world.tileDepth * world.blockDepth) + 'px',
            left: 0
        });
        tile2.appendTo(tiles);
    }

    function createTile(tile, data) {
        var canvas = $('<canvas></canvas>').attr({
            width: (world.tileWidth * world.blockWidth),
            height: (world.tileDepth * world.blockDepth + world.blockHeight * world.tileHeight)
        });
        var ctx = canvas[0].getContext('2d');
        for (var bz=0; bz<world.tileDepth; bz++) {
            var slice = data[bz];
            if (!slice) continue;
            for (var bx=0; bx<world.tileWidth; bx++) {
                var column = slice[bx];
                if (!column) continue;
                for (var by=0, h=Math.min(world.tileHeight, column.length); by<h; by++) {
                    var block = column[by];
                    var state = 0;
                    if ($.isArray(block)) {
                        state = block[1];
                        block = block[0];
                    }
                    block = world.blocks[block];
                    state = block && block.states[state];
                    var image = state && world.images[world.imagePrefix + state.imageSrc];
                    if (!image) continue;
                    var lEdge = bx * world.blockWidth;
                    var bEdge = (bz+1) * world.blockDepth + (world.tileHeight-by) * world.blockHeight;
                    ctx.drawImage(image, lEdge, bEdge - image.height);
                }
            }
        }
        return $('<div></div>').append(canvas);
    }

    function loadImages(srcArray) {
        var dfd = $.Deferred();
        var images = {};
        var srcLength = srcArray.length;
        if (srcLength > 0) {
            var completed = 0;
            $.each(srcArray, function(i, src) {
                function done() {
                    completed++;
                    dfd.notify(completed, srcLength, 'Downloading Image: [' + completed + ' of ' + srcLength + '] ' + src);
                    if (completed == srcLength) {
                        dfd.resolve(images);
                    }
                }
                var image = new Image();
                image.onload = function() {
                    images[src] = image;
                    done();
                };
                image.onerror = function() {
                    dfd.reject('Error downloading: ' + src);
                };
                image.src = src;
            });
        } else {
            dfd.resolve(images);
        }
        return dfd.promise();
    }

    function getImageSrcArray() {
        function add(i, state) {
            var src = world.imagePrefix + state.imageSrc;
            if (srcFound[src] !== true) {
                srcFound[src] = true;
                srcArray.push(src);
            }
        }
        var srcArray = [];
        var srcFound = {};
        $.each(world.shadows, add);
        $.each(world.blocks, function(id, block) {
            $.each(block.states, add);
        });
        return srcArray;
    }

    function init() {
        socket = io();
        socket.on('tile init', initTile);
        socket.emit('watch', '0,0');
    }

    $.ajax('/resources/content/world.json').done(function(response) {
        world = response;
        container.progressbar(loadImages(getImageSrcArray()).then(function(images) {
            world.images = images;
            init();
            return 'Finished!';
        }));
    }).fail(function() {
        alert('Fatal error loading content');
    });
});