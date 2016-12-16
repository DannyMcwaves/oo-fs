// #! /usr/bin/env node

let pathSymbol = Symbol("path"),
    path = require("path"),
    glob = require("glob"),
    fs = require("fs"),
    FSError = require("./error");


// this is the base class providing almost all the major API'S for the rest of the other
// classes avaiable in the package.

class _BASE {

    constructor (pathname) {

        // call the constructor without a path and it uses the current working directory.
        this[pathSymbol] = pathname || process.cwd();
        this.dirname = path.dirname(this.pathname);
        this.basename = path.basename(this.pathname);
        this.F_OK = 0;
        this.X_OK = 1
        this.R_OK = 4
        this.W_OK = 2
    }

    get pathname() {
        // get the name of the path by calling it as a property.
        return path.resolve(this[pathSymbol]);
    }

    set pathname(value) {
        // change the name of the path.
        this[pathSymbol] = value;
    }

    join(other) {
        // join this pathname with another.
        return path.join(this.pathname, other);
    }

    get exists() {
        // returns true or false as to the path's existence.
        return fs.existsSync(this.pathname);
    }

    get stats() {
        // returns some statistic about the file.
        if (this.exists) {
            return fs.statSync(this.pathname);
        } else {
            throw new FSError(`${this.pathname} does not exist`);
        }
    }

    get type() {
        // this return the type of file it is.
        if (this.stats.isFile()) {
            return "file";
        } else {
            return "directory";
        }
    }

    get read() {
        let self = this;
        if (this.exists) {
            // if the file exists, execute the following block.
            if (this.type === "file") {
                // if it is a file, it returns a promise.
                return new Promise((resolve, reject) => {
                    fs.readFile(self.pathname, (err, data) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data.toString());
                        }
                    });
                });
            } else {
                // if path exists and is directory return the content in the directory.
                return glob.sync(self.join("*"));
            }
        } else {
            throw new FSError("Path does not exits");
        }
    }

}

module.exports = _BASE;
