const express = require('express');
const { join } = require('node:path');

const app = express();

// Serve static files (e.g., index.html) from the 'public' folder
app.use(express.static(join(__dirname, 'public')));

app.get('/example1', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'example1.html'));
});

app.get('/example2', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'example2.html'));
});

app.get('/try-google-iframe', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'try-google-iframe.html'));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
