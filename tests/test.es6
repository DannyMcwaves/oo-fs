// #! /usr/bin/env node

var watch = require("node-watch"),
    command = require("child_process").exec;

(() => {
    let to_watch = ""
    if (process.argv.length <= 2) {
        console.log("please specify a directory to watch and run files on changes");
        return null;
    } else {
        to_watch = process.argv.pop() + "/";
    }

    watch(to_watch, (filename) =>  {
        var arg = `node_modules/.bin/babel-node ${filename}`;
        command(arg, (err, stdout, stderr) => {console.log(err || stdout || stderr)})
    });

})()
