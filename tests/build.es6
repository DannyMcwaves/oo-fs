// #! /usr/bin/env node

var watch = require("node-watch"),
    command = require("child_process").exec;

(() => {
    let to_watch = ""
    if (process.argv.length <= 2) {
        console.log("please specify a directory or file to build");
        return null;
    } else {
        to_watch = process.argv.pop();
    }

    console.log(to_watch);
    var arg = `node_modules/.bin/babel ${to_watch} -o es5/compiled_es6.js`;
    console.log(arg);
    command(arg, (err, stdout, stderr) => {console.log(err || stdout || stderr)})

})();
