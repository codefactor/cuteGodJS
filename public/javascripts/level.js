var level = (function($) {
    var DATA = {
        '0,0': {
            0: {
                0: [2, 3, 4, 16],
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
                6: [2, 3, 4],
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

    return {
        getBlocksAround: function(tz, tx, bz, bx, by) {
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
            return $.Deferred().resolve(blocks);
        }
    };
})(jQuery);