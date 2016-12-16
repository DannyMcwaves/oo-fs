// #! /usr/bin/env node

let Base = require("./base"),
    FSError = require("./error"),
    fs = require("fs");


// the file class only takes a path that leads to a file.
// It thows an error if the path is a directory.

class File extends Base {

    constructor(pathname) {
        super(pathname);
        if (this.type === "file") {
            Reflect.constructor(Base, [pathname,], this);
        } else {
            throw new FSError(" [ - ]  THIS IS NOT A FILE ");
        }
    }

    // truncate the content of the current file if available.
    // else starts writing a new content to the file.
    write(data){
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

    // append data to this file easily.
    append(data) {
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

    // deletes this file
    delete(){
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

    // renames this current file and will change the current pathname.
    rename (newName) {
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

    // returns a promise of a writable stream.
    get writeStream() {
        return new Promise((resolve, reject) => {
            resolve(fs.createWriteStream(this.pathname));
        });
    }

    // creates and returns a readStream from the current file.
    get readStream() {
        return new Promise((resolve, reject) => {
            let rstream = fs.createReadStream(this.pathname);
            rstream.setEncoding("utf-8");
            resolve(rstream);
        });
    }

}




// SAMPLE DEVELOPMENT TESTS.
try {
    var file = new File("./README.md");
} catch (e) {
    console.log(e.message);
    console.log(e.name);
} finally {
    if (file) {
        /*
        // writing the name of the file.
        console.log(file.pathname);

        // reading the content of the file.
        file.read.then((data) => {
            console.log(data);
        }, (err) => {
            console.log(err);
        });

        file.append("\nAnd this is what I also came here for.").then((done) => {
            console.log(done);
        }, (err) => {
            console.log(err);
        });

        file.delete().then((done) => {
            console.log(done);
        }, (err) => {
            console.log(err);
        });
        */
        file.rename("README.md").then((done) =>{
            console.log(done);
            console.log(file.pathname);
        }, (err) => {
            console.log(err);
        })

        file.readStream.then((str) => {
            str.on("data", (data) => {
                console.log(data);
            })
        }, undefined)

        file.writeStream.then((str) => {
            str.write("this is what I came here for. -- danny mcwaves");
        }, (err) => {
            console.log(err);
        })

    } else {
        console.log("FAILED");
    }
}


module.exports = File;
