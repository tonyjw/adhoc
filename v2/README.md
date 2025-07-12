# Adhoc Mad Libs v2

A modern, interactive Mad Libs website built with vanilla HTML, CSS, and JavaScript.

## Features

### Core Functionality
- ✅ 6 creative story themes (Space Adventure, Cooking Disaster, Office Drama, Unlikely Friends, Backyard Wildlife, Superhero Mishap)
- ✅ Interactive word input form with progress tracking
- ✅ Story generation with animated word highlighting
- ✅ Form validation and error handling

### User Experience
- ✅ Theme selection screen with random theme option
- ✅ Progress indicator showing current word position
- ✅ "Surprise Me" button for random word suggestions
- ✅ Play again functionality
- ✅ Smooth animations and transitions

### Bonus Features
- ✅ Local storage for saving/loading stories
- ✅ Share functionality (native sharing API + clipboard fallback)
- ✅ Sound effects using Web Audio API
- ✅ Keyboard shortcuts (H for home, S for save, R for random theme)
- ✅ Responsive design for mobile and desktop
- ✅ Toast notifications for user feedback
- ✅ Confirmation modals for destructive actions

## How to Run

1. Open `index.html` in a web browser, or
2. Serve the files using a local web server:
   ```bash
   # Using Python
   python3 -m http.server 8081
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8081
   ```

## Project Structure

```
v2/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All CSS styling and animations
├── js/
│   └── app.js          # JavaScript application logic
├── data/               # Story template JSON files
│   ├── space-adventure.json
│   ├── cooking-disaster.json
│   ├── office-drama.json
│   ├── unlikely-friends.json
│   ├── backyard-wildlife.json
│   └── superhero-mishap.json
└── assets/             # (Empty - for future images/sounds)
```

## Technology Stack

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with CSS Grid, Flexbox, custom properties, animations
- **Vanilla JavaScript**: ES6+ features, classes, async/await
- **Web APIs**: Local Storage, Web Audio API, Navigator Share API, Clipboard API

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Features in Detail

### Story Templates
Each story template is a JSON file containing:
- Theme metadata (title, description, icon)
- Story template with placeholders
- Blank definitions with types and labels

### Word Input
- Real-time validation
- Type-specific suggestions
- Progress tracking
- Navigation between words

### Story Display
- Animated word highlighting
- Share functionality
- Save to local storage
- Play again options

### Saved Stories
- Persistent local storage
- Story preview cards
- View and delete options
- Clear all functionality

## Keyboard Shortcuts

- `H` - Go home
- `S` (Ctrl/Cmd+S) - Save current story
- `R` - Random theme (on theme selection screen)
- `Escape` - Close modals/toasts

## Development Notes

The application uses a single-page architecture with screen management. All data is stored in JSON files and browser local storage - no backend required.

Sound effects are generated using the Web Audio API for a retro gaming feel. The application is fully responsive and works offline after initial load.