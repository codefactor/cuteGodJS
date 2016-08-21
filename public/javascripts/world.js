(function ($) {
    var $context = $('body').addClass('cutePlanet');
    var $viewport = $('<div class="viewport"></div>').appendTo($context);
    var $world = $('<div class="world"></div>').appendTo($viewport);

    function tile(tz, tx) {
        var tid = tz + '-' + tx;
        var $tile = $('<div id="t-' + tid + '" class="tile"></div>').css({
            zIndex: tz,
            marginTop: tz * meta.blockDepth * meta.tileDepth + 'px',
            marginLeft: tx * meta.blockWidth * meta.tileWidth + 'px'
        }).appendTo($world);
        var when = [];
        for (var bz = 0; bz < meta.tileDepth; bz++) {
            for (var bx = 0; bx < meta.tileWidth; bx++) {
                for (var by = 0; by < meta.tileHeight; by++) {
                    (function (bz, bx, by) {
                        when.push(level.getBlocksAround(tz, tx, bz, bx, by).then(function (blocks) {
                            var bdata = blocks[0][0][0];
                            if (!bdata.empty) {
                                var $block = $('<div id="b-' + tid + '-' + bz + '-' + bx + '-' + by + '" class="block"></div>').css({
                                    zIndex: bz * meta.tileWidth * meta.tileHeight + bx * meta.tileHeight + by,
                                    marginTop: bz * meta.blockDepth - by * meta.blockHeight + 'px',
                                    marginLeft: bx * meta.blockWidth + 'px'
                                }).appendTo($tile);
                                $('<img ondragstart="return false">').attr({
                                    src: meta.imagePrefix + bdata.state.imageSrc
                                }).appendTo($block);
                            }
                        }));
                    })(bz, bx, by);
                }
            }
        }
        return $.when.apply($, when);
    }

    tile(0, 0);
    tile(-1, 0);
    tile(-1, -1);
    tile(0, -1);
})(jQuery);