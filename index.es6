// #! /usr/bin/env node
let Directory = require("./open/directory.es6"),
    File = require("./open/file.es6"),
    FSError = require("./open/file.es6");



function open(pathname) {
    data = ""
    try {
        data = new Directory(pathname);
    } catch (e) {
        try {
            data = new File(pathname);
        } catch (e) {
            console.log(e.name, e.message);
            throw new FSError(e.message);
        }

    }
    return data;
}

module.exports = {Directory, File, open};
