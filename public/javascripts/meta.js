var meta = {
    imagePrefix: '/images/PlanetCute PNG/',
    tileWidth: 8,
    tileDepth: 8,
    tileHeight: 8,
    blockDepth: 80,
    blockWidth: 100,
    blockHeight: 41,
    blocks: {
        '-1': {
            name : 'Selector',
            shadow : false,
            states : [{
                imageSrc: 'Selector.png'
            }]
        },
        1: {
            name: 'Plain',
            shadow: true,
            states: [{
                imageSrc: 'Plain Block.png',
                edgeHeights: [1, 1, 1, 1]
            }]
        },
        2: {
            name: 'Stone',
            shadow: true,
            states: [{
                imageSrc: 'Stone Block.png',
                edgeHeights: [1, 1, 1, 1]
            }, {
                imageSrc: 'Stone Block Tall.png',
                edgeHeights: [2, 2, 2, 2]
            }]
        },
        3: {
            name: 'Dirt',
            shadow: true,
            states: [{
                imageSrc: 'Dirt Block.png',
                edgeHeights: [1, 1, 1, 1]
            }]
        },
        4: {
            name: 'Grass',
            shadow: true,
            states: [{
                imageSrc: 'Grass Block.png',
                edgeHeights: [1, 1, 1, 1]
            }]
        },
        5: {
            name: 'Water',
            states: [{
                imageSrc: 'Water Block.png',
                edgeHeights: [1, 1, 1, 1]
            }]
        },
        6: {
            name: 'Brown',
            shadow: true,
            states: [{
                imageSrc: 'Brown Block.png',
                edgeHeights: [1, 1, 1, 1]
            }]
        },
        7: {
            name: 'Roof',
            states: [{
                name: 'North',
                imageSrc: 'Roof North.png',
                edgeHeights: [0, .5, .5, 1]
            }, {
                name: 'NorthEast',
                imageSrc: 'Roof North East.png',
                edgeHeights: [0, 0, .5, .5]
            }, {
                name: 'East',
                imageSrc: 'Roof East.png',
                edgeHeights: [.5, 0, .5, 1]
            }, {
                name: 'SouthEast',
                imageSrc: 'Roof South East.png',
                edgeHeights: [.5, 0, 0, .5]
            }, {
                name: 'South',
                imageSrc: 'Roof South.png',
                edgeHeights: [1, .5, 0, .5]
            }, {
                name: 'SouthWest',
                imageSrc: 'Roof South West.png',
                edgeHeights: [.5, .5, 0, 0]
            }, {
                name: 'West',
                imageSrc: 'Roof West.png',
                edgeHeights: [.5, 1, .5, 0]
            }, {
                name: 'NorthWest',
                imageSrc: 'Roof North West.png',
                edgeHeights: [0, .5, .5, 0]
            }]
        },
        8: {
            name: 'Ramp',
            states: [{
                name: 'North',
                imageSrc: 'Ramp North.png',
                edgeHeights: [0, .5, 1, .5]
            }, {
                name: 'East',
                imageSrc: 'Ramp East.png',
                edgeHeights: [.5, 0, .5, 1]
            }, {
                name: 'South',
                imageSrc: 'Ramp South.png',
                edgeHeights: [1, .5, 0, .5]
            }, {
                name: 'West',
                imageSrc: 'Ramp West.png',
                edgeHeights: [.5, 1, .5, 0]
            }]
        },
        9: {
            name: 'Rock',
            states: [{
                name: 'Rock',
                imageSrc: 'Rock.png',
                edgeHeights: [1, 1, 1, 1]
            }]
        },
        10: {
            name: 'Tree',
            states: [{
                imageSrc: 'Tree Short.png',
                edgeHeights: [1, 1, 1, 1]
            }, {
                name: 'Ugly',
                imageSrc: 'Tree Ugly.png',
                edgeHeights: [1, 1, 1, 1]
            }, {
                name: 'Tall',
                imageSrc: 'Tree Tall.png',
                edgeHeights: [2, 2, 2, 2]
            }]
        },
        11: {
            name: 'Wood',
            shadow: true,
            states: [{
                imageSrc: 'Wood Block.png',
                edgeHeights: [1, 1, 1, 1]
            }]
        },
        12: {
            name: 'Window',
            states: [{
                imageSrc: 'Window Tall.png',
                edgeHeights: [2, 2, 2, 2]
            }]
        },
        13: {
            name: 'Door',
            states: [{
                name: 'Closed',
                imageSrc: 'Door Tall Closed.png',
                edgeHeights: [2, 2, 2, 2]
            }, {
                name: 'Open',
                imageSrc: 'Door Tall Open.png',
                edgeHeights: [0, 0, 0, 0]
            }]
        },
        14: {
            name: 'Wall',
            shadow: true,
            states: [{
                imageSrc: 'Wall Block.png',
                edgeHeights: [1, 1, 1, 1]
            }, {
                imageSrc: 'Wall Block Tall.png',
                edgeHeights: [2, 2, 2, 2]
            }]
        },
        15: {
            name: 'Heart',
            states: [{
                imageSrc: 'Heart.png',
                edgeHeights: [1, 1, 1, 1]
            }]
        },
        16: {
            name: 'Key',
            states: [{
                imageSrc: 'Key.png',
                edgeHeights: [1, 1, 1, 1]
            }]
        },
        17: {
            name: 'Gem',
            states: [{
                name: 'Blue',
                imageSrc: 'Gem Blue.png',
                edgeHeights: [1, 1, 1, 1]
            }, {
                name: 'Green',
                imageSrc: 'Gem Green.png',
                edgeHeights: [1, 1, 1, 1]
            }, {
                name: 'Orange',
                imageSrc: 'Gem Orange.png',
                edgeHeights: [1, 1, 1, 1]
            }]
        },
        18: {
            name: 'Character',
            states: [{
                name: 'Boy',
                imageSrc: 'Character Boy.png'
            }, {
                name: 'Cat Girl',
                imageSrc: 'Character Cat Girl.png'
            }, {
                name: 'Horn Girl',
                imageSrc: 'Character Horn Girl.png'
            }, {
                name: 'Pink Girl',
                imageSrc: 'Character Pink Girl.png'
            }, {
                name: 'Princess Girl',
                imageSrc: 'Character Princess Girl.png'
            }]
        }
    },
    shadows: [{
        imageSrc: 'Shadow South.png',
        placed: [1, 0, 1],
        none: [[0, 0, 1]]
    }, {
        imageSrc: 'Shadow South West.png',
        placed: [1, -1, 1],
        none: [[0, 1, 1], [0, 0, 1], [0, -1, 1]]
    }, {
        imageSrc: 'Shadow West.png',
        placed: [0, -1, 1],
        none: [[0, 0, 1]]
    }, {
        imageSrc: 'Shadow North West.png',
        placed: [-1, -1, 1],
        none: [[-1, 0, 1], [0, 0, 1], [0, -1, 1]]
    }, {
        imageSrc: 'Shadow North.png',
        placed: [-1, 0, 1],
        none: [[0, 0, 1]]
    }, {
        imageSrc: 'Shadow North East.png',
        placed: [-1, 1, 1],
        none: [[-1, 0, 1], [0, 0, 1]]
    }, {
        imageSrc: 'Shadow East.png',
        placed: [0, 1, 1],
        none: [[0, 0, 1]]
    }, {
        imageSrc: 'Shadow South East.png',
        placed: [1, 1, 1],
        none: [[0, 1, 1], [0, 0, 1]]
    }, {
        imageSrc: 'Shadow Side West.png',
        placed: [1, -1, 0],
        none: [[1, 0, 0]]
    }]
};