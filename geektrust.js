const fs = require("fs")
const app = require('./app');
const App = new app();

const filename = process.argv[2];

fs.readFile(filename, "utf8", (err, data) => {
    if (err) throw err
    var inputLines = data.toString().split("\n");
    App.start(inputLines);
})
