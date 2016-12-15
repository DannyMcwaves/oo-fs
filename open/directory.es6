// #! /usr/bin/env node

let Base = require("./base"),
    FSError = require("./error");

class Directory extends Base {

    constructor(pathname) {
        super(pathname);
        if (this.type === "directory") {
            Reflect.constructor(Base, [pathname,], this);
        } else {
            throw new FSError("[-] THIS IS NOT A DIRECTORY");
        }
    }

}



// SAMPLE DEVELOPMENT TESTS.
try {
    var dir = new Directory();
} catch (e) {
    console.log(e.message);
} finally {
    if (dir) {
        console.log(dir.pathname);
        console.log(dir.read);
    } else {
        console.log("FAILED");
    }
}


module.exports = Directory;
