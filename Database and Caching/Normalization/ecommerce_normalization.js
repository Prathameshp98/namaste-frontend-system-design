// E-commerce Data Normalization Example

// Unnormalized Data Structure
const unnormalizedOrders = [
    {
        orderId: 1,
        customerName: "John Doe",
        customerEmail: "john@example.com",
        customerAddress: "123 Main St, City, Country",
        orderDate: "2024-03-15",
        items: [
            {
                productId: 101,
                productName: "Laptop",
                productCategory: "Electronics",
                productPrice: 999.99,
                quantity: 1
            },
            {
                productId: 102,
                productName: "Mouse",
                productCategory: "Electronics",
                productPrice: 29.99,
                quantity: 2
            }
        ],
        totalAmount: 1059.97
    },
    {
        orderId: 2,
        customerName: "John Doe", // Duplicate customer data
        customerEmail: "john@example.com",
        customerAddress: "123 Main St, City, Country",
        orderDate: "2024-03-16",
        items: [
            {
                productId: 101,
                productName: "Laptop", // Duplicate product data
                productCategory: "Electronics",
                productPrice: 999.99,
                quantity: 1
            }
        ],
        totalAmount: 999.99
    }
];

// Normalized Data Structure
const normalizedData = {
    customers: [
        {
            customerId: 1,
            name: "John Doe",
            email: "john@example.com",
            address: "123 Main St, City, Country"
        }
    ],
    products: [
        {
            productId: 101,
            name: "Laptop",
            category: "Electronics",
            price: 999.99
        },
        {
            productId: 102,
            name: "Mouse",
            category: "Electronics",
            price: 29.99
        }
    ],
    orders: [
        {
            orderId: 1,
            customerId: 1,
            orderDate: "2024-03-15",
            totalAmount: 1059.97
        },
        {
            orderId: 2,
            customerId: 1,
            orderDate: "2024-03-16",
            totalAmount: 999.99
        }
    ],
    orderItems: [
        {
            orderId: 1,
            productId: 101,
            quantity: 1,
            price: 999.99
        },
        {
            orderId: 1,
            productId: 102,
            quantity: 2,
            price: 29.99
        },
        {
            orderId: 2,
            productId: 101,
            quantity: 1,
            price: 999.99
        }
    ]
};

// Function to demonstrate data retrieval from normalized structure
function getOrderDetails(orderId) {
    const order = normalizedData.orders.find(o => o.orderId === orderId);
    const customer = normalizedData.customers.find(c => c.customerId === order.customerId);
    const orderItems = normalizedData.orderItems.filter(oi => oi.orderId === orderId)
        .map(oi => {
            const product = normalizedData.products.find(p => p.productId === oi.productId);
            return {
                ...product,
                quantity: oi.quantity,
                price: oi.price
            };
        });

    return {
        orderId: order.orderId,
        customer: {
            name: customer.name,
            email: customer.email,
            address: customer.address
        },
        orderDate: order.orderDate,
        items: orderItems,
        totalAmount: order.totalAmount
    };
}

// Function to demonstrate data update in normalized structure
function updateProductPrice(productId, newPrice) {
    const product = normalizedData.products.find(p => p.productId === productId);
    if (product) {
        product.price = newPrice;
        // Update all related order items
        normalizedData.orderItems
            .filter(oi => oi.productId === productId)
            .forEach(oi => oi.price = newPrice);
    }
}

// Example usage and improvements demonstration
console.log("=== E-commerce Data Normalization Example ===\n");

// 1. Data Redundancy
console.log("1. Data Redundancy Reduction:");
console.log("Unnormalized: Customer data repeated for each order");
console.log("Normalized: Customer data stored once, referenced by ID\n");

// 2. Data Consistency
console.log("2. Data Consistency:");
console.log("Unnormalized: Product price might be inconsistent across orders");
console.log("Normalized: Product price stored in one place, ensuring consistency\n");

// 3. Data Updates
console.log("3. Data Updates:");
console.log("Unnormalized: Need to update product price in multiple places");
console.log("Normalized: Update product price once, affects all references\n");

// 4. Query Efficiency
console.log("4. Query Efficiency:");
console.log("Unnormalized: Need to search through all orders to find customer data");
console.log("Normalized: Direct access to customer data through customerId\n");

// 5. Storage Efficiency
console.log("5. Storage Efficiency:");
console.log("Unnormalized: Duplicate data increases storage requirements");
console.log("Normalized: Reduced storage through elimination of redundancy\n");

// Demonstrate data retrieval
console.log("=== Example: Retrieving Order Details ===");
const orderDetails = getOrderDetails(1);
console.log(JSON.stringify(orderDetails, null, 2));

// Demonstrate data update
console.log("\n=== Example: Updating Product Price ===");
updateProductPrice(101, 899.99);
console.log("Updated product price and related order items"); 