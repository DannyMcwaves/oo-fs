// #! /usr/bin/env node

let Base = require("./base.es6"),
    FSError = require("./error.es6"),
    fs = require("fs"),
    glob = require("glob"),
    watch = require("node-watch");


class Directory extends Base {
    // this class take a path that is directory.
    // if the path given is not a directory, it throws an error.

    constructor(pathname) {
        super(pathname);
        if (this.type === "directory") {
            Reflect.constructor(Base, [pathname,], this);
        } else {
            throw new FSError("[-] THIS IS NOT A DIRECTORY");
        }
    }

    *[Symbol.iterator]() {
        // provide support for iterating through the content of a directory.
        yield* this.read;
    }

    *[Symbol.hasInstance](other) {
        // provides instanceof support for checking against other objects for instances.
        return other instanceof this;
    }

    addFile(name="newFile.txt", overwrite=false) {
        // if the not overwrite and the file exists, it is not recreated.
        // if overwrite and the file exists, it is truncated.
        // it returns a promise that resolves the file descriptor if the file is successfully created;
        // else it returns the promise that rejects the error.
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

    removeFile(name) {
        // removes an empty file.
        // returns a promise that throws an error when the file is not avaiable
        // or resolves true if the file is removed.
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

    addDirectory(name="new folder") {
        // adds a new directory if it does not exist.
        // it returns a promise that resolves the true else
        // it returns the promise that rejects the err;
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

    removeDirectory(name) {
        // remves an empty directory if it exists or throws an error directory does not exist.
        // it returns a promise that resolves the true else
        // it returns the promise that rejects the err;
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

    // stiil under heavy refactor.
    get walk() {
        return glob.sync(this.join("**/*"))
    }

    search(value) {
        // returns every possible value of the search avaiable in this directory or and sub directories.
        let list = glob.sync(this.join("**/*"));
        return list.filter((item) => {
            if (item.indexOf(value) > 0) return item;
        });
    }

    get watch() {
        // watch a directory and then it return the name of any file that has being modified.
        watch(this.pathname, (filename) => {
            return new Promise((resolve, reject) => {
                if (filename) {
                    resolve(filename);
                } else {
                    reject("No file modified");
                }
            });
        });
    }

}


module.exports = Directory;
