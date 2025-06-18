// Shopping Cart Example using sessionStorage

class ShoppingCart {
    constructor() {
        this.cartKey = 'shoppingCart';
        this.initializeCart();
    }

    // Initialize cart if it doesn't exist
    initializeCart() {
        if (!this.getCart()) {
            this.saveCart([]);
        }
    }

    // Save cart to sessionStorage
    saveCart(cartItems) {
        try {
            sessionStorage.setItem(this.cartKey, JSON.stringify(cartItems));
            console.log('Cart saved successfully');
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    }

    // Get cart from sessionStorage
    getCart() {
        try {
            const cart = sessionStorage.getItem(this.cartKey);
            return cart ? JSON.parse(cart) : null;
        } catch (error) {
            console.error('Error getting cart:', error);
            return null;
        }
    }

    // Add item to cart
    addItem(product) {
        const cart = this.getCart();
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }

        this.saveCart(cart);
        this.updateCartDisplay();
    }

    // Remove item from cart
    removeItem(productId) {
        const cart = this.getCart();
        const updatedCart = cart.filter(item => item.id !== productId);
        this.saveCart(updatedCart);
        this.updateCartDisplay();
    }

    // Update item quantity
    updateQuantity(productId, quantity) {
        const cart = this.getCart();
        const item = cart.find(item => item.id === productId);
        
        if (item) {
            item.quantity = quantity;
            this.saveCart(cart);
            this.updateCartDisplay();
        }
    }

    // Calculate cart total
    getCartTotal() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Update cart display (simulated UI update)
    updateCartDisplay() {
        const cart = this.getCart();
        console.log('Current Cart:', cart);
        console.log('Cart Total: $' + this.getCartTotal().toFixed(2));
    }

    // Clear cart
    clearCart() {
        this.saveCart([]);
        this.updateCartDisplay();
    }
}

// Example usage:

// Create a new shopping cart instance
const cart = new ShoppingCart();

// Sample products
const products = [
    {
        id: 1,
        name: 'Laptop',
        price: 999.99,
        category: 'Electronics'
    },
    {
        id: 2,
        name: 'Headphones',
        price: 99.99,
        category: 'Electronics'
    },
    {
        id: 3,
        name: 'Mouse',
        price: 29.99,
        category: 'Electronics'
    }
];

// Simulate shopping session
console.log('=== Starting Shopping Session ===');

// Add items to cart
cart.addItem(products[0]); // Add laptop
cart.addItem(products[1]); // Add headphones
cart.addItem(products[0]); // Add another laptop (quantity will be 2)

// Update quantity of an item
cart.updateQuantity(1, 3); // Update laptop quantity to 3

// Remove an item
cart.removeItem(2); // Remove headphones

// Get current cart state
console.log('\n=== Final Cart State ===');
cart.updateCartDisplay();

// Clear cart (uncomment to test)
// cart.clearCart();

// Helper function to demonstrate session persistence
function demonstrateSessionPersistence() {
    console.log('\n=== Session Storage Demo ===');
    console.log('Cart data persists during the session:');
    console.log('Try refreshing the page - the cart data will remain');
    console.log('Try closing the tab and opening a new one - the cart data will be gone');
}

demonstrateSessionPersistence();
