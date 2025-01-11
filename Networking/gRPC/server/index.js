const PROTO_PATH = './customers.proto';

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

const customersProto = grpc.loadPackageDefinition(packageDefinition);

// Initialize gRPC server
const server = new grpc.Server();

// Sample Customer Data
const customers = [
    { id: "1", name: "Alice Johnson", age: 28, address: "456 Elm Street, Springfield, IL, 62701" },
    { id: "2", name: "Bob Smith", age: 35, address: "789 Oak Avenue, Dover, DE, 19901" },
];

// Add Service Implementation
server.addService(customersProto.CustomerServer.service, {
    GetAll: (call, callback) => {
        callback(null, { customers });
    },
    Get: (call, callback) => {
        const customer = customers.find(c => c.id === call.request.id);
        if (customer) {
            callback(null, customer);
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Customer not found"
            });
        }
    },
    Insert: (call, callback) => {
        const customer = call.request;
        customers.push(customer);
        callback(null, customer);
    },
    Update: (call, callback) => {
        const customer = customers.find(c => c.id === call.request.id);
        if (customer) {
            customer.name = call.request.name;
            customer.age = call.request.age;
            customer.address = call.request.address;
            callback(null, customer);
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Customer not found"
            });
        }
    },
    Remove: (call, callback) => {
        const index = customers.findIndex(c => c.id === call.request.id);
        if (index !== -1) {
            customers.splice(index, 1);
            callback(null, {});
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Customer not found"
            });
        }
    }
});

// Start Server
const PORT = "127.0.0.1:30043";
server.bindAsync(PORT, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.error(`Server error: ${err}`);
    } else {
        server.start();
        console.log(`gRPC server running at ${PORT}`);
    }
});
