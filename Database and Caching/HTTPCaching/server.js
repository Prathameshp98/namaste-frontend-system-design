// HTTP Caching Demo Server
// Demonstrates ETag, Last-Modified, Cache-Control, Expires, and header priorities
// Run: node server.js

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = 3000;
const FILE_PATH = path.join(__dirname, 'static.txt');

// Create a static file for demonstration if it doesn't exist
if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, 'This is a static file for HTTP caching demonstration.\nTimestamp: ' + new Date().toISOString());
}

function getFileStats() {
    const stats = fs.statSync(FILE_PATH);
    const content = fs.readFileSync(FILE_PATH);
    const lastModified = stats.mtime.toUTCString();
    // ETag is a hash of the file content
    const etag = crypto.createHash('md5').update(content).digest('hex');
    return { content, lastModified, etag };
}

const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/static.txt') {
        const { content, lastModified, etag } = getFileStats();

        // Set caching headers
        // Cache-Control takes highest priority
        res.setHeader('Cache-Control', 'public, max-age=30, must-revalidate'); // 30 seconds
        // Expires is ignored if Cache-Control is present
        res.setHeader('Expires', new Date(Date.now() + 30000).toUTCString()); // 30 seconds from now
        // ETag and Last-Modified for validation
        res.setHeader('ETag', etag);
        res.setHeader('Last-Modified', lastModified);

        // Priority of headers (as per browser behavior):
        // 1. Cache-Control overrides Expires and Pragma
        // 2. ETag and Last-Modified are used for validation (ETag preferred if both present)
        // 3. If Cache-Control: no-store, nothing is cached
        // 4. If Cache-Control: no-cache, browser must revalidate
        // 5. Expires is only used if Cache-Control is not present

        // Handle conditional requests
        const ifNoneMatch = req.headers['if-none-match'];
        const ifModifiedSince = req.headers['if-modified-since'];

        // ETag has higher priority than Last-Modified
        if (ifNoneMatch && ifNoneMatch === etag) {
            res.statusCode = 304;
            res.end();
            return;
        }
        if (ifModifiedSince && new Date(ifModifiedSince).getTime() >= new Date(lastModified).getTime()) {
            res.statusCode = 304;
            res.end();
            return;
        }

        // Serve the file
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(content);
    } else {
        res.statusCode = 404;
        res.end('Not found');
    }
});

server.listen(PORT, () => {
    console.log(`HTTP Caching demo server running at http://localhost:${PORT}`);
    console.log('Try accessing /static.txt and observe the caching headers in your browser dev tools.');
    console.log('Modify static.txt and refresh to see ETag/Last-Modified validation in action.');
}); 