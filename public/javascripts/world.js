(function($) {
    function tile(tz, tx) {
        $('<div class="tile"></div>').attr({
            id: tz + '-' + tx
        }).css({
            zIndex: tz,
            marginTop: tz * meta.blockDepth * meta.tileDepth + 'px',
            marginLeft: tx * meta.blockWidth * meta.tileWidth + 'px'
        }).appendTo('#world');
        for (var bz = 0; bz < meta.tileDepth; bz++) {
            for (var bx = 0; bx < meta.tileWidth; bx++) {
                for (var by = 0; by < meta.tileHeight; by++) {
                    block(tz, tx, bz, bx, by);
                }
            }
        }
    }

    function block(tz, tx, bz, bx, by) {
        level.getBlocksAround(tz, tx, bz, bx, by).then(function(blocks) {
            var data = blocks[0][0][0];
            if (data) {
                var $block = $('<div class="block"></div>').attr({
                    id: tz + '-' + tx + '-' + bz + '-' + bx + '-' + by
                }).css({
                    zIndex: bz * meta.tileWidth * meta.tileHeight + bx * meta.tileHeight + by,
                    marginTop: bz * meta.blockDepth - by * meta.blockHeight + 'px',
                    marginLeft: bx * meta.blockWidth + 'px'
                }).appendTo('#' + tz + '-' + tx);
                $('<img ondragstart="return false">').attr({
                    src: meta.imagePrefix + data.state.imageSrc
                }).appendTo($block);
                data.info.shadow && $.each(meta.shadows, function(i, shadow) {
                    var placed = shadow.placed;
                    var none = shadow.none;
                    placed = blocks[placed[0]][placed[1]][placed[2]];
                    if (placed && placed.info.shadow) {
                        var noblock = 0;
                        for (var j = 0; !noblock && j < none.length; j++) {
                            noblock = noblock || blocks[none[j][0]][none[j][1]][none[j][2]];
                        }
                        if (!noblock) {
                            $('<img ondragstart="return false">').attr({
                                src: meta.imagePrefix + shadow.imageSrc
                            }).css({
                                position: 'absolute',
                                top: '0',
                                left: '0'
                            }).appendTo($block);
                        }
                    }
                });
            }
        });
    }

    tile(0, 0);
    // tile(-1, 0);
    // tile(-1, -1);
    // tile(0, -1);
})(jQuery);