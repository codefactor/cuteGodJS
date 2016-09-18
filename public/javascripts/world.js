(function($) {
    var socket = io();
    var levelData;

    socket.on('levelData', function(data) {
        levelData = data;
    });

    var $window = $(window);
    var $viewport = $('<div></div>').css({position: 'absolute', overflow: 'hidden', top: 0, right: 0, bottom: 0, left: 0}).appendTo('body');
    var $world = $('<div></div>').css({position: 'absolute'}).appendTo($viewport);

    centerWorld();
    renderTile(0, 0);
    $window.resize(centerWorld);

    function centerWorld() {
        var width = $window.width();
        var height = $window.height();
        $world.css({
            top: (height/2) - (meta.blockDepth*meta.tileDepth/2) + 'px',
            left: (width/2) - (meta.blockWidth*meta.tileWidth/2) + 'px'
        });
    }

    function renderTile(tz, tx) {
        $('<div></div>').attr({
            id: tz + '-' + tx
        }).css({
            zIndex: tz,
            position: 'absolute',
            top: tz * meta.blockDepth * meta.tileDepth + 'px',
            left: tx * meta.blockWidth * meta.tileWidth + 'px'
        }).appendTo($world);
        for (var bz = 0; bz < meta.tileDepth; bz++) {
            for (var bx = 0; bx < meta.tileWidth; bx++) {
                for (var by = 0; by < meta.tileHeight; by++) {
                    renderBlock(tz, tx, bz, bx, by);
                }
            }
        }
    }

    function renderBlock(tz, tx, bz, bx, by) {
        level.getBlocksAround(tz, tx, bz, bx, by).then(function(blocks) {
            var data = blocks[0][0][0];
            if (data) {
                var $block = $('<div></div>').attr({
                    id: tz + '-' + tx + '-' + bz + '-' + bx + '-' + by
                }).css({
                    zIndex: bz * meta.tileWidth * meta.tileHeight + bx * meta.tileHeight + by,
                    position: 'absolute',
                    top: bz * meta.blockDepth - by * meta.blockHeight + 'px',
                    left: bx * meta.blockWidth + 'px'
                }).appendTo('#' + tz + '-' + tx);
                $('<img ondragstart="return false">').attr({
                    src: meta.imagePrefix + data.state.imageSrc
                }).appendTo($block);
                $.each(getShadows(blocks), function(i, shadow) {
                    $('<img ondragstart="return false">').attr({
                        src: meta.imagePrefix + shadow.imageSrc
                    }).css({
                        position: 'absolute',
                        top: 0,
                        left: 0
                    }).appendTo($block);
                });
            }
        });
    }

    function getShadows(blocks) {
        var shadows = [];
        var data = blocks[0][0][0];
        if (data.info.shadow) {
            $.each(meta.shadows, function(i, shadow) {
                var placed = shadow.placed;
                var none = shadow.none;
                placed = blocks[placed[0]][placed[1]][placed[2]];
                if (placed && placed.info.shadow) {
                    var noblock = 0;
                    for (var j = 0; !noblock && j < none.length; j++) {
                        noblock = noblock || blocks[none[j][0]][none[j][1]][none[j][2]];
                    }
                    if (!noblock) {
                        shadows.push(shadow);
                    }
                }
            });
        }
        return shadows;
    }
})(jQuery);