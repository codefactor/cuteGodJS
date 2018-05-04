$(function() {
    "use strict";

    function initTile(tz, tx, data) {
        createTile(tz, tx, data).css({
            position: 'absolute',
            zIndex: tz,
            top: tz * world.tileDepth * world.blockDepth - world.offsetY + 'px',
            left: tx * world.tileWidth * world.blockWidth + 'px'
        }).appendTo(tiles);
    }

    function createTile(tz, tx, data) {
        var canvas = $('<canvas></canvas>').attr({
            id: 'tile-'+tz+'-'+tx,
            width: world.tileWidth * world.blockWidth,
            height: world.tileDepth * world.blockDepth + world.tileOverlapY
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
                    var bEdge = (bz+1) * world.blockDepth + (world.tileHeight-by+1) * world.blockHeight;
                    ctx.drawImage(image, lEdge, bEdge - image.height);
                }
            }
        }
        return canvas;
    }

    function updateVisibleTiles() {
        var visibleTiles = getVisibleTiles();
        var needsWatch = {};
        visibleTiles.forEach(function(tile) {
            var id = tile[0]+','+tile[1];
            needsWatch[id] = tile;
            if (!watching[id]) {
                socket.emit('start watching', tile[0], tile[1]);
            }
        });
        var stopWatching = [];
        for (var id in watching) {
            if (!needsWatch[id]) {
                var tile = watching[id];
                socket.emit('stop watching', tile[0], tile[1]);
                $('#tile-'+id).remove();
            }
        }
        watching = needsWatch;
    }

    function getVisibleTiles() {
        var cWidth = container.width();
        var cHeight = container.height();
        var tWidth = world.tileWidth * world.blockWidth;
        var tHeight = world.tileDepth * world.blockDepth;
        var left = Math.floor((-cWidth / 2 - position[0]) / tWidth);
        var top = Math.floor((-cHeight / 2 - position[1] + world.offsetY) / tHeight) - 1;
        var width = Math.ceil(cWidth / tWidth) + 1;
        var height = Math.ceil((cHeight + world.tileOverlapY) / tHeight) + 1;
        var tiles = [];
        for (var i=0; i<height; i++) {
            for (var j=0; j<width; j++) {
                tiles.push([top+i, left+j]);
            }
        }
        return tiles;
    }

    function setPosition(position) {
        tiles.css({
            marginLeft: position[0] + 'px',
            marginTop: position[1] + 'px'
        });
        updateVisibleTiles();
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
        var lastPoint;
        container = $('<div></div>').css({
            position: 'fixed',
            top: 0, left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden'
        })
        .appendTo('body')
        .bind({
            'mousedown touchstart': function(e) {
                e.preventDefault();
                if (e.touches && e.touches.length > 0) {
                    e = e.touches[0];
                }
                lastPoint = [e.pageX, e.pageY];
            },
            'mouseup touchend' : function(e) {
                e.preventDefault();
                lastPoint = null;
            },
            'mousemove touchmove': function(e) {
                e.preventDefault();
                if (e.touches && e.touches.length > 0) {
                    e = e.touches[0];
                }
                if (lastPoint) {
                    var newPoint = [e.pageX, e.pageY];
                    position[0] += newPoint[0] - lastPoint[0];
                    position[1] += newPoint[1] - lastPoint[1];
                    lastPoint = newPoint;
                    setPosition(position);
                }
            }
        });

        tiles = $('<div></div>').css({
            position: 'absolute',
            top: '50%',
            left: '50%'
        }).appendTo(container);

        socket = io();
        socket.on('tile init', initTile);

        $(window).resize(updateVisibleTiles);
        updateVisibleTiles();
    }

    var socket, world, tiles, container, watching = {}, position = [0, 0];

    $.ajax('/resources/content/world.json').done(function(response) {
        world = response;
        $('body').progressbar(loadImages(getImageSrcArray()).then(function(images) {
            world.images = images;
            world.offsetY = world.blockHeight * (world.tileHeight+1);
            world.tileOverlapY = world.blockHeight * (world.tileHeight+1);
            init();
            return 'Finished!';
        }));
    }).fail(function() {
        alert('Fatal error loading content');
    });
});