const fs = require("fs")
const app = require('./app');
const App = new app();

const filename = "./sample_input/input1.txt"  //process.argv[2]

fs.readFile(filename, "utf8", (err, data) => {
    if (err) throw err
    var inputLines = data.toString().split("\n")
    // Add your code here to process input commands

    App.start(inputLines);
})
