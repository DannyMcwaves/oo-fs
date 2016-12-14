
var watch = require("node-watch"),
    command = require("child_process").exec;

(() => {
    let to_watch = ""
    if (process.argv.length <= 2) {
        console.log("please specify a directory or file to watch");
        return null;
    } else {
        to_watch = process.argv.pop() + "/";
    }

    console.log(to_watch);

    watch(to_watch, (filename) =>  {
        var arg = `node_modules/.bin/eslint ${filename}`;
        console.log(arg);
        command(arg, (err, stdout, stderr) => {console.log(err || stdout || stderr)})
    });

})()
