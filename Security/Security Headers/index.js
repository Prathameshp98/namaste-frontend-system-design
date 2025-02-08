const express = require('express');
const { join } = require('node:path');

const app = express();

// If 1st request is made from http then the server responds with the https version of that page and sets security transport header
// if next request is also htt, then browser handles it by calling https
const redirectToHttps = (req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      // Redirect to HTTPS
      return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  next(); };

//Added this middleware - whatever has to happen goes throgh this middleware
app.use((req, res, next) => {
    res.removeHeader('X-Powered-By'); // does not reveal the server we are using 
    res.setHeader('Referrer-Policy', 'no-referrer'); // does not give the url from where we go redirected to the current page
    res.setHeader('X-Content-Type-Options', 'nosniff'); // this tells the browser that only accept the response type which is mentioned in the 'Content-Type'
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    next();
})

// Serve static files (e.g., index.html) from the 'public' folder
app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(jo in(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
