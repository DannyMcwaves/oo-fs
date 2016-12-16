// #! /usr/bin/env node

let Base = require("./base"),
    FSError = require("./error"),
    fs = require("fs"),
    glob = require("glob");

// this class take a path that is directory.
// if the path given is not a directory, it throws an error.

class Directory extends Base {

    constructor(pathname) {
        super(pathname);
        if (this.type === "directory") {
            Reflect.constructor(Base, [pathname,], this);
        } else {
            throw new FSError("[-] THIS IS NOT A DIRECTORY");
        }
    }

    // provide support for iterating through the content of a directory.
    *[Symbol.iterator]() {
        yield* this.read;
    }

    // provides instanceof support for checking against other objects for instances.
    *[Symbol.hasInstance](other) {
        return other instanceof this;
    }

    // if the not overwrite and the file exists, it is not recreated.
    // if overwrite and the file exists, it is truncated.
    // it returns a promise that resolves the file descriptor if the file is successfully created;
    // else it returns the promise that rejects the error.
    addFile(name="newFile.txt", overwrite=false) {
        return new Promise((resolve, reject) => {
            let mode = overwrite ? "w+" : "a+";
            fs.open(name, mode, (err, fd) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(fd);
                }
            });
        });
    }

    // removes an empty file.
    // returns a promise that throws an error when the file is not avaiable
    // or resolves true if the file is removed.
    removeFile(name) {
        return new Promise((resolve, reject) => {
            if (!name) {
                reject(new FSError(" [-] PLEASE SPECIFY A FILE TO REMOVE "));
            } else {
                fs.unlink(name, function (error) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(true);
                    }
                });
            }
        });
    }

    // adds a new directory if it does not exist.
    // it returns a promise that resolves the true else
    // it returns the promise that rejects the err;
    addDirectory(name="new folder") {
        return new Promise((resolve, reject) => {
            fs.mkdir(name,  (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }

    // remves an empty directory if it exists or throws an error directory does not exist.
    // it returns a promise that resolves the true else
    // it returns the promise that rejects the err;
    removeDirectory(name) {
        return new Promise((resolve, reject) => {
            if (!name) {
                reject(new FSError(" [-] PLEASE SPECIFY A DIRECTORY TO REMOVE "));
            } else {
                fs.rmdir(name, function (error) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(true);
                    }
                });
            }
        });
    }

    get walk() {
        return glob.sync(this.join("**/*"))
    }

    // returns every possible value of the search avaiable in this directory or and sub directories.
    search(value) {
        let list = glob.sync(this.join("**/*"));
        return list.filter((item) => {
            if (item.indexOf(value) > 0) return item;
        });
    }

}



// SAMPLE DEVELOPMENT TESTS.
try {
    var dir = new Directory();
} catch (e) {
    console.log(e.message);
    console.log(e.name);
} finally {
    if (dir) {
        /*
        // logging directory full path
        console.log(dir.pathname);

        // reading the content of the directory
        console.log(dir.read);

        // looping through the content of a directory
        for (let i of dir) {
            console.log(i);
        }

        // checking for instance with the main constructor
        console.log(dir instanceof Directory);

        // creating a new file now in this directory.
        dir.addFile("newFile", true).then((d) => {
            console.log(d);
        }, (err) => {
            console.log(err);
        });

        dir.addDirectory("folder 1").then((done) => {
            console.log(done);
        }, (err) => {
            console.log(err);
        });

        dir.removeDirectory("folder 1").then((done) => {
            console.log(done);
        }, (err) => {
            console.log(err);
        });

        dir.removeFile("newFile").then((done) => {
            console.log(done);
        }, (err) => {
            console.log(err);
        })
        */

        // dir.pathname = "./open";
        console.log(dir.walk);
        s = dir.search("open");
        console.log(s);

    } else {
        // if there was an error then log FAILED.
        console.log("FAILED");
    }
}


module.exports = Directory;
