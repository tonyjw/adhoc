# CLAUDE.md - AI Assistant Context

This file provides context and instructions for AI assistants working on the Adhoc Mad Libs project.

## Project Overview

Adhoc is a Mad Libs story generator built with vanilla HTML, CSS, and JavaScript. It creates interactive Mad Libs games where users fill in words to complete humorous stories. The application features a modern, child-friendly design with sound effects, local storage, and sharing capabilities.

## Repository Structure

```
/
├── README.md              # Main project documentation
├── CLAUDE.md             # This file - AI assistant context
├── docs/                 # Symlink to v2/ for GitHub Pages deployment
├── v1/                   # Next.js implementation (archived - do not modify)
└── v2/                   # Main application (focus all development here)
    ├── index.html        # Main application file
    ├── css/styles.css    # Complete styling with animations
    ├── js/app.js         # Application logic (~1000 lines)
    ├── assets/           # SVG icons and static assets
    ├── data/             # Story templates (6 JSON files)
    └── README.md         # v2-specific documentation
```

## Development Commands

### Local Development:
```bash
cd v2

# Option 1: Direct file access (basic testing)
open index.html

# Option 2: Local server (recommended for full functionality)
python3 -m http.server 8081
# or
npx serve . --listen 8081

# If port 8081 is already in use, assume the site is already running
# and test against the running instance at http://localhost:8081
```

### Port Conflict Handling:
When the development server fails to start due to port 8081 being in use:
- **Assume the site is already running** at http://localhost:8081
- Run any tests or validation against the existing server
- Do not attempt to start multiple servers or use different ports
- Simply proceed with testing the application at the expected URL

## Technology Stack

- **HTML5**: Semantic markup with accessibility attributes
- **CSS3**: Grid, Flexbox, custom properties, animations, responsive design
- **Vanilla JavaScript ES6+**: Classes, async/await, modules, Web APIs
- **Web APIs**: Local Storage, Web Audio API, Navigator Share, Clipboard API
- **No external dependencies**: Self-contained application

## Story Format Specification

Stories are stored as JSON files in `v2/data/` with this structure:

```json
{
  "id": "story-id",
  "title": "Story Title", 
  "description": "Brief description",
  "icon": "🎭",
  "template": "A {adjective1} {noun1} walked down the street.",
  "blanks": [
    {"id": "adjective1", "type": "adjective", "label": "Adjective"},
    {"id": "noun1", "type": "noun", "label": "Type of person"}
  ]
}
```

## Code Style Guidelines

- **ES6+ classes and modern JavaScript**: Use async/await, arrow functions, destructuring
- **CSS custom properties**: Use CSS variables for consistent theming
- **Semantic HTML**: Include proper accessibility attributes (aria-labels, roles)
- **No external dependencies**: Keep the application self-contained
- **Mobile-first responsive design**: Ensure functionality on all device sizes

## Common Development Tasks

### Adding New Stories:
1. Create new JSON file in `v2/data/` following the format specification
2. Update the `themeFiles` array in `js/app.js` to include the new story
3. Test loading and functionality

### Testing Changes:
1. Serve locally: `cd v2 && python3 -m http.server 8081`
2. Check browser console for JavaScript errors
3. Test responsive design on mobile viewport
4. Validate story JSON format
5. Test accessibility features (keyboard navigation, screen reader compatibility)

### Styling Updates:
- Edit `v2/css/styles.css` (single file with CSS custom properties)
- Use existing CSS variables for consistent theming
- Maintain child-friendly design aesthetic
- Test animations and hover effects

## Important Development Guidelines

### Primary Focus:
- **Work exclusively on v2**: Do not modify v1 unless specifically requested
- **v1 is archived**: Historical reference only
- **All new features and fixes go in v2**

### Testing Protocol:
1. **Always test locally** before considering changes complete
2. **If port 8081 is in use**, assume site is running and test against it
3. **Check browser console** for errors after changes
4. **Test mobile responsiveness** using browser dev tools
5. **Verify accessibility** with keyboard-only navigation

### File Organization:
- **Single HTML file**: `index.html` contains all markup
- **Single CSS file**: `styles.css` contains all styling
- **Single JS file**: `app.js` contains all application logic
- **JSON data files**: Individual story files in `data/` directory
- **Assets**: SVG icons and images in `assets/` directory

## Color Scheme and Theming

Current color palette (defined in CSS custom properties):
- **Primary**: `#e07a7a` (coral/pink for logo and buttons)
- **Secondary**: `#7B68EE` (purple for icons and accents)
- **Accent**: `#f5e6a8` (warm cream/yellow for backgrounds)
- **Background**: `#f4f6e7` (pale yellow-green)
- **Text**: `#4a4a4a` (dark gray/charcoal)

## Features Overview

- **6 Story Themes**: Space adventure, cooking disaster, office drama, etc.
- **Progressive Word Input**: Step-by-step form with validation
- **Local Storage**: Save and manage completed stories
- **Sound Effects**: Web Audio API for button clicks and completion
- **Sharing**: Native share API with clipboard fallback
- **Keyboard Shortcuts**: Accessibility and power-user features
- **Responsive Design**: Works on mobile, tablet, and desktop
- **No Internet Required**: Fully functional offline

## Browser Compatibility

- **Chrome 60+**
- **Firefox 55+** 
- **Safari 12+**
- **Edge 79+**

## Debugging Guidelines

### Common Issues:
- **JavaScript errors**: Check browser console for stack traces
- **JSON format errors**: Validate story file syntax
- **Web API failures**: Check browser support and permissions
- **CSS layout issues**: Use browser dev tools for debugging
- **Local storage limits**: Clear storage if quota exceeded

### Development Tools:
- **Browser Console**: Primary debugging interface
- **Network Tab**: Monitor file loading and fetch requests
- **Application Tab**: Inspect Local Storage data
- **Responsive Mode**: Test mobile layouts
- **Accessibility Inspector**: Verify screen reader compatibility

This context should help you understand the project structure and focus development efforts exclusively on the v2 implementation.