
const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
    console.log('Client connected');
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(wss.clients.size);
        }
    });
    ws.on('message', function incoming(data) {
        let dataObject = JSON.parse(data);
        if (dataObject.type === 'postMessage'){
            dataObject.id = uuidv4();
            dataObject.type = 'incomingMessage';
            wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(dataObject));
                }
            });
        } else if(dataObject.type ===           'postNotification'){ 
            dataObject.type = 'incomingNotification';
            wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(dataObject));
                }
            });

        } else {
            throw new Error('Unknown event type ' + dataObject.type);
        }
    });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => 
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(wss.clients.size);
        }
    }))
    // console.log('Client disconnected'));
});