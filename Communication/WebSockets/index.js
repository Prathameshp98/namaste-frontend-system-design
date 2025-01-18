const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

// Serve static files (e.g., index.html) from the 'public' folder
app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
    console.log('io connection established.');

    socket.on('chat message', (message) => {
        console.log('Received message:', message);
        io.emit('chat message', message);  // Broadcast message to all clients
    });

    socket.on('disconnect', () => {
        console.log('User disconnected.');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
