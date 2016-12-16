// #! /usr/bin/env node

// this is the base error class from which all other  errors within the package are raised.
// this error class inherits from the builtin error class.

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
