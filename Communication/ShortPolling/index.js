
const express = require('express');

const app = express();

let data = {
    name: 'Prathamesh',
    email: 'username@email.com',
    profileImg: 'https://wallpapers.com/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg'
}

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/get-data', (req, res, next) => {
    res.status(200).json(data);
});

app.get('/update-data', (req, res, next) => {
    data = {
        name: 'Prathamesh Patil',
        email: 'username@email.com',
        profileImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROZtHRvCc1MZ3yn6sRa1qChul-li3wPZju1Y6Tu6I2sXbvrtmoHqCyZzEMeWwOodYUUTs&usqp=CAU'
    };
    res.status(200).json('success');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
