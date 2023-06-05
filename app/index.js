const { allowedDist } = require('../helper');
const Print = require('./print');

module.exports = class App {
    constructor() {
        this.driver = [];
        this.rider = {};
    }

    //add a driver
    addDrv({ id, x, y }) {
        this.driver.push({ id, x, y })
    }

    //add a rider
    addRid({ id, x, y }) {
        this.rider[id] = { x, y };
    }

    //find the euclidian distance
    findDist(a, b, x, y) {
        return Math.sqrt(((a - x) ** 2) + ((b - y) ** 2));
    }

    //match the rider
    match(id) {
        let { x, y } = this.rider[id];

        //find all drivers within 5km
        let nearestDriver = this.driver.filter((driver) => (
            this.findDist(driver.x, driver.y, x, y) <= allowedDist)
        );

        if (nearestDriver.length === 0) {
            console.log('NO_DRIVERS_AVAILABLE');
            return;
        }

        //sort them in increasing order of distance
        nearestDriver.sort((a, b) => {
            let aDist = this.findDist(a.x, a.y, x, y);
            let bDist = this.findDist(b.x, b.y, x, y);

            if (aDist === bDist) {
                return a.id - b.id;
            } else {
                return aDist - bDist;
            }
        })

        //print all matched driver
        let driversList = ""
        nearestDriver.map((driver) => {
            driversList += driver.id + " ";
        })
        console.log("DRIVERS_MATCHED", driversList);
    }

    startRide(line) {

    }

    stopRide(line) {

    }

    start(data) {
        for (let lines of data) {
            let line = lines.trim().split(' ');

            //check the command validity
            switch (line[0]) {
                case 'ADD_DRIVER':
                    this.addDrv({
                        id: line[1],
                        x: line[2],
                        y: line[3]
                    });
                    break;

                case 'ADD_RIDER':
                    this.addRid({
                        id: line[1],
                        x: line[2],
                        y: line[3]
                    });
                    break;

                case 'MATCH':
                    this.match(line[1]);
                    break;

                case 'START_RIDE':
                    this.startRide(line);
                    break;

                case 'STOP_RIDE':
                    this.stopRide(line);

                case 'BILL':
                    return Print(this.rideId, this.driveId, this.distance, this.timeSpent);
            }
        }
    }




}