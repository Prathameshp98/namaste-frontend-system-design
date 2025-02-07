const express = require('express');
const { join } = require('node:path');

const app = express();

//Added this middleware - whatever has to happen goes throgh this middleware
app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self';" +
        "script-src 'self' 'unsafe-inline' 'nonce-randomKey' http://unsecure.com;"
    );
    next();
})

// Serve static files (e.g., index.html) from the 'public' folder
app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
