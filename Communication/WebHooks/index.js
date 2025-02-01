const express = require('express');
const { join } = require('node:path');

const app = express();

// Serve static files (e.g., index.html) from the 'public' folder
app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'index.html'));
});

app.post('/webhooks', (req, res, next) => {
    // extract data from the incoming POST request
    const payload = req.body;

    // log the received payload (process the data)
    console.log('Received webhook payload: ', payload);

    // optinonally send a response to acknowlege
    res.status(200).send('Webhook data received sucessfully.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
