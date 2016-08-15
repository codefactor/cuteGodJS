module.exports = {
    shadows: [{
        imageSrc: '/images/PlanetCute PNG/Shadow South.png',
        placed: [0, 1, 1]
    }, {
        imageSrc: '/images/PlanetCute PNG/Shadow South West.png',
        placed: [-1, 1, 1],
        none: [-1, 1, 0]
    }, {
        imageSrc: '/images/PlanetCute PNG/Shadow West.png',
        placed: [-1, 1, 0]
    }, {
        imageSrc: '/images/PlanetCute PNG/Shadow North West.png',
        placed: [-1, 1, -1],
        none: [0, 1, -1]
    }, {
        imageSrc: '/images/PlanetCute PNG/Shadow North.png',
        placed: [0, 1, -1]
    }, {
        imageSrc: '/images/PlanetCute PNG/Shadow North East.png',
        placed: [1, 1, -1],
        none: [0, 1, -1]
    }, {
        imageSrc: '/images/PlanetCute PNG/Shadow East.png',
        placed: [1, 1, 0]
    }, {
        imageSrc: '/images/PlanetCute PNG/Shadow South East.png',
        placed: [1, 1, 1],
        none: [1, 1, 0]
    }, {
        imageSrc: '/images/PlanetCute PNG/Shadow Side West.png',
        placed: [-1, 0, 1]
    }],
    blocks: {
        1: {
            name: 'Plain',
            shadow : true,
            states: [{
                imageSrc: '/images/PlanetCute PNG/Plain Block.png',
                edgeHeights: [1, 1, 1, 1]
            }]
        },
        2: {
            name: 'Stone',
            shadow : true,
            states: [{
                imageSrc: '/images/PlanetCute PNG/Stone Block.png',
                edgeHeights: [1, 1, 1, 1]
            }, {
                imageSrc: '/images/PlanetCute PNG/Stone Block Tall.png',
                edgeHeights: [2, 2, 2, 2]
            }]
        },
        3: {
            name: 'Dirt',
            shadow : true,
            states: [{
                imageSrc: '/images/PlanetCute PNG/Dirt Block.png',
                edgeHeights: [1, 1, 1, 1]
            }]
        },
        4: {
            name: 'Grass',
            shadow : true,
            states: [{
                imageSrc: '/images/PlanetCute PNG/Grass Block.png',
                edgeHeights: [1, 1, 1, 1]
            }]
        },
        5: {
            name: 'Water',
            states: [{
                imageSrc: '/images/PlanetCute PNG/Water Block.png',
                edgeHeights: [1, 1, 1, 1]
            }]
        },
        6: {
            name: 'Brown',
            shadow : true,
            states: [{
                imageSrc: '/images/PlanetCute PNG/Brown Block.png',
                edgeHeights: [1, 1, 1, 1]
            }]
        },
        7: {
            name: 'Roof',
            states: [{
                name: 'North',
                imageSrc: '/images/PlanetCute PNG/Roof North.png',
                edgeHeights: [0, .5, .5, 1]
            }, {
                name: 'NorthEast',
                imageSrc: '/images/PlanetCute PNG/Roof North East.png',
                edgeHeights: [0, 0, .5, .5]
            }, {
                name: 'East',
                imageSrc: '/images/PlanetCute PNG/Roof East.png',
                edgeHeights: [.5, 0, .5, 1]
            }, {
                name: 'SouthEast',
                imageSrc: '/images/PlanetCute PNG/Roof South East.png',
                edgeHeights: [.5, 0, 0, .5]
            }, {
                name: 'South',
                imageSrc: '/images/PlanetCute PNG/Roof South.png',
                edgeHeights: [1, .5, 0, .5]
            }, {
                name: 'SouthWest',
                imageSrc: '/images/PlanetCute PNG/Roof South West.png',
                edgeHeights: [.5, .5, 0, 0]
            }, {
                name: 'West',
                imageSrc: '/images/PlanetCute PNG/Roof West.png',
                edgeHeights: [.5, 1, .5, 0]
            }, {
                name: 'NorthWest',
                imageSrc: '/images/PlanetCute PNG/Roof North West.png',
                edgeHeights: [0, .5, .5, 0]
            }]
        },
        8: {
            name: 'Ramp',
            states: [{
                name: 'North',
                imageSrc: '/images/PlanetCute PNG/Ramp North.png',
                edgeHeights: [0, .5, 1, .5]
            }, {
                name: 'East',
                imageSrc: '/images/PlanetCute PNG/Ramp East.png',
                edgeHeights: [.5, 0, .5, 1]
            }, {
                name: 'South',
                imageSrc: '/images/PlanetCute PNG/Ramp South.png',
                edgeHeights: [1, .5, 0, .5]
            }, {
                name: 'West',
                imageSrc: '/images/PlanetCute PNG/Ramp West.png',
                edgeHeights: [.5, 1, .5, 0]
            }]
        },
        9: {
            name: 'Rock',
            states: [{
                name: 'Rock',
                imageSrc: '/images/PlanetCute PNG/Rock.png',
                edgeHeights: [1, 1, 1, 1]
            }]
        },
        10: {
            name: 'Tree',
            states: [{
                imageSrc: '/images/PlanetCute PNG/Tree Short.png',
                edgeHeights: [1, 1, 1, 1]
            }, {
                name: 'Ugly',
                imageSrc: '/images/PlanetCute PNG/Tree Ugly.png',
                edgeHeights: [1, 1, 1, 1]
            }, {
                name: 'Tall',
                imageSrc: '/images/PlanetCute PNG/Tree Tall.png',
                edgeHeights: [2, 2, 2, 2]
            }]
        },
        11: {
            name: 'Wood',
            shadow : true,
            states: [{
                imageSrc: '/images/PlanetCute PNG/Wood Block.png',
                edgeHeights: [1, 1, 1, 1]
            }]
        },
        12: {
            name: 'Window',
            states: [{
                imageSrc: '/images/PlanetCute PNG/Window Tall.png',
                edgeHeights: [2, 2, 2, 2]
            }]
        },
        13: {
            name: 'Door',
            states: [{
                name: 'Closed',
                imageSrc: '/images/PlanetCute PNG/Door Tall Closed.png',
                edgeHeights: [2, 2, 2, 2]
            }, {
                name: 'Open',
                imageSrc: '/images/PlanetCute PNG/Door Tall Open.png',
                edgeHeights: [0, 0, 0, 0]
            }]
        },
        14: {
            name: 'Wall',
            shadow : true,
            states: [{
                imageSrc: '/images/PlanetCute PNG/Wall Block.png',
                edgeHeights: [1, 1, 1, 1]
            }, {
                imageSrc: '/images/PlanetCute PNG/Wall Block Tall.png',
                edgeHeights: [2, 2, 2, 2]
            }]
        },
        15: {
            name: 'Heart',
            states: [{
                imageSrc: '/images/PlanetCute PNG/Heart.png',
                edgeHeights: [1, 1, 1, 1]
            }]
        },
        16: {
            name: 'Key',
            states: [{
                imageSrc: '/images/PlanetCute PNG/Key.png',
                edgeHeights: [1, 1, 1, 1]
            }]
        },
        17: {
            name: 'Gem',
            states: [{
                name: 'Blue',
                imageSrc: '/images/PlanetCute PNG/Gem Blue.png',
                edgeHeights: [1, 1, 1, 1]
            }, {
                name: 'Green',
                imageSrc: '/images/PlanetCute PNG/Gem Green.png',
                edgeHeights: [1, 1, 1, 1]
            }, {
                name: 'Orange',
                imageSrc: '/images/PlanetCute PNG/Gem Orange.png',
                edgeHeights: [1, 1, 1, 1]
            }]
        }
    }
};