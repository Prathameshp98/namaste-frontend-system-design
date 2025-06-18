

// User Authentication and Preferences Management System using localStorage

class UserManager {
    constructor() {
        this.USER_KEY = 'currentUser';
        this.PREFERENCES_KEY = 'userPreferences';
        this.AUTH_TOKEN_KEY = 'authToken';
        this.RECENT_ACTIVITY_KEY = 'recentActivity';
    }

    // User Authentication Methods
    loginUser(userData) {
        try {
            // Store user data
            const userToStore = {
                id: userData.id,
                username: userData.username,
                email: userData.email,
                lastLogin: new Date().toISOString()
            };
            localStorage.setItem(this.USER_KEY, JSON.stringify(userToStore));

            // Store authentication token
            localStorage.setItem(this.AUTH_TOKEN_KEY, userData.token);

            // Initialize user preferences if not exists
            if (!this.getUserPreferences()) {
                this.setDefaultPreferences();
            }

            // Log recent activity
            this.logActivity('User logged in');
            
            console.log('User logged in successfully');
            return true;
        } catch (error) {
            console.error('Error during login:', error);
            return false;
        }
    }

    logoutUser() {
        try {
            // Log recent activity before clearing
            this.logActivity('User logged out');
            
            // Clear user data
            localStorage.removeItem(this.USER_KEY);
            localStorage.removeItem(this.AUTH_TOKEN_KEY);
            console.log('User logged out successfully');
            return true;
        } catch (error) {
            console.error('Error during logout:', error);
            return false;
        }
    }

    // User Preferences Methods
    setDefaultPreferences() {
        const defaultPreferences = {
            theme: 'light',
            notifications: true,
            language: 'en',
            fontSize: 'medium',
            emailNotifications: true,
            twoFactorAuth: false
        };
        this.updatePreferences(defaultPreferences);
    }

    updatePreferences(newPreferences) {
        try {
            const currentPreferences = this.getUserPreferences() || {};
            const updatedPreferences = { ...currentPreferences, ...newPreferences };
            localStorage.setItem(this.PREFERENCES_KEY, JSON.stringify(updatedPreferences));
            this.logActivity('Preferences updated');
            console.log('Preferences updated successfully');
            return true;
        } catch (error) {
            console.error('Error updating preferences:', error);
            return false;
        }
    }

    getUserPreferences() {
        try {
            const preferences = localStorage.getItem(this.PREFERENCES_KEY);
            return preferences ? JSON.parse(preferences) : null;
        } catch (error) {
            console.error('Error getting preferences:', error);
            return null;
        }
    }

    // Activity Logging
    logActivity(activity) {
        try {
            const activities = this.getRecentActivities();
            activities.unshift({
                action: activity,
                timestamp: new Date().toISOString()
            });
            // Keep only last 10 activities
            const recentActivities = activities.slice(0, 10);
            localStorage.setItem(this.RECENT_ACTIVITY_KEY, JSON.stringify(recentActivities));
        } catch (error) {
            console.error('Error logging activity:', error);
        }
    }

    getRecentActivities() {
        try {
            const activities = localStorage.getItem(this.RECENT_ACTIVITY_KEY);
            return activities ? JSON.parse(activities) : [];
        } catch (error) {
            console.error('Error getting activities:', error);
            return [];
        }
    }

    // Utility Methods
    isUserLoggedIn() {
        return !!localStorage.getItem(this.AUTH_TOKEN_KEY);
    }

    getCurrentUser() {
        try {
            const user = localStorage.getItem(this.USER_KEY);
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error('Error getting current user:', error);
            return null;
        }
    }

    getAuthToken() {
        return localStorage.getItem(this.AUTH_TOKEN_KEY);
    }
}

// Example usage:

// Create user manager instance
const userManager = new UserManager();

// Simulate user login
const userData = {
    id: 1,
    username: 'john_doe',
    email: 'john@example.com',
    token: 'sample-auth-token-123'
};

console.log('=== User Authentication Demo ===');
userManager.loginUser(userData);

// Update user preferences
console.log('\n=== User Preferences Demo ===');
userManager.updatePreferences({
    theme: 'dark',
    fontSize: 'large',
    emailNotifications: false
});

// Log some activities
console.log('\n=== Activity Logging Demo ===');
userManager.logActivity('Changed theme to dark');
userManager.logActivity('Updated profile picture');
userManager.logActivity('Changed password');

// Display current state
console.log('\n=== Current State ===');
console.log('Is user logged in:', userManager.isUserLoggedIn());
console.log('Current user:', userManager.getCurrentUser());
console.log('User preferences:', userManager.getUserPreferences());
console.log('Recent activities:', userManager.getRecentActivities());

// Simulate user logout
console.log('\n=== Logout Demo ===');
userManager.logoutUser();
console.log('Is user logged in:', userManager.isUserLoggedIn());

// Helper function to check localStorage usage
function checkLocalStorageUsage() {
    let total = 0;
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            total += localStorage[key].length;
        }
    }
    console.log(`\nTotal localStorage usage: ${total} bytes`);
}

checkLocalStorageUsage();
