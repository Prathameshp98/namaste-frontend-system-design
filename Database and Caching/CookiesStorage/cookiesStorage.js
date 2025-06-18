// Cookie Storage Management System
// This example demonstrates a shopping cart and user preferences system using cookies

class CookieManager {
    constructor() {
        this.cookieOptions = {
            path: '/',
            secure: true, // Only send cookies over HTTPS
            sameSite: 'Strict' // Protect against CSRF attacks
        };
    }

    // Set a cookie with options
    setCookie(name, value, days = 7) {
        try {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            const expires = `expires=${date.toUTCString()}`;
            const cookieValue = typeof value === 'object' ? JSON.stringify(value) : value;
            document.cookie = `${name}=${cookieValue};${expires};path=${this.cookieOptions.path};secure=${this.cookieOptions.secure};samesite=${this.cookieOptions.sameSite}`;
            console.log(`Cookie ${name} set successfully`);
            return true;
        } catch (error) {
            console.error('Error setting cookie:', error);
            return false;
        }
    }

    // Get a cookie value
    getCookie(name) {
        try {
            const cookies = document.cookie.split(';');
            for (let cookie of cookies) {
                const [cookieName, cookieValue] = cookie.trim().split('=');
                if (cookieName === name) {
                    try {
                        return JSON.parse(cookieValue);
                    } catch {
                        return cookieValue;
                    }
                }
            }
            return null;
        } catch (error) {
            console.error('Error getting cookie:', error);
            return null;
        }
    }

    // Delete a cookie
    deleteCookie(name) {
        try {
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${this.cookieOptions.path}`;
            console.log(`Cookie ${name} deleted successfully`);
            return true;
        } catch (error) {
            console.error('Error deleting cookie:', error);
            return false;
        }
    }
}

class ShoppingCartManager extends CookieManager {
    constructor() {
        super();
        this.CART_COOKIE = 'shopping_cart';
        this.initializeCart();
    }

    initializeCart() {
        if (!this.getCart()) {
            this.setCookie(this.CART_COOKIE, []);
        }
    }

    addToCart(product) {
        const cart = this.getCart();
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1,
                addedAt: new Date().toISOString()
            });
        }

        this.setCookie(this.CART_COOKIE, cart);
        this.updateCartDisplay();
    }

    removeFromCart(productId) {
        const cart = this.getCart();
        const updatedCart = cart.filter(item => item.id !== productId);
        this.setCookie(this.CART_COOKIE, updatedCart);
        this.updateCartDisplay();
    }

    updateQuantity(productId, quantity) {
        const cart = this.getCart();
        const item = cart.find(item => item.id === productId);
        
        if (item) {
            item.quantity = quantity;
            this.setCookie(this.CART_COOKIE, cart);
            this.updateCartDisplay();
        }
    }

    getCart() {
        return this.getCookie(this.CART_COOKIE) || [];
    }

    clearCart() {
        this.setCookie(this.CART_COOKIE, []);
        this.updateCartDisplay();
    }

    getCartTotal() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    updateCartDisplay() {
        const cart = this.getCart();
        console.log('Current Cart:', cart);
        console.log('Cart Total: $' + this.getCartTotal().toFixed(2));
    }
}

class UserPreferencesManager extends CookieManager {
    constructor() {
        super();
        this.PREFERENCES_COOKIE = 'user_preferences';
        this.initializePreferences();
    }

    initializePreferences() {
        if (!this.getPreferences()) {
            this.setDefaultPreferences();
        }
    }

    setDefaultPreferences() {
        const defaultPreferences = {
            theme: 'light',
            language: 'en',
            currency: 'USD',
            notifications: true,
            fontSize: 'medium'
        };
        this.setCookie(this.PREFERENCES_COOKIE, defaultPreferences);
    }

    updatePreferences(newPreferences) {
        const currentPreferences = this.getPreferences();
        const updatedPreferences = { ...currentPreferences, ...newPreferences };
        this.setCookie(this.PREFERENCES_COOKIE, updatedPreferences);
        console.log('Preferences updated:', updatedPreferences);
    }

    getPreferences() {
        return this.getCookie(this.PREFERENCES_COOKIE);
    }
}

// Example usage:

// Create instances
const cartManager = new ShoppingCartManager();
const preferencesManager = new UserPreferencesManager();

// Sample products
const products = [
    {
        id: 1,
        name: 'Smartphone',
        price: 699.99,
        category: 'Electronics'
    },
    {
        id: 2,
        name: 'Laptop',
        price: 1299.99,
        category: 'Electronics'
    },
    {
        id: 3,
        name: 'Headphones',
        price: 99.99,
        category: 'Electronics'
    }
];

// Simulate shopping session
console.log('=== Shopping Cart Demo ===');

// Add items to cart
cartManager.addToCart(products[0]); // Add smartphone
cartManager.addToCart(products[1]); // Add laptop
cartManager.addToCart(products[0]); // Add another smartphone

// Update quantity
cartManager.updateQuantity(1, 3); // Update smartphone quantity to 3

// Remove an item
cartManager.removeFromCart(2); // Remove laptop

// Display cart
console.log('\n=== Cart State ===');
cartManager.updateCartDisplay();

// User preferences demo
console.log('\n=== User Preferences Demo ===');

// Update preferences
preferencesManager.updatePreferences({
    theme: 'dark',
    language: 'es',
    currency: 'EUR'
});

// Display preferences
console.log('Current Preferences:', preferencesManager.getPreferences());

// Helper function to display all cookies
function displayAllCookies() {
    console.log('\n=== All Cookies ===');
    console.log(document.cookie);
}

displayAllCookies(); 