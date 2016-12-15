// #! /usr/bin/env node

class FSError extends Error{
    constructor(message) {
        super(message);
        this.name = "FSError";
    }
}

/*

try {
    throw new FSError("what the fuck");
} catch (e) {
    console.log(e.message);
} finally {
    console.log("Finally my custom exception is working correctly");
}

*/

module.exports = FSError;
