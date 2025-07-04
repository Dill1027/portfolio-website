<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Portfolio Website Development Guidelines

This is a modern, responsive portfolio website built with vanilla HTML, CSS, and JavaScript. The project follows these conventions:

## Design System
- Uses CSS custom properties (CSS variables) for theming
- Supports both light and dark themes
- Mobile-first responsive design approach
- Inter font family for typography
- Consistent spacing and border radius values

## Code Style
- Semantic HTML structure
- BEM-like CSS naming conventions
- Modern JavaScript (ES6+) features
- No external frameworks - vanilla JavaScript only
- Accessible markup with proper ARIA labels

## Features
- Dark/light theme toggle with localStorage persistence
- Smooth scrolling navigation
- Mobile hamburger menu
- Contact form with validation
- Scroll animations using Intersection Observer
- Typing animation for hero section
- Responsive design for all screen sizes

## File Structure
- `index.html` - Main HTML structure
- `styles.css` - All styling and responsive design
- `script.js` - Interactive functionality and animations

## Customization Notes
- Update personal information in the HTML
- Replace placeholder project data with real projects
- Add actual contact information and social links
- Consider adding real images instead of Font Awesome placeholders
- Update the color scheme in CSS custom properties if needed

## Deployment Ready
- Optimized for static hosting
- Can be deployed to Azure Static Web Apps
- No build process required
- All assets are self-contained
