// Focus Management Demo Application
class FocusManagementDemo {
    constructor() {
        this.activeElementText = document.getElementById('active-element-text');
        this.modal = document.getElementById('trapping-modal');
        this.focusableElements = [];
        this.previousActiveElement = null;
        this.isModalOpen = false;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupKeyboardShortcuts();
        this.setupActiveElementTracking();
        this.setupTabTrapping();
        this.setupPageNavigation();
        this.setupSkipLinks();
        
        // Ensure modal is hidden on page load
        if (this.modal) {
            this.modal.hidden = true;
            this.modal.style.display = 'none';
        }
    }

    setupEventListeners() {
        // Modal controls
        const openModalBtn = document.getElementById('open-modal');
        const closeModalBtn = document.getElementById('close-modal');

        if (openModalBtn) {
            openModalBtn.addEventListener('click', () => this.openModal());
        }

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => this.closeModal());
        }

        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isModalOpen) {
                this.closeModal();
            }
        });

        // Close modal on backdrop click - improved event handling
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                // Only close if clicking directly on the modal backdrop, not its children
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });
            
            // Prevent clicks inside modal content from bubbling up
            const modalContent = this.modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.addEventListener('click', (e) => {
                    e.stopPropagation();
                });
            }
        }
    }

    setupKeyboardShortcuts() {
        const shortcuts = {
            'ctrl+k': () => this.triggerShortcut('search-btn', 'Opening search...'),
            'ctrl+m': () => this.triggerShortcut('menu-btn', 'Toggling menu...'),
            'ctrl+h': () => this.triggerShortcut('help-btn', 'Showing help...'),
            'escape': () => this.triggerShortcut('modal-btn', 'Closing modal...')
        };

        document.addEventListener('keydown', (e) => {
            const key = this.getKeyCombo(e);
            
            if (shortcuts[key]) {
                e.preventDefault();
                shortcuts[key]();
            }
        });
    }

    getKeyCombo(e) {
        const keys = [];
        
        if (e.ctrlKey) keys.push('ctrl');
        if (e.altKey) keys.push('alt');
        if (e.shiftKey) keys.push('shift');
        if (e.metaKey) keys.push('meta');
        
        if (e.key !== 'Control' && e.key !== 'Alt' && e.key !== 'Shift' && e.key !== 'Meta') {
            keys.push(e.key.toLowerCase());
        }
        
        return keys.join('+');
    }

    triggerShortcut(buttonId, message) {
        const button = document.getElementById(buttonId);
        if (button) {
            button.classList.add('active');
            this.showNotification(message);
            
            setTimeout(() => {
                button.classList.remove('active');
            }, 500);
        }
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    setupActiveElementTracking() {
        // Track focus changes on all focusable elements
        document.addEventListener('focusin', (e) => {
            this.updateActiveElementDisplay(e.target);
        });

        document.addEventListener('focusout', (e) => {
            // Clear display after a short delay to show focus loss
            setTimeout(() => {
                if (document.activeElement !== e.target) {
                    this.updateActiveElementDisplay(null);
                }
            }, 100);
        });
    }

    updateActiveElementDisplay(element) {
        if (!this.activeElementText) return;

        if (element) {
            const tagName = element.tagName.toLowerCase();
            const className = element.className || '';
            const id = element.id || '';
            const text = element.textContent?.trim() || element.placeholder || element.value || '';
            
            let displayText = `<${tagName}`;
            if (id) displayText += ` id="${id}"`;
            if (className) displayText += ` class="${className}"`;
            displayText += `>`;
            
            if (text) {
                displayText += ` "${text.substring(0, 30)}${text.length > 30 ? '...' : ''}"`;
            }
            
            this.activeElementText.textContent = displayText;
            this.activeElementText.style.color = '#28a745';
        } else {
            this.activeElementText.textContent = 'None';
            this.activeElementText.style.color = '#6c757d';
        }
    }

    setupTabTrapping() {
        if (!this.modal) return;

        // Get all focusable elements within the modal
        const getFocusableElements = () => {
            return this.modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
        };

        // Handle tab key within modal - improved logic
        this.modal.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && this.isModalOpen) {
                const focusableElements = Array.from(getFocusableElements());
                
                if (focusableElements.length === 0) return;
                
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) {
                    // Shift + Tab
                    if (document.activeElement === firstElement || !this.modal.contains(document.activeElement)) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    // Tab
                    if (document.activeElement === lastElement || !this.modal.contains(document.activeElement)) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    }

    openModal() {
        if (!this.modal) return;

        this.isModalOpen = true;
        this.modal.hidden = false;
        this.modal.style.display = 'flex';
        
        // Store the element that had focus before opening modal
        this.previousActiveElement = document.activeElement;
        
        // Focus the first focusable element in the modal
        const firstFocusable = this.modal.querySelector(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (firstFocusable) {
            firstFocusable.focus();
        }

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        console.log('Modal opened, tab trapping active');
    }

    closeModal() {
        if (!this.modal) return;

        this.isModalOpen = false;
        this.modal.hidden = true;
        this.modal.style.display = 'none';
        
        // Restore focus to the previous element
        if (this.previousActiveElement) {
            this.previousActiveElement.focus();
        }

        // Restore body scroll
        document.body.style.overflow = '';
        
        console.log('Modal closed');
    }

    setupPageNavigation() {
        const focusTop = document.getElementById('focus-top');
        const focusMain = document.getElementById('focus-main');
        const focusBottom = document.getElementById('focus-bottom');
        const focusFirstInteractive = document.getElementById('focus-first-interactive');

        if (focusTop) {
            focusTop.addEventListener('click', () => {
                const topSection = document.getElementById('page-top');
                if (topSection) {
                    topSection.focus();
                    this.scrollToElement(topSection);
                }
            });
        }

        if (focusMain) {
            focusMain.addEventListener('click', () => {
                const mainContent = document.getElementById('main-content');
                if (mainContent) {
                    mainContent.focus();
                    this.scrollToElement(mainContent);
                }
            });
        }

        if (focusBottom) {
            focusBottom.addEventListener('click', () => {
                const bottomSection = document.getElementById('page-bottom');
                if (bottomSection) {
                    bottomSection.focus();
                    this.scrollToElement(bottomSection);
                }
            });
        }

        if (focusFirstInteractive) {
            focusFirstInteractive.addEventListener('click', () => {
                const firstInteractive = document.querySelector(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                if (firstInteractive) {
                    firstInteractive.focus();
                    this.scrollToElement(firstInteractive);
                }
            });
        }
    }

    scrollToElement(element) {
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const elementTop = element.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: elementTop,
            behavior: 'smooth'
        });
    }

    setupSkipLinks() {
        // Add smooth scrolling to skip links
        const skipLinks = document.querySelectorAll('.skip-link');
        
        skipLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.focus();
                    this.scrollToElement(targetElement);
                }
            });
        });
    }
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FocusManagementDemo();
    
    // Add some interactive feedback for demo elements
    const demoButtons = document.querySelectorAll('.demo-button, .focusable-element');
    demoButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const originalText = button.textContent;
            button.textContent = 'Clicked!';
            button.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.transform = '';
            }, 200);
        });
    });

    // Add form handling for demo inputs
    const demoInputs = document.querySelectorAll('.demo-input, .modal-input');
    demoInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            if (e.target.value.length > 0) {
                e.target.style.borderColor = '#28a745';
            } else {
                e.target.style.borderColor = '#ddd';
            }
        });
    });

    // Add select handling
    const demoSelects = document.querySelectorAll('.demo-select');
    demoSelects.forEach(select => {
        select.addEventListener('change', (e) => {
            if (e.target.value) {
                e.target.style.borderColor = '#28a745';
            } else {
                e.target.style.borderColor = '#ddd';
            }
        });
    });

    console.log('Accessibility Focus Management Demo initialized!');
    console.log('Try using Tab, Shift+Tab, and the keyboard shortcuts (Ctrl+K, Ctrl+M, Ctrl+H, Escape)');
}); 