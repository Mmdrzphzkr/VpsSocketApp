const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Serve static files from the "public" directory
app.use(express.static('public'));

// WebSocket connection event handler
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle incoming messages
  socket.on('message', (message) => {
    console.log('Received message:', message);
    
    // Broadcast the message to all connected clients
    io.emit('message', message);
    
    // Send a confirmed message back to the client
    const confirmedMessage = `Server received your message: ${message}`;
    socket.emit('confirmedMessage', confirmedMessage);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});