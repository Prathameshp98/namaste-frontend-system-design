const express = require('express');
const { join } = require('node:path');

const app = express();

// Serve static files (e.g., index.html) from the 'public' folder
app.use(express.static(join(__dirname, 'public')));

app.get('/sse', (req, res, next) => {
    res.setHeader('Content-Type','text/event-stream');
    res.setHeader('Connection','keep-alive');
    res.setHeader('Cache-Control','no-cache');

    res.write('Data: Welcome to the server side events server \n\n');

    const intervalId = setInterval(() => {
        res.write(`Data: Server time ${new Date().toLocaleTimeString()} \n`);
    }, 5000);

    req.on('close', () => {
        clearInterval(intervalId);
    });
});

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
