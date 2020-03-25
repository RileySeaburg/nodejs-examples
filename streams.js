//////////////////////////////////////////////////////
//// NodeJS Stream Documentation & Example File   ////
////    This procedure is used for large data     ////
//////////////////////////////////////////////////////

const fs = require('fs');

// Create a server in one line of code.
const server = require('http').createServer();
// Callback function for event listener
server.on('request', (req,res) => {
    ///////////////////////////////////////////
    // Solution 1 (Not For Production Use!)  //
    ///////////////////////////////////////////
    // fs.readFile('test-file.txt', (err, data) => {
    //     if (err) console.log(error);
    //     res.end(data);
    // });
    //////////////////////////
    //      Solution 2      //
    //////////////////////////
    //Solution 2 Streams Faster for the client
    // const readable = fs.createReadStream('testyyy-file.txt');
    // // Create data 'chunks'
    // readable.on('data', chunk => {
    //     res.write(chunk);
    // });
    // // Signal End Of File
    // readable.on('end', () => {
    //     res.end();
    // });
    // // Handle Errors
    // readable.on("error", err => {
    //     console.log(err);
    //     res.statusCode = 500;
    //     res.end("Server error! File Not Found!");
    //////////////////////////
    //      Solution 3      //
    //////////////////////////
    const readable = fs.createReadStream('testyyy-file.txt');
    readable.pipe(res);
    // readableSource.pipe(writeableDest)
    });
});
// Listen for requests
server.listen(80, '127.0.0.1', () => {
    console.log('Listening....');
});