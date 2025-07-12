# Adhoc - Mad Libs Story Generator

A creative Mad Libs website that generates hilarious stories by having users fill in words for different parts of speech. This repository contains two different implementations showcasing different approaches to building interactive web applications.

## 🎭 What is Adhoc?

Adhoc is a Mad Libs game where users:
1. Choose from various story themes
2. Fill in words for different parts of speech (nouns, verbs, adjectives, etc.)
3. See their words inserted into a pre-written story template
4. Enjoy the hilarious results!

## 📁 Project Versions

### Version 1 (v1/) - Next.js Implementation
**Technology Stack:** Next.js, React, TypeScript, CSS Modules

The original implementation built with modern React framework:
- **Framework**: Next.js 12.1.0 with React 17.0.2
- **Language**: TypeScript for type safety
- **Styling**: CSS Modules for component-scoped styling
- **Features**: 
  - Server-side rendering (SSR)
  - Static site generation (SSG)
  - Component-based architecture
  - Type-safe development

**Story Themes (v1):**
- The Woods
- Backyard Wildlife  
- Unlikely New Friends

### Version 2 (v2/) - Vanilla Web Implementation
**Technology Stack:** HTML5, CSS3, Vanilla JavaScript

A modern implementation using only web standards:
- **Framework**: None - pure web technologies
- **Language**: Modern JavaScript (ES6+)
- **Styling**: CSS3 with custom properties, Grid, and Flexbox
- **Features**:
  - Single-page application architecture
  - Local storage for saving stories
  - Web Audio API for sound effects
  - Native sharing capabilities
  - Responsive design
  - Accessibility features
  - Keyboard shortcuts

**Story Themes (v2):**
- 🚀 Space Adventure
- 🍳 Cooking Disaster
- 💼 Office Drama
- 🤝 Unlikely New Friends
- 🐿️ Backyard Wildlife
- 🦸 Superhero Mishap

## 🚀 Getting Started

### Running Version 1 (Next.js)
```bash
cd v1
npm install
npm run dev
# Open http://localhost:3000
```

### Running Version 2 (Vanilla)
```bash
cd v2
# Option 1: Open index.html directly in browser
open index.html

# Option 2: Use a local server
python3 -m http.server 8080
# or
npx serve .
# Open http://localhost:8080
```

## 🎯 Feature Comparison

| Feature | v1 (Next.js) | v2 (Vanilla) |
|---------|-------------|-------------|
| **Framework** | Next.js/React | None |
| **Bundle Size** | ~77KB (with framework) | ~15KB (total) |
| **Loading Speed** | SSR/SSG optimized | Instant |
| **Story Themes** | 3 themes | 6 themes |
| **Offline Support** | Limited | Full |
| **Save Stories** | No | Yes (Local Storage) |
| **Share Stories** | No | Yes (Native + Clipboard) |
| **Sound Effects** | No | Yes (Web Audio API) |
| **Animations** | Basic CSS | Advanced CSS + JS |
| **Mobile Responsive** | Yes | Yes |
| **Keyboard Shortcuts** | No | Yes |
| **Form Validation** | Basic | Advanced |
| **Progress Tracking** | No | Yes |
| **Random Word Suggestions** | No | Yes |

## 🛠 Development Philosophy

### Version 1 Approach
- **Component Architecture**: Leverages React's component system for reusable UI elements
- **Type Safety**: TypeScript ensures compile-time error checking
- **Build Optimization**: Next.js handles bundling, minification, and optimization
- **Modern Tooling**: Built-in development server, hot reloading, and deployment optimization

### Version 2 Approach  
- **Web Standards First**: Uses only native browser APIs and standards
- **Zero Dependencies**: No build tools, frameworks, or external libraries required
- **Progressive Enhancement**: Works on any modern browser without compilation
- **Performance Focus**: Minimal payload and instant loading
- **Accessibility**: Built with keyboard navigation and screen reader support

## 📊 Performance Metrics

### v1 (Next.js)
- **First Load JS**: 71KB shared + page-specific bundles
- **Bundle Analysis**: Framework code, React runtime, page components
- **Build Process**: Compilation, bundling, optimization required
- **Deployment**: Static export or server-side rendering

### v2 (Vanilla)
- **Total Size**: ~15KB (HTML + CSS + JS combined)
- **No Build Process**: Ready to deploy as-is
- **Cache Strategy**: Individual file caching
- **Loading**: Instant on modern browsers

## 🎨 Design Principles

Both versions follow these design principles:
- **Playful & Fun**: Bright colors, animations, and engaging interactions
- **User-Friendly**: Clear navigation and progress indicators
- **Responsive**: Works on desktop, tablet, and mobile devices
- **Accessible**: Keyboard navigation and semantic HTML
- **Fast**: Optimized for quick loading and smooth interactions

## 🔄 Migration Story

This project demonstrates the evolution from a modern framework-based approach (v1) to a vanilla web standards approach (v2). The migration showcases:

1. **Reduced Complexity**: Eliminated build tools and dependencies
2. **Improved Performance**: Faster loading with smaller bundle size
3. **Enhanced Features**: Added local storage, sharing, and sound effects
4. **Better Offline Experience**: Works without internet after initial load
5. **Simplified Deployment**: No build process required

## 📝 Adding New Stories

### For v1 (Next.js):
Add stories in the `v1/adhocs/` directory with this structure:
```json
{
  "title": "Story Title",
  "blanks": [
    { "id": 0, "blankType": "adjective" },
    { "id": 1, "blankType": "noun" },
    { "id": 2, "blankType": "verb" }
  ],
  "story": "This is a story of the very {0} {1} that could {2}."
}
```

### For v2 (Vanilla):
Add stories in the `v2/data/` directory with this structure:
```json
{
  "id": "story-id",
  "title": "Story Title",
  "description": "Brief description",
  "icon": "🎭",
  "template": "Story with {placeholder1} and {placeholder2}...",
  "blanks": [
    {"id": "placeholder1", "type": "noun", "label": "Person's name"},
    {"id": "placeholder2", "type": "adjective", "label": "Adjective"}
  ]
}
```

## 🚀 Deployment

### v1 (Next.js)
- Deployed on Vercel at https://adhoc.lessread.me/
- Automatic deployment from `main` branch

### v2 (Vanilla)
- Can be deployed to any static hosting service
- No build process required
- Simply upload the `v2/` folder contents

## 🤝 Contributing

Both versions are designed to be educational examples. Feel free to:
- Compare implementation approaches
- Use as learning material for different web development paradigms
- Extend with additional features
- Create new story themes

## 📄 License

This project is open source and available for educational purposes.

---

**Which version should you use?**
- **Choose v1** if you're building with React/Next.js ecosystem and want component architecture
- **Choose v2** if you want maximum performance, simplicity, and no build dependencies