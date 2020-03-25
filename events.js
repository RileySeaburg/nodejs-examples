///////////////////////////////////////////////////////////
//// NodeJS Event Emitter Documentation & Example File ////
//// This procedure uses the 'Observer Pattern'        ////
///////////////////////////////////////////////////////////

const EventEmitter /*A standard class for the event emitter*/ = require('events');
const http = require('http');


class Sales extends EventEmitter { /* Extends event emitter with ES6 Class*/ 
    constructor() {                /*Sales Inherits all properties of Event Emitter */
        super();/*When extending 'Super Classes' */
    }
}

// Create event emitter with new constructor class
const emitter = new Sales();


emitter.on('newSale', () =>{
    console.log("New Sale")
});

emitter.on('newSale', stock => {
    console.log(`There are now ${stock} items left in stock.`);
});

emitter.emit('newSale', 9);

///////////////////////////////////////////////////////////
//// Create Server & Listen for events created above   ////
///////////////////////////////////////////////////////////

const server = http.createServer();

server.on('request', (req, res) => {
    console.log('recieved');
    res.end(`<h1 style="text-align:center; font-size: large; color:teal;">Hello From The Server!</h1>`);
});

server.on('request', (req, res) => {
    console.log('recieved again');
    res.end(`<h1 style="text-align:center; font-size: large; color:teal;">Hello From The Server a second Time!!</h1>`);
});

server.on('request', (req, res) => {
    console.log('recieved a third time');
    res.end(`<h1 style="text-align:center; font-size: large; color:teal;">Hello From The Server a third time!!</h1>`);
});

server.on('close', () => {
    console.log('Server shutting down');
});

server.listen(80, '127.0.0.1', () => {
    console.log('Listening...');
});