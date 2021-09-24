
var totalCities;
var totalProvinces;
const parent = [];
const rank = [];

/**
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNum = function (isConnected) {

    totalCities = isConnected.length;
    totalProvinces = isConnected.length;
    initializeParent();
    initializeRank();

    mapProvinces(isConnected);
    return totalProvinces;
};

/**
 * @param {number[][]} isConnected
 */
function mapProvinces(isConnected) {
    for (let r = 0; r < totalCities; r++) {
        for (let c = 0; c < totalCities; c++) {
            if (r !== c && isConnected[r][c] === 1) {
                union(r, c);
            }
        }
    }
}

/**
 * @param  {number} index
 * @return {number}
 */
function findParent(index) {
    if (parent[index] !== index) {
        parent[index] = findParent(parent[index]);
    }
    return parent[index];
}

function initializeParent() {
    for (let i = 0; i < totalCities; i++) {
        parent[i] = i;
    }
}

function initializeRank() {
    for (let i = 0; i < totalCities; i++) {
        rank[i] = 0;
    }
}

/**
 * @param {number} indexOne
 * @param {number} indexTwo
 */
function union(indexOne, indexTwo) {
    let indexOneParent = findParent(indexOne);
    let indexTwoParent = findParent(indexTwo);

    if (indexOneParent !== indexTwoParent) {
        totalProvinces--;

        if (rank[indexOneParent] < rank[indexTwoParent]) {
            parent[indexOneParent] = indexTwoParent;
        } else if (parent[indexOneParent] > parent[indexTwoParent]) {
            parent[indexTwoParent] = indexOneParent;
        } else {
            parent[indexOneParent] = indexTwoParent;
            rank[indexOneParent]++;
        }
    }
}
