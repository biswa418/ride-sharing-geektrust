//Add your tests here
const app = require('./app');
const App = new app();

const assert = require('assert');
global.startDate;
global.type = {};
global.topUp = {};
global.price = 0;
global.data = [
    'ADD_RIDER R1 2 7',
    'MATCH R1',
    'ADD_DRIVER D1 3 1',
    'ADD_DRIVER D2 5 6',
    'ADD_DRIVER D13 1 8',
    'ADD_DRIVER D4 3 6',
    'MATCH R1',
    'START_RIDE RIDE-001 1 R1',
    'STOP_RIDE RIDE-001 4 15 60',
    'BILL RIDE-001'
]

describe("Test case -", () => {
    beforeEach(() => {
        console.log("executes before every test");
    });

    it("show output the amount", () => {

        const temp = App.start(data);

        assert.equal(temp, undefined);
    });

});