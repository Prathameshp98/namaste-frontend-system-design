const client = require('./client');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// TODO to expose the call
// which internally calls gRPC server functions using gRPC client

app.get('/', (req, res, next) => {
    client.getAll(null, (err, data) => {
        if(!err){
            res.send(data.customers);
        }
    });
});

app.post('/create', (req, res, next) => {
    let newCustomer = {
        name: req.body.name,
        age: req.body.age,
        address: req.address.address
    }; 

    client.insert(newCustomer, (err, data) => {
        if (err) throw err;

        console.log("Customer successfully created.", data);
        res.send({
            message: "Customer successfully created."
        });
    });
});

app.post('/update', (req, res, next) => {
    let updateCustomer = {
        id: req.body.id,
        name: req.body.name,
        age: req.body.age,
        address: req.address.address
    }; 

    client.update(updateCustomer, (err, data) => {
        if (err) throw err;

        console.log("Customer successfully updated.", data);
        res.send({
            message: "Customer successfully updated."
        });
    });
});

app.post('/remove', (req, res, next) => {
    client.remove({id: req.body.customer_id } , (err, _) => {
        if (err) throw err;

        console.log("Customer remove successfully.");
        res.send({
            message: "Customer removed successfully."
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
