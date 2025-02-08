const express = require('express');
const { join } = require('node:path');

const app = express();

app.use((req, res, next) => {
    // this restricts the iframe defined here ie iframe-webiste1 and iframe-website2 to be used anywhere
    // The Content-Security-Policy directive name 'frame-ancestors'self'' contains one or more invalid characters. Only ASCII alphanumeric characters or dashes '-' are allowed in directive names.Understand this errorAI iframe-web
    res.setHeader('Content-Security-Policy', "frame-ancestors'self'");
    res.cookie('sessionID', '12345', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    });
    next();
})

// Serve static files (e.g., index.html) from the 'public' folder
app.use(express.static(join(__dirname, 'public')));

app.get('/iframe-website1', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'iframe-website1.html'));
});

app.get('/iframe-website2', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'iframe-website2.html'));
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
