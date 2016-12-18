// #! /usr/bin/env node

// SAMPLE DEVELOPMENT TESTS.
let {File} = require("../index.es6");


try {
    var file = new File("./readme");
} catch (e) {
    console.log(e.message);
    console.log(e.name);
} finally {
    if (file) {
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

        file.rename("readme").then((done) =>{
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
