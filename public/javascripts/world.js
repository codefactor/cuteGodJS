var BLOCKS = [{
    id: 0,
    name: 'Plain',
    states: [{
        imageSrc: '/images/PlanetCute PNG/Plain Block.png',
        edgeHeights: [1, 1, 1, 1]
    }]
}, {
    id: 1,
    name: 'Stone',
    states: [{
        imageSrc: '/images/PlanetCute PNG/Stone Block.png',
        edgeHeights: [1, 1, 1, 1]
    }, {
        imageSrc: '/images/PlanetCute PNG/Stone Block Tall.png',
        edgeHeights: [2, 2, 2, 2]
    }]
}, {
    id: 2,
    name: 'Dirt',
    states: [{
        imageSrc: '/images/PlanetCute PNG/Dirt Block.png',
        edgeHeights: [1, 1, 1, 1]
    }]
}, {
    id: 3,
    name: 'Grass',
    states: [{
        imageSrc: '/images/PlanetCute PNG/Grass Block.png',
        edgeHeights: [1, 1, 1, 1]
    }]
}, {
    id: 4,
    name: 'Brown',
    states: [{
        imageSrc: '/images/PlanetCute PNG/Brown Block.png',
        edgeHeights: [1, 1, 1, 1]
    }]
}, {
    id: 5,
    name: 'Water',
    states: [{
        imageSrc: '/images/PlanetCute PNG/Water Block.png',
        edgeHeights: [1, 1, 1, 1]
    }]
}, {
    id: 6,
    name: 'Roof Edge',
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
}, {
    id: 7,
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
}, {
    id: 8,
    name: 'Rock',
    states: [{
        name: 'Rock',
        imageSrc: '/images/PlanetCute PNG/Rock.png',
        edgeHeights: [1, 1, 1, 1]
    }]
}, {
    id: 9,
    name: 'Tree',
    states: [{
        imageSrc: '/images/PlanetCute PNG/Tree.png',
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
}, {
    id: 10,
    name: 'Wood',
    states: [{
        imageSrc: '/images/PlanetCute PNG/Wood Block.png',
        edgeHeights: [1, 1, 1, 1]
    }]
}, {
    id: 11,
    name: 'Window',
    states: [{
        imageSrc: '/images/PlanetCute PNG/Window Tall.png',
        edgeHeights: [2, 2, 2, 2]
    }]
}, {
    id: 12,
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
}, {
    id: 13,
    name: 'Wall',
    states: [{
        imageSrc: '/images/PlanetCute PNG/Wall Block.png',
        edgeHeights: [1, 1, 1, 1]
    }, {
        imageSrc: '/images/PlanetCute PNG/Wall Block Tall.png',
        edgeHeights: [2, 2, 2, 2]
    }]
}, {
    id: 14,
    name: 'Heart',
    states: [{
        imageSrc: '/images/PlanetCute PNG/Heart.png',
        edgeHeights: [1, 1, 1, 1]
    }]
}, {
    id: 15,
    name: 'Key',
    states: [{
        imageSrc: '/images/PlanetCute PNG/Key.png',
        edgeHeights: [1, 1, 1, 1]
    }]
}, {
    id: 16,
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
}];