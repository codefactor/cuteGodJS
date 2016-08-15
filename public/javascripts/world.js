(function($) {
    "use strict";
    var TILE = {
        width : 8,
        depth : 8
    };
    var BLOCK = {
        depth : 80,
        width : 100,
        height : 41
    };
    var LEVEL = {
        '0,0' : {
            0 : {
                0 : [ 2, 3, 4 ],
                1 : [ 2, 3, 4 ],
                2 : [ 2, 3, 4 ],
                3 : [ 2, 2, 2, 11, 11, [ 7, 6 ] ],
                4 : [ 2, 2, 6, 0, 0, 11 ],
                5 : [ 2, 2, 2, 11, 11, [ 7, 2 ] ]
            },
            1 : {
                0 : [ 2, 3, 4 ],
                1 : [ 2, 3, 5 ],
                2 : [ 2, 3, 5 ],
                3 : [ 2, 2, 2, 11, 11, [ 7, 5 ] ],
                4 : [ 2, 2, 6, [ 13, 1 ], 0, [ 7, 4 ] ],
                5 : [ 2, 2, 2, 11, 11, [ 7, 3 ] ]
            },
            2 : {
                0 : [ 2, 3, 4 ],
                1 : [ 2, 3, 5 ],
                2 : [ 2, 3, 5 ],
                3 : [ 2, 3, 4 ],
                4 : [ 2, 2, 2 ]
            },
            3 : {
                0 : [ 2, 3, 4 ],
                1 : [ 2, 3, 4 ],
                2 : [ 2, 3, 4 ],
                3 : [ 2, 3, 4 ],
                4 : [ 2, 2, 2 ]
            },
            4 : {
                0 : [ 1, 1 ],
                1 : [ 1, 1 ],
                2 : [ 1, 1 ]
            },
            5 : {
                0 : [ 1 ],
                1 : [ 1, 1 ],
                2 : [ 1, [ 8, 1 ] ],
                3 : [ [ 8, 1 ] ]
            },
            6 : {
                0 : [ [ 8, 2 ] ]
            }
        }
    };
    $.widget('cuteplanet.world', {
        _create : function() {
            this.element.addClass('cplanet-world').css('margin-top', (5 * BLOCK.height) + 'px');
            var tile = $('<div class="cplanet-element cplanet-tile"></div>').appendTo(this.element);
            var tileMeta = LEVEL['0,0'];
            var blocksMeta = this.options.blocks;
            for ( var z = 0; z < TILE.depth; z++) {
                var row = $('<div class="cplanet-element cplanet-row"></div>').css('margin-top',
                        (BLOCK.depth * z) + 'px').appendTo(tile);
                var rowMeta = tileMeta[z] || {};
                for ( var x = 0; x < TILE.width; x++) {
                    var stackMeta = rowMeta[x];
                    if (stackMeta && stackMeta.length > 0) {
                        var stack = $('<div class="cplanet-element cplanet-stack"></div>').css('margin-left',
                                (BLOCK.width * x) + 'px').appendTo(row);
                        for ( var y = 0; y < stackMeta.length; y++) {
                            var blockItem = stackMeta[y];
                            if (typeof blockItem == 'number') {
                                blockItem = [ blockItem, 0 ];
                            }
                            var blockMeta = blocksMeta[blockItem[0]];
                            var stateMeta = blockMeta && blockMeta.states[blockItem[1]];
                            if (blockMeta && stateMeta) {
                                var block = $('<div class="cplanet-element cplanet-block"></div>').css('margin-top',
                                        (-BLOCK.height * y) + 'px').appendTo(stack);
                                $('<img>').attr('src', stateMeta.imageSrc).appendTo(block);
                            }
                        }
                    }
                }
            }
        }
    });
    var socket = io();
    socket.on('world init', function(config) {
        $('<div></div>').appendTo('body').world(config);
    });
})(jQuery);