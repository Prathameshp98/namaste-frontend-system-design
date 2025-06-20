const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;
const baseDir = __dirname;

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.gif': 'image/gif',
};

const server = http.createServer((req, res) => {
  let filePath = '';
  if (req.url === '/' || req.url === '/index.html') {
    filePath = path.join(baseDir, 'index.html');
  } else if (req.url === '/style.css') {
    filePath = path.join(baseDir, 'style.css');
  } else if (req.url === '/logo.gif') {
    filePath = path.join(baseDir, 'logo.gif');
  } else if (req.url === '/sw.js') {
    filePath = path.join(baseDir, 'sw.js');
  } else {
    res.statusCode = 404;
    res.end('Not found');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end('Server error');
      return;
    }
    const ext = path.extname(filePath);
    res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
    // Service worker must be served with no cache
    if (req.url === '/sw.js') {
      res.setHeader('Cache-Control', 'no-store');
    }
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Service Worker Caching demo server running at http://localhost:${PORT}`);
}); 