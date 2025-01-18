
const express = require('express');

const app = express();

let data = {
    name: 'Prathamesh',
    email: 'username@email.com',
    profileImg: 'https://wallpapers.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg',
    lastUpdated: Date.now()
}
let clientWaitlist = [];

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/get-data', (req, res, next) => {
    const lastUpdatedParam = parseInt(req.query.lastUpdated);

    if(data.lastUpdated !== lastUpdatedParam){
        res.status(200).json(data);
    } 

    let responseSend = false;

    // Add the client to the waitlist with a server-side timeout (10 seconds)
    const timeout = setTimeout(() => {
        const index = clientWaitlist.findIndex(client => client.res === res);
        if (index > -1) {
            clientWaitlist.splice(index, 1);
            res.status(408).json({ message: 'Request timed out. No updates available. Please refresh the page.' }); 
            responseSend = true;
        }
    }, 10000);  // Timeout after 10 seconds

    clientWaitlist.push({ res, timeout });  // Store client with timeout reference

    res.on('finish', () => {
        isResponseSent = true;
        clearTimeout(timeout);  // Clean up the timeout if the response is already sent
    });

});

app.get('/update-data', (req, res, next) => {
    data = {
        name: 'Prathamesh Patil',
        email: data.email,
        profileImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROZtHRvCc1MZ3yn6sRa1qChul-li3wPZju1Y6Tu6I2sXbvrtmoHqCyZzEMeWwOodYUUTs&usqp=CAU',
        lastUpdated: Date.now(), 
    };

    // Process all waiting clients in the waitlist
    while (clientWaitlist.length > 0) {
        const client = clientWaitlist.pop();

        // Make sure to access the response object inside the client
        if (client.res && !client.res.headersSent) {
            // Send the data to the client if headers haven't been sent already
            client.res.json(data);

            // Optionally clear the timeout if one was set
            clearTimeout(client.timeout);
        } else {
            console.log('Client response already sent or missing');
        }
    }

    res.json('Data update success.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
