// #! /usr/bin/env node

let {Directory} = require("../index.es6");
// SAMPLE DEVELOPMENT TESTS.

try {
    var dir = new Directory();
} catch (e) {
    console.log(e.message);
    console.log(e.name);
} finally {

    if (dir) {

        // logging directory full path
        console.log(dir.pathname);

        // reading the content of the directory
        console.log(dir.read);

        // looping through the content of a directory
        for (let i of dir) {
            console.log(i);
        }

        // checking for instance with the main constructor
        console.log(dir instanceof Directory, " dir is instanceof Directory");

        // creating a new file now in this directory.
        dir.addFile("newFile", true).then((d) => {
            console.log(d, "new file created");
        }, (err) => {
            console.log(err);
        });

        dir.addDirectory("folder 1").then((done) => {
            console.log(done, " folder 1 created");
        }, (err) => {
            console.log(err);
        });

        dir.removeDirectory("folder 1").then((done) => {
            console.log(done, " folder 1 removed");
        }, (err) => {
            console.log(err);
        });

        dir.removeFile("newFile").then((done) => {
            console.log(done, "new file remove");
        }, (err) => {
            console.log(err);
        })

        s = dir.search("open");
        console.log(s);

    } else {
        // if there was an error then log FAILED.
        console.log("FAILED");
    }
}
