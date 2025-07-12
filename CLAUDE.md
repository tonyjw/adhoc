# CLAUDE.md - AI Assistant Context

This file provides context and instructions for AI assistants working on the Adhoc Mad Libs project.

## Project Overview

Adhoc is a Mad Libs story generator with two distinct implementations:
- **v1/**: Next.js/React/TypeScript implementation 
- **v2/**: Vanilla HTML/CSS/JavaScript implementation

Both versions create interactive Mad Libs games where users fill in words to complete humorous stories.

## Repository Structure

```
/
├── README.md              # Main project documentation
├── CLAUDE.md             # This file - AI assistant context
├── v1/                   # Next.js implementation (archived)
│   ├── package.json      # Next.js 12.1.0, React 17.0.2, TypeScript
│   ├── pages/            # Next.js pages
│   ├── components/       # React components
│   ├── adhocs/           # Story JSON files (3 stories)
│   └── styles/           # CSS modules
└── v2/                   # Vanilla web implementation (current)
    ├── index.html        # Main application file
    ├── css/styles.css    # Complete styling with animations
    ├── js/app.js         # Application logic (~1000 lines)
    ├── data/             # Story templates (6 JSON files)
    └── README.md         # v2-specific documentation
```

## Development Commands

### For v1 (Next.js):
```bash
cd v1
npm install
npm run dev          # Development server
npm run build        # Production build
npm run lint         # ESLint
```

### For v2 (Vanilla):
```bash
cd v2
# Option 1: Direct file access
open index.html

# Option 2: Local server (recommended for development)
python3 -m http.server 8080
# or
npx serve .
```

## Key Technologies

### v1 Stack:
- Next.js 12.1.0
- React 17.0.2
- TypeScript 4.6.2
- CSS Modules
- ESLint

### v2 Stack:
- HTML5 (semantic markup)
- CSS3 (Grid, Flexbox, custom properties, animations)
- Vanilla JavaScript ES6+ (classes, async/await, modules)
- Web APIs (Local Storage, Web Audio, Navigator Share, Clipboard)

## Story Format Specifications

### v1 Format (in v1/adhocs/):
```json
{
  "title": "Story Title",
  "blanks": [
    { "id": 0, "blankType": "adjective" },
    { "id": 1, "blankType": "noun" }
  ],
  "story": "A {0} {1} walked down the street."
}
```

### v2 Format (in v2/data/):
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

### v1 (TypeScript/React):
- Use TypeScript for type safety
- React functional components with hooks
- CSS Modules for scoped styling
- ESLint configuration provided

### v2 (Vanilla):
- ES6+ classes and modern JavaScript
- CSS custom properties (CSS variables)
- Semantic HTML with accessibility attributes
- No external dependencies

## Common Tasks

### Adding New Stories:
- **v1**: Add JSON file to `v1/adhocs/` using v1 format
- **v2**: Add JSON file to `v2/data/` using v2 format, update theme loading in `app.js`

### Testing:
- **v1**: `npm run build` to check for TypeScript/build errors
- **v2**: Serve locally and test in browser, check browser console for errors

### Styling:
- **v1**: Edit CSS modules in respective component directories
- **v2**: Edit `v2/css/styles.css` (single file with CSS custom properties)

## Important Notes for AI Assistants

### Development Approach:
- **v1 is archived**: Only make changes if specifically requested for historical comparison
- **v2 is active**: Primary development should focus on v2 unless otherwise specified
- Both versions are educational examples showing different paradigms

### When Working on v2:
- Test changes by serving locally: `cd v2 && python3 -m http.server 8080`
- Check browser console for JavaScript errors
- Ensure responsive design works on mobile
- Validate story JSON format matches specification
- Test accessibility features (keyboard navigation)

### Performance Considerations:
- **v1**: Next.js handles optimization automatically
- **v2**: Keep bundle size minimal, avoid external dependencies

### Browser Compatibility:
- **v1**: Modern browsers (handled by Next.js)
- **v2**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+

### Security:
- Both versions are client-side only
- No server-side code or user authentication
- Local storage used for saving stories in v2

## Debugging Tips

### v1 Issues:
- Check TypeScript compilation errors
- Verify React component props and state
- Use Next.js development tools

### v2 Issues:
- Check browser console for JavaScript errors
- Verify JSON file format and fetch requests
- Test Web API compatibility (Local Storage, Web Audio, etc.)
- Use browser dev tools for CSS debugging

## Feature Comparison Quick Reference

| Feature | v1 | v2 |
|---------|----|----|
| Stories | 3 | 6 |
| Save Stories | ❌ | ✅ |
| Share Stories | ❌ | ✅ |
| Sound Effects | ❌ | ✅ |
| Progress Tracking | ❌ | ✅ |
| Random Suggestions | ❌ | ✅ |
| Keyboard Shortcuts | ❌ | ✅ |
| Bundle Size | ~77KB | ~15KB |

This context should help you understand the project structure and make appropriate decisions when assisting with development tasks.