const PROTO_PATH = './customers.proto';

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load the .proto file
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
});

// Load the gRPC package definition
const customersProto = grpc.loadPackageDefinition(packageDefinition);

// Access CustomerService from the loaded package
const CustomerService = customersProto.CustomerService;

// Create a new client instance using the service
const client = new CustomerService(
    '127.0.0.1:30043', // gRPC server address
    grpc.credentials.createInsecure()
);

module.exports = client;
