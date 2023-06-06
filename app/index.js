const { allowedDist, findDist, printBill, PrintConsole, sortIn } = require('../helper');

module.exports = class App {
    constructor() {
        this.driver = []; //drivers available
        this.rider = {};  //riders booked
        this.rideIds = {};  //current rides going on
        this.matchedDrivers = {}; //drivers list for each rider
    }

    //add a driver
    addDrv({ id, x, y }) {
        this.driver.push({ id, x, y })
    }

    //add a rider
    addRid({ id, x, y }) {
        this.rider[id] = { x, y };
    }

    //match the rider
    match(id) {
        let { x, y } = this.rider[id];

        //find all drivers within 5km
        let nearestDriver = this.driver.filter((driver) => (
            findDist(driver.x, driver.y, x, y) <= allowedDist)
        );

        if (nearestDriver.length === 0) {
            PrintConsole('NO_DRIVERS_AVAILABLE');
            return;
        }

        //sort them in increasing order of distance
        nearestDriver = sortIn(nearestDriver, x, y);

        //add to matched drivers
        this.matchedDrivers[id] = nearestDriver;

        //print all matched driver
        let driversList = ""
        nearestDriver.map((driver) => {
            driversList += driver.id + " ";
        })
        PrintConsole(`DRIVERS_MATCHED ${driversList.trim()}`);
    }

    startRide({ rideId, n, riderId }) {
        let foundDrivers = this.matchedDrivers[riderId] ? this.matchedDrivers[riderId] : [];

        //if rideId already there or no drivers available or selected n is bigger than the driver list
        if (this.rideIds[rideId] || foundDrivers.length === 0 || foundDrivers.length < n) {
            PrintConsole('INVALID_RIDE');
            return;
        }

        //start the ride
        this.rideIds[rideId] = { riderId, driverId: this.matchedDrivers[riderId][n - 1], start: this.rider[riderId] }

        //remove from available riders list
        let index = this.driver.indexOf(this.matchedDrivers[riderId][n - 1]);
        this.driver.splice(index, 1);

        PrintConsole(`RIDE_STARTED ${rideId}`);
    }

    stopRide({ rideId, destX, destY, time }) {
        //find the ride
        if (this.rideIds[rideId] && !this.rideIds[rideId]["stopped"]) {
            this.rideIds[rideId]["stopped"] = true;
            this.rideIds[rideId]["time"] = time;
            this.rideIds[rideId]["dest"] = { destX, destY };
            PrintConsole(`RIDE_STOPPED ${rideId}`);
        } else {
            PrintConsole('INVALID_RIDE');
        }
    }

    print(rideId) {
        if (!this.rideIds[rideId]) {
            PrintConsole('INVALID_RIDE');
            return;
        }
        else if (!this.rideIds[rideId]["stopped"]) {
            PrintConsole('RIDE_NOT_COMPLETED');
        } else {
            let rideDetails = this.rideIds[rideId];
            printBill(rideId, rideDetails.driverId["id"], rideDetails.start, rideDetails.dest, rideDetails.time);
        }
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
                    this.startRide({
                        rideId: line[1],
                        n: line[2],
                        riderId: line[3]
                    });
                    break;

                case 'STOP_RIDE':
                    this.stopRide({
                        rideId: line[1],
                        destX: line[2],
                        destY: line[3],
                        time: line[4]
                    });
                    break;

                case 'BILL':
                    this.print(line[1]);
                    break;
            }
        }
    }
}