# Adhoc - A Story Generator for Families

A delightful story generator that creates hilarious tales by having users fill in words for different parts of speech. Perfect for family fun and creative storytelling!

## 🎭 What is Adhoc?

Adhoc is an interactive story generator where users:
1. Choose from various story themes
2. Fill in words for different parts of speech (names, verbs, adjectives, etc.)
3. Watch their words get inserted into pre-written story templates
4. Enjoy the hilarious and creative results!

## 🚀 Getting Started

### Running the Application
```bash
cd v2
# Option 1: Open index.html directly in browser
open index.html

# Option 2: Use a local server (recommended for development)
python3 -m http.server 8081
# or
npx serve .
# Open http://localhost:8081
```

## ✨ Features

- **6 Fun Story Themes**: Space Adventure, Cooking Disaster, Office Drama, Unlikely Friends, Backyard Wildlife, and Superhero Mishap
- **Smart Word Suggestions**: Click the ✨ sparkle button for creative word ideas
- **Save & Share Stories**: Keep your favorite creations and share them with friends
- **Family-Friendly Design**: Clean, colorful interface designed for all ages
- **Mobile Responsive**: Works perfectly on phones, tablets, and computers
- **Sound Effects**: Fun audio feedback for button clicks and interactions
- **Keyboard Shortcuts**: Navigate efficiently with keyboard controls
- **Progress Tracking**: See how many words are left as you create your story
- **Handwritten-Style Output**: Stories display like traditional paper Mad Libs

## 🎨 Technology

Built with modern web standards for maximum compatibility and performance:
- **HTML5**: Semantic markup for accessibility
- **CSS3**: Custom properties, Grid, Flexbox, and smooth animations
- **Vanilla JavaScript**: Modern ES6+ features without framework dependencies
- **Web APIs**: Local Storage, Web Audio, Navigator Share, and Clipboard
- **Zero Build Process**: Ready to run in any modern browser

## 📝 Adding New Stories

Create new story files in the `v2/data/` directory:

```json
{
  "id": "my-new-story",
  "title": "My Amazing Story",
  "description": "A tale of adventure and wonder",
  "icon": "🌟",
  "template": "Once upon a time, {name1} found a {adjective1} {noun1}...",
  "blanks": [
    {"id": "name1", "type": "noun", "label": "Person's name"},
    {"id": "adjective1", "type": "adjective", "label": "Adjective"},
    {"id": "noun1", "type": "noun", "label": "Object"}
  ]
}
```

## 🎯 Design Philosophy

- **Child-Friendly**: Warm colors, simple navigation, and encouraging feedback
- **Accessible**: Keyboard navigation, semantic HTML, and proper contrast ratios
- **Fast & Lightweight**: ~15KB total size with instant loading
- **Progressive**: Works offline after first visit
- **No Dependencies**: Pure web standards for maximum compatibility

## 📱 Browser Support

Works on all modern browsers:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🚀 Deployment

Deploy to any static hosting service:
- No build process required
- Simply upload the `v2/` folder contents
- Works with GitHub Pages, Netlify, Vercel, or any web server

## 🗂️ Project Archive

The `v1/` directory contains an archived Next.js implementation of this project from an earlier development phase. The current v2 implementation is the recommended version with enhanced features and better performance.

## 🤝 Contributing

This project welcomes contributions! Feel free to:
- Add new story themes
- Improve the user interface
- Enhance accessibility features
- Fix bugs or add new functionality

## 📄 License

This project is open source and available for educational and personal use.

---

**Ready to create some hilarious stories?** Open `v2/index.html` in your browser and let the fun begin! 🎉