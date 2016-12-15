// #! /usr/bin/env node

let Base = require("./base"),
    FSError = require("./error");

class File extends Base {

    constructor(pathname) {
        super(pathname);
        if (this.type === "file") {
            Reflect.constructor(Base, [pathname,], this);
        } else {
            throw new FSError(" [ - ]  THIS IS NOT A FILE ");
        }
    }

}




// SAMPLE DEVELOPMENT TESTS.
try {
    var file = new File("./package.json");
} catch (e) {
    console.log(e.message);
    console.log(e.name);
} finally {
    if (file) {
        console.log(file.pathname);
        file.read.then((data) => {
            console.log(data);
        }, (err) => {
            console.log(err);
        });
    } else {
        console.log("FAILED");
    }
}


module.exports = File;
