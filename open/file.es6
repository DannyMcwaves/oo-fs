// #! /usr/bin/env node

let Base = require("./base.es6"),
    FSError = require("./error.es6"),
    fs = require("fs");



class File extends Base {

    // the file class only takes a path that leads to a file.
    // It thows an error if the path is a directory.

    constructor(pathname) {
        super(pathname);
        if (this.type === "file") {
            Reflect.constructor(Base, [pathname,], this);
        } else {
            throw new FSError(" [ - ]  THIS IS NOT A FILE ");
        }
    }

    write(data){
        // truncate the content of the current file if available.
        // else starts writing a new content to the file.
        return new Promise((resolve, reject) => {
            fs.writeFile(this.pathname, data, (err, done) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        });
    }

    append(data) {
        // append data to this file easily.
        return new Promise((resolve, reject) => {
            fs.appendFile(this.pathname, data, (err, done) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        });
    }

    delete(){
        // deletes this file
        let self = this;
        return new Promise((resolve, reject) => {
            fs.unlink(self.pathname, function (error) {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        });
    }

    rename (newName) {
        // renames this current file and will change the current pathname.
        return new Promise((resolve, reject) => {
            fs.rename(this.pathname, newName, (err) => {
                if (err) {
                    reject(err);
                } else {
                    this.pathname = `./${newName}`;
                    resolve(true);
                }
            });
        });
    }

    get writeStream() {
        // returns a promise of a writable stream.
        return fs.createWriteStream(this.pathname);
    }

    get readStream() {
        // creates and returns a readStream from the current file.
        return fs.createReadStream(this.pathname);
    }

}


module.exports = File;
