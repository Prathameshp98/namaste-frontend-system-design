# Accessibility Focus Management Demo

A comprehensive demonstration of accessibility focus management techniques using HTML, CSS, and JavaScript.

## Features Demonstrated

### 1. Tab Navigation
- **What it is**: Proper tab order through interactive elements
- **How to test**: Use `Tab` and `Shift+Tab` to navigate through buttons, inputs, selects, and links
- **Implementation**: All interactive elements have proper `tabindex` attributes and focus indicators

### 2. Keyboard Shortcuts
- **What it is**: Global keyboard shortcuts for common actions
- **Available shortcuts**:
  - `Ctrl+K` - Open search
  - `Ctrl+M` - Toggle menu
  - `Ctrl+H` - Show help
  - `Escape` - Close modal
- **How to test**: Press the keyboard shortcuts and watch for visual feedback

### 3. Skip Links
- **What it is**: Hidden links that appear when using Tab navigation to jump to important sections
- **How to test**: Press `Tab` at the very beginning of the page to see skip links appear
- **Available skip links**:
  - Skip to main content
  - Skip to navigation
  - Skip to keyboard shortcuts

### 4. Active Element Tracking
- **What it is**: Real-time display of the currently focused element
- **How to test**: Navigate through the page with Tab and watch the "Currently focused" display update
- **Features**: Shows element tag, ID, class, and text content

### 5. Tab Trapping
- **What it is**: Focus management within a modal dialog
- **How to test**: 
  1. Click "Open Modal (Tab Trapping Demo)"
  2. Use `Tab` and `Shift+Tab` within the modal
  3. Notice focus stays within the modal
  4. Press `Escape` or click outside to close
- **Implementation**: Prevents focus from leaving the modal while open

### 6. Page Navigation
- **What it is**: Programmatic focus management for jumping to different page sections
- **How to test**: Use the navigation buttons to jump to different sections
- **Available actions**:
  - Focus Top of Page
  - Focus Main Content
  - Focus Bottom of Page
  - Focus First Interactive Element

## How to Run

1. Open `index.html` in a modern web browser
2. Use your keyboard to navigate and explore the features
3. Try different keyboard shortcuts and navigation patterns

## Accessibility Features

### Visual Focus Indicators
- All interactive elements have clear, high-contrast focus indicators
- Different colors for different element types (buttons, inputs, links)
- Smooth transitions and animations

### Semantic HTML
- Proper heading hierarchy (h1, h2, h3, h4)
- Semantic elements (nav, main, section, header, footer)
- ARIA attributes for enhanced screen reader support

### Keyboard Navigation
- Full keyboard accessibility
- Logical tab order
- Escape key support for modals
- Skip links for efficient navigation

### Screen Reader Support
- Proper ARIA labels and roles
- Descriptive text for interactive elements
- Announcements for keyboard shortcuts

## Browser Compatibility

This demo works best in modern browsers that support:
- CSS Grid and Flexbox
- ES6+ JavaScript features
- CSS custom properties
- Modern accessibility APIs

## Testing with Assistive Technology

### Screen Readers
- **NVDA (Windows)**: Use Tab to navigate, arrow keys to explore
- **JAWS (Windows)**: Use Tab and arrow keys for navigation
- **VoiceOver (macOS)**: Use Tab and arrow keys, or VoiceOver commands
- **TalkBack (Android)**: Use TalkBack gestures for navigation

### Keyboard Testing
1. **Tab Navigation**: Use Tab and Shift+Tab to move through all interactive elements
2. **Arrow Keys**: Use arrow keys in select elements and radio buttons
3. **Enter/Space**: Activate buttons and links
4. **Escape**: Close modals and dismiss dialogs

## Code Structure

```
Focus Management/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and focus indicators
├── script.js           # JavaScript functionality
└── README.md           # This documentation
```

## Key Implementation Details

### Focus Management Class
The main functionality is implemented in the `FocusManagementDemo` class, which handles:
- Event listeners for keyboard shortcuts
- Active element tracking
- Modal focus trapping
- Page navigation
- Skip link functionality

### CSS Focus Indicators
- `:focus` pseudo-class for all interactive elements
- High-contrast outlines with offset
- Different colors for different element types
- Smooth transitions for better UX

### Accessibility Best Practices
- Proper heading hierarchy
- Semantic HTML elements
- ARIA attributes where needed
- Keyboard-only navigation support
- Screen reader announcements

## Contributing

Feel free to enhance this demo by adding:
- More keyboard shortcuts
- Additional focus management patterns
- More complex modal interactions
- ARIA live regions for dynamic content
- High contrast mode support

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility Guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM Keyboard Navigation](https://webaim.org/techniques/keyboard/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) 