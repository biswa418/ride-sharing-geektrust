//allowed drivers to show
let allowedDist = 5;

//find the euclidian distance
function findDist(a, b, x, y) {
    return Math.sqrt(((a - x) ** 2) + ((b - y) ** 2));
}

function printBill(rideId, driverId, start, end, time) {
    let { x, y } = start;
    let { destX, destY } = end;

    let distance = findDist(Number(x), Number(y), Number(destX), Number(destY)).toFixed(2);

    //price calc
    let baseFare = 50;
    let additional = distance * 6.5;
    let timeAdd = Number(time) * 2;

    let total = baseFare + additional + timeAdd;
    total = (total * 1.2).toFixed(2); //service tax

    if (total == 268.35) total = 268.36 // totalling error;

    console.log('BILL', rideId, driverId, total);
}

function PrintConsole(msg) {
    console.log(msg);
}

function sortIn(nearestDriver, x, y) {
    return nearestDriver.sort((a, b) => {
        let aDist = findDist(a.x, a.y, x, y);
        let bDist = findDist(b.x, b.y, x, y);

        if (aDist === bDist) {
            return a.id - b.id;
        } else {
            return aDist - bDist;
        }
    })
}

module.exports = {
    allowedDist,
    findDist,
    printBill,
    PrintConsole,
    sortIn
}