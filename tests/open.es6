// #! /usr/bin/env node

let {open} = require("../index.es6")

let p = open("./LICENSE");
console.log(p);
console.log(p.pathname);
p.read.then((data) => {
    console.log(data);
}, (err) => {
    console.log(err);
})
