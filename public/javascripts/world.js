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
                // TODO: Shadows
            }
        });
    }

    tile(0, 0);
    tile(-1, 0);
    tile(-1, -1);
    tile(0, -1);
})(jQuery);