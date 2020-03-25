///////////////////////////////////////////////////////////
//// NodeJS Event Loop Example                         ////
///////////////////////////////////////////////////////////



const fs = require('fs');
const crypto = require('crypto');
const start = Date.now();
setTimeout(() => console.log("Timer finished"), 0);
setImmediate(() => console.log("Immediate finished"));
process.env.UV_THREADPOOL_SIZE = 4;

fs.readFile('test-file.txt', () => {
    console.log("I/O Done");
    setTimeout(() => console.log("Timer 2 finished"), 0);
    setTimeout(() => console.log("Timer 3 finished"), 3000);
    setImmediate(() => console.log("Immediate 2 finished"));

    process.nextTick(() => console.log("Process Next Tick"));

    crypto.pbkdf2('password', 'salt', 10000, 1024, 'sha512', () => {
        console.log(Date.now() -start, 'Encrypted');
    });
});

console.log("Top Level Code");