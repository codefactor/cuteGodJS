(function($) {
    //var socket = io();
    //socket.on('updates', function(blocks) {
    //});
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

    var $window = $(window);
    var $viewport = $('<div></div>').css({
        position: 'absolute', 
        overflow: 'hidden', 
        top: 0, 
        right: 0, 
        bottom: 0, 
        left: 0
    }).appendTo('body');
    var $world = $('<div></div>').css({
        position: 'absolute'
    }).appendTo($viewport);

    centerWorld();
    renderTile(0, 0);
    $window.resize(centerWorld);
    setTimeout(function() {
        makeChanges([{
            type : 'remove',
            location : [0, 0, 2, 6, 3]
        }, {
            type : 'move',
            location : [0, 0, 2, 6, 6],
            to : [0, 0, 2, 6, 3]
        }, {
            type : 'move',
            location : [0, 0, 2, 0, 2],
            to : [0, 0, 2, 0, 5]
        }, {
            type : 'add',
            location : [0, 0, 2, 0, 2],
            block : -1
        }]);
    }, 5000);

    function makeChanges(changes) {
        changes.forEach(change);
    }

    function change(change) {
        switch(change.type) {
        case 'add':
            add(change.location, change.block);
        case 'remove':
            remove(change.location);
            break;
        case 'move':
            move(change.location, change.to);
            break;
        }
    }

    function add(location, block) {
    }

    function remove(location) {
        $('#'+location.join('-')).removeAttr('id').fadeOut(function() {
            $(this).remove();
        });
    }

    function move(location, to) {
        var block = $('#'+location.join('-'));
        block.attr('id', to.join('-'));
        block.animate(position(to));
    }

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
                    var location = [tz, tx, bz, bx, by];
                    renderBlock(location, blocksAround(location));
                }
            }
        }
    }

    function renderBlock(location, blocks) {
        var data = blocks[0][0][0];
        if (data) {
            var $block = $('<div></div>').attr({
                id: location.join('-')
            }).css($.extend({
                position: 'absolute'
            }, position(location))).appendTo('#' + location[0] + '-' + location[1]);
            $('<img ondragstart="return false">').attr({
                src: meta.imagePrefix + data.state.imageSrc
            }).appendTo($block);
            renderShadow($block, blocks);
        }
    }

    function renderShadow($block, blocks) {
        var shadows = [];
        var data = blocks[0][0][0];
        if (data && data.info.shadow) {
            $.each(meta.shadows, function(i, shadow) {
                var placed = shadow.placed;
                var none = shadow.none;
                placed = blocks[placed[0]][placed[1]][placed[2]];
                if (placed && placed.info.shadow) {
                    var noblock = 0;
                    for (var j = 0; !noblock && j < none.length; j++) {
                        noblock = noblock || blocks[none[j][0]][none[j][1]][none[j][2]];
                        if (noblock && !noblock.info.shadow) {
                            noblock = 0;
                        }
                    }
                    if (!noblock) {
                        shadows.push(shadow);
                    }
                }
            });
        }
        $('.shadow', $block).remove();
        $.each(shadows, function(i, shadow) {
            $('<img ondragstart="return false" class="shadow">').attr({
                src: meta.imagePrefix + shadow.imageSrc
            }).css({
                position: 'absolute',
                top: 0,
                left: 0
            }).appendTo($block);
        });
        return shadows;
    }

    function position(location) {
        var bz=location[2], bx=location[3], by=location[4];
        return {
            zIndex: bz * meta.tileWidth * meta.tileHeight + bx * meta.tileHeight + by,
            top: bz * meta.blockDepth - by * meta.blockHeight + 'px',
            left: bx * meta.blockWidth + 'px'
        };
    }

    function blocksAround(location) {
        var tz=location[0], tx=location[1], bz=location[2], bx=location[3], by=location[4];
        var blocks = {};
        for (var z = -1; z <= 1; z++) {
            var bzc = bz + z;
            var bzd = Math.floor(bzc / meta.tileDepth);
            var tzc = tz + bzd;
            bzc = (bzc + meta.tileDepth) % meta.tileDepth;
            blocks[z] = {};
            for (var x = -1; x <= 1; x++) {
                var bxc = bx + x;
                var bxd = Math.floor(bxc / meta.tileWidth);
                var txc = tx + bxd;
                bxc = (bxc + meta.tileWidth) % meta.tileWidth;
                blocks[z][x] = {};
                for (var y = -1; y <= 1; y++) {
                    var byc = by + y;
                    var block = DATA[tzc + ',' + txc];
                    block = block && block[bzc];
                    block = block && block[bxc];
                    block = block && block[byc];
                    blocks[z][x][y] = 0;
                    if (block) {
                        if (!$.isArray(block)) {
                            block = [block, 0];
                        }
                        var info = meta.blocks[block[0]];
                        var state = info && info.states[block[1]];
                        if (info && state) {
                            blocks[z][x][y] = {
                                info: info,
                                state: state
                            };
                        }
                    }
                }
            }
        }
        return blocks;
    }
})(jQuery);