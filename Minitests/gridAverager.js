/**
 * @file No idea what this is trying to do... Make a grid smaller while keeping avg values?
 */

 /** Grid example */
const GRID_1 = [
    [2, 2, 2, 2],
    [2, 2, 2, 2],
    [1, 1, 1, 1],
    [5, 5, 1, 1]
];

const GRID_2 = [
    [20, 20, 2, 2],
    [20, 20, 4, 4],
    [10, 10, 6, 6],
    [10, 10, 3, 3]
];

/** Do we want decimals in the simplified grids */
const SUPPORT_DECIMAL_IN_FINAL = false;

/**
 * See if the grid is a good square/rectangle
 * @param {Array<Array<number>>} grid 
 * @returns {boolean}
 */
const verifyGrid = (grid) => {
    return grid.length > 0 && grid[0].length > 0 && grid.every(r => r.length === grid[0].length);
};

/**
 * @param {Array<number[]>} grid 
 */
const printGrid = (grid) => {
    const biggest = flatten(grid).reduce((a, b) => a > b ? a : b);
    const numChars = (biggest + '').length;
    const newLines = ('\n').repeat(numChars - 1);
    for (let i = 0; i < grid.length; i++) {
        console.log(grid[i].map(e => padToLength(e, numChars)).join(' ') + newLines);
    }
};

/**
 * @param {string} original
 * @param {number} n
 * @returns {string} 
 */
const padToLength = (original, n) => {
    const m = ('' + original).length;
    return original + ('_').repeat(n - m);
};

/**
 * @param {Array<number[]>} arr 
 * @returns {Array}
 */
const flatten = (arr) => {
    return arr.reduce((flat, toFlatten) => {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
}

/**
 * @param {Array<number[]>} grid 
 * @param {number} factor 
 */
const getNewDimensions = (grid, factor) => {
    return {
        height: Math.floor(grid.length / factor),
        width: Math.floor(grid[0].length / factor)
    };
}

/**
 * Each new simplified tile represents how many tiles on the full grid?
 * @param {{ width: number, height: number }} newDimensions
 * @param {Array<number[]>} fullGrid
 */
const getEachArea = (newDimensions, fullGrid) => {
    return {
        x: Math.floor(fullGrid[0].length / newDimensions.width),
        y: Math.floor(fullGrid.length / newDimensions.height)
    }
}

/**
 * @param {{ x: number, y: number }} newCellCoord Which cell in the simple grid we are trying to generate
 * @param {Array<number[]>} grid The original grid
 * @param {{ x: number,  y: number }} eachArea The space each cell represents in original grid
 */
const buildSimplifiedCell = (newCellCoord, grid, eachArea) => {
    const startX = newCellCoord.x * eachArea.x;
    const startY = newCellCoord.y * eachArea.y;
    const valuesToSee = eachArea.x * eachArea.y;
    let acc = 0;
    for (let i = startX; i  < startX + eachArea.x; i++)
        for (let j = startY; j < startY + eachArea.y; j++)
            acc += grid[j][i];
    const d = acc / valuesToSee;
    return SUPPORT_DECIMAL_IN_FINAL ? d : Math.floor(d);
};

/**
 * @param {Array<number[]>} grid
 * @param {number} factor Order of which to simplify a grid e.g. 1 is original, 2 is half size
 */
const simplify = (grid, factor) => {
    if (!verifyGrid(grid) || !factor || typeof factor !== 'number' || factor > Math.min(grid.length, grid[0].length)) return grid;
    let newGrid = [];
    const newDimensions = getNewDimensions(grid, factor);
    log('Determined new dimensions', newDimensions.width, newDimensions.height);
    const eachArea = getEachArea(newDimensions, grid);
    log('Determined each simple cell represents', eachArea.x, eachArea.y);
    for (let i = 0; i < newDimensions.height; i++) {
        let newRow = [];
        for (let j = 0; j < newDimensions.width; j++)
            newRow.push(buildSimplifiedCell({ x: j, y: i }, grid, eachArea));
        newGrid.push(newRow);
    }
    return newGrid;
};

/**
 * @param  {...any} args 
 */
const log = (...args) => {
    console.log('\x1b[35m[Log] ' + args.map(e => typeof e === 'object' ? JSON.stringify(e) : e).join(' ') + '\x1b[0m');
};

const main = () => {
    log('OG Grid 1');
    printGrid(GRID_1);
    log('New Grid 2');
    const newGrid1 = simplify(GRID_1, 2);
    printGrid(newGrid1);
    log('OG Grid 2');
    printGrid(GRID_2);
    log('New Grid 2');
    const newGrid2 = simplify(GRID_2, 2);
    printGrid(newGrid2);
};
main();

module.exports = {
    simplify
};
