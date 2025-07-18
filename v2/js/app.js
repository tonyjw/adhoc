// Adhoc Story Generator Application
class AdhocApp {
    constructor() {
        this.themes = [];
        this.currentTheme = null;
        this.currentWords = {};
        this.currentWordIndex = 0;
        this.savedStories = this.loadSavedStories();
        
        this.init();
    }

    // Initialize the application
    async init() {
        try {
            await this.loadThemes();
            this.setupEventListeners();
            this.hideLoading();
            this.showScreen('themeSelection');
            this.renderThemes();
            this.updateNavigationButtons();
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.showToast('Failed to load the application. Please refresh the page.', 'error');
        }
    }

    // Load story themes from JSON files
    async loadThemes() {
        const themeFiles = [
            'space-adventure',
            'cooking-disaster', 
            'office-drama',
            'unlikely-friends',
            'backyard-wildlife',
            'superhero-mishap'
        ];

        try {
            const themePromises = themeFiles.map(async (filename) => {
                const response = await fetch(`data/${filename}.json`);
                if (!response.ok) throw new Error(`Failed to load ${filename}`);
                return response.json();
            });

            this.themes = await Promise.all(themePromises);
        } catch (error) {
            console.error('Error loading themes:', error);
            throw error;
        }
    }

    // Setup all event listeners
    setupEventListeners() {
        // Navigation
        document.getElementById('homeBtn').addEventListener('click', () => this.goHome());
        document.getElementById('savedStoriesBtn').addEventListener('click', () => this.showSavedStories());
        
        // Theme selection
        document.getElementById('randomThemeBtn').addEventListener('click', () => this.selectRandomTheme());
        
        // Logo book icon click to go back to themes
        document.getElementById('logoBookIcon').addEventListener('click', () => this.showScreen('themeSelection'));
        
        // Word input form
        document.getElementById('wordForm').addEventListener('submit', (e) => this.handleWordSubmit(e));
        document.getElementById('prevWordBtn').addEventListener('click', () => this.previousWord());
        document.getElementById('surpriseMeBtn').addEventListener('click', () => this.surpriseMe());
        
        // Story display
        document.getElementById('backToForm').addEventListener('click', () => this.goBackToForm());
        document.getElementById('saveStoryBtn').addEventListener('click', () => this.saveCurrentStory());
        document.getElementById('shareStoryBtn').addEventListener('click', () => this.shareStory());
        document.getElementById('playAgainBtn').addEventListener('click', () => this.playAgain());
        document.getElementById('newThemeBtn').addEventListener('click', () => this.showScreen('themeSelection'));
        
        // Saved stories
        document.getElementById('clearAllBtn').addEventListener('click', () => this.clearAllStories());
        document.getElementById('startCreatingBtn').addEventListener('click', () => this.showScreen('themeSelection'));
        
        // Toast and modal
        document.getElementById('toastClose').addEventListener('click', () => this.hideToast());
        document.getElementById('confirmCancel').addEventListener('click', () => this.hideModal());
        document.getElementById('confirmOk').addEventListener('click', () => this.confirmAction());
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
        
        // Word input real-time validation
        document.getElementById('currentWordInput').addEventListener('input', () => this.validateCurrentInput());
        
        // Debug mode
        document.getElementById('debugClose').addEventListener('click', () => this.hideDebugMode());
    }

    // Screen management
    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show target screen
        document.getElementById(screenId).classList.add('active');
        
        // Update navigation buttons
        this.updateNavigationButtons();
        
        // Focus management
        if (screenId === 'wordInputForm') {
            setTimeout(() => {
                document.getElementById('currentWordInput').focus();
            }, 100);
        }
    }

    updateNavigationButtons() {
        const currentScreen = document.querySelector('.screen.active').id;
        const homeBtn = document.getElementById('homeBtn');
        const savedBtn = document.getElementById('savedStoriesBtn');
        
        if (currentScreen === 'themeSelection') {
            homeBtn.style.display = 'none';
            savedBtn.style.display = 'inline-block';
        } else if (currentScreen === 'savedStories') {
            homeBtn.style.display = 'inline-block';
            savedBtn.style.display = 'none';
        } else {
            homeBtn.style.display = 'inline-block';
            savedBtn.style.display = 'inline-block';
        }
    }

    hideLoading() {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('app').style.display = 'flex';
    }

    goHome() {
        this.showScreen('themeSelection');
    }

    // Theme selection and rendering
    renderThemes() {
        const themesGrid = document.getElementById('themesGrid');
        themesGrid.innerHTML = '';

        this.themes.forEach(theme => {
            const themeCard = document.createElement('div');
            themeCard.className = 'theme-card';
            themeCard.innerHTML = `
                <span class="theme-icon">${theme.icon}</span>
                <h3 class="theme-title">${theme.title}</h3>
                <p class="theme-description">${theme.description}</p>
            `;
            
            themeCard.addEventListener('click', () => this.selectTheme(theme));
            themesGrid.appendChild(themeCard);
        });
    }

    selectTheme(theme) {
        this.currentTheme = theme;
        this.currentWords = {};
        this.currentWordIndex = 0;
        this.showWordInputForm();
    }

    selectRandomTheme() {
        const randomIndex = Math.floor(Math.random() * this.themes.length);
        const randomTheme = this.themes[randomIndex];
        this.selectTheme(randomTheme);
        this.showToast(`Selected "${randomTheme.title}" for you!`);
    }

    // Word input form management
    showWordInputForm() {
        this.showScreen('wordInputForm');
        this.updateStoryInfo();
        this.updateWordPrompt();
        this.updateProgress();
        this.updateNavigationButtons();
    }

    updateStoryInfo() {
        document.getElementById('currentStoryTitle').textContent = this.currentTheme.title;
        document.getElementById('currentStoryDescription').textContent = this.currentTheme.description;
    }

    updateWordPrompt() {
        const currentBlank = this.currentTheme.blanks[this.currentWordIndex];
        const label = document.getElementById('currentWordLabel');
        const input = document.getElementById('currentWordInput');
        
        // Check if this is asking for a person's name and update the display
        const labelText = currentBlank.label.toLowerCase();
        let displayLabel = currentBlank.label;
        let placeholderText = `Type ${currentBlank.label.toLowerCase()} here...`;
        
        if (labelText.includes('name') || labelText.includes('person')) {
            displayLabel = "person's name";
            placeholderText = 'Type a name here...';
        }
        
        // Determine correct article (a/an)
        const article = this.getCorrectArticle(displayLabel);
        label.textContent = `Enter ${article} ${displayLabel}:`;
        input.placeholder = placeholderText;
        input.value = this.currentWords[currentBlank.id] || '';
        
        // Update navigation buttons
        const prevBtn = document.getElementById('prevWordBtn');
        const nextBtn = document.getElementById('nextWordBtn');
        
        prevBtn.disabled = this.currentWordIndex === 0;
        nextBtn.textContent = this.currentWordIndex === this.currentTheme.blanks.length - 1 ? 'Create Story!' : 'Next →';
        
        this.validateCurrentInput();
    }

    updateProgress() {
        const progress = ((this.currentWordIndex + 1) / this.currentTheme.blanks.length) * 100;
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `Word ${this.currentWordIndex + 1} of ${this.currentTheme.blanks.length}`;
    }

    handleWordSubmit(e) {
        e.preventDefault();
        
        const input = document.getElementById('currentWordInput');
        const word = input.value.trim();
        
        if (!this.validateWord(word)) {
            return;
        }
        
        // Save the current word
        const currentBlank = this.currentTheme.blanks[this.currentWordIndex];
        this.currentWords[currentBlank.id] = word;
        
        // Move to next word or finish
        if (this.currentWordIndex < this.currentTheme.blanks.length - 1) {
            this.nextWord();
        } else {
            this.showStoryDisplay();
        }
    }

    validateWord(word) {
        const errorDiv = document.getElementById('inputError');
        const input = document.getElementById('currentWordInput');
        
        if (!word) {
            this.showInputError('Please enter a word before continuing.');
            return false;
        }
        
        if (word.length < 1) {
            this.showInputError('Please enter at least one character.');
            return false;
        }
        
        // Get the current word type
        const currentBlank = this.currentTheme.blanks[this.currentWordIndex];
        const wordType = currentBlank.type.toLowerCase();
        
        // Different validation based on word type
        if (wordType === 'number') {
            // Allow numbers, decimals, and basic number formats
            if (!/^[0-9]+(\.[0-9]+)?$/.test(word)) {
                this.showInputError('Please enter a valid number.');
                return false;
            }
        } else {
            // For all other word types, allow letters, spaces, hyphens, and apostrophes
            if (!/^[a-zA-Z\s'-]+$/.test(word)) {
                this.showInputError('Please use only letters, spaces, hyphens, and apostrophes.');
                return false;
            }
            
            if (word.length < 2) {
                this.showInputError('Please enter a word with at least 2 characters.');
                return false;
            }
        }
        
        this.hideInputError();
        return true;
    }

    validateCurrentInput() {
        const input = document.getElementById('currentWordInput');
        const word = input.value.trim();
        
        if (word && !this.validateWord(word)) {
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    }

    showInputError(message) {
        const errorDiv = document.getElementById('inputError');
        const input = document.getElementById('currentWordInput');
        
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        input.classList.add('error');
    }

    hideInputError() {
        const errorDiv = document.getElementById('inputError');
        const input = document.getElementById('currentWordInput');
        
        errorDiv.style.display = 'none';
        input.classList.remove('error');
    }

    getCorrectArticle(word) {
        // Check if word starts with vowel sound
        const vowelSounds = /^[aeiouAEIOU]/;
        // Special cases for words that start with 'u' but sound like 'yu'
        const unicornCases = /^[uU]n/; // like "uniform", "university"
        
        if (vowelSounds.test(word) && !unicornCases.test(word)) {
            return 'an';
        }
        return 'a';
    }

    nextWord() {
        if (this.currentWordIndex < this.currentTheme.blanks.length - 1) {
            this.currentWordIndex++;
            this.updateWordPrompt();
            this.updateProgress();
            
            // Clear input and focus
            const input = document.getElementById('currentWordInput');
            input.focus();
        }
    }

    previousWord() {
        if (this.currentWordIndex > 0) {
            this.currentWordIndex--;
            this.updateWordPrompt();
            this.updateProgress();
            
            // Focus input
            const input = document.getElementById('currentWordInput');
            input.focus();
        }
    }

    // Surprise me functionality with creative word suggestions
    surpriseMe() {
        const currentBlank = this.currentTheme.blanks[this.currentWordIndex];
        const input = document.getElementById('currentWordInput');
        
        const wordSuggestions = {
            'noun': ['banana', 'robot', 'sandwich', 'unicorn', 'pizza', 'dragon', 'computer', 'elephant', 'spaceship', 'penguin'],
            'adjective': ['silly', 'gigantic', 'sparkly', 'mysterious', 'wobbly', 'magnificent', 'bizarre', 'fluffy', 'electric', 'invisible'],
            'verb': ['dance', 'explode', 'giggle', 'bounce', 'whisper', 'teleport', 'wiggle', 'shimmer', 'tumble', 'zoom'],
            'adverb': ['quickly', 'silently', 'dramatically', 'carefully', 'wildly', 'gracefully', 'mysteriously', 'enthusiastically', 'gently', 'boldly'],
            'color': ['purple', 'neon green', 'sparkly gold', 'bright orange', 'electric blue', 'hot pink', 'lime green', 'crimson red', 'silver', 'rainbow'],
            'animal': ['llama', 'octopus', 'hedgehog', 'flamingo', 'platypus', 'pangolin', 'axolotl', 'quokka', 'capybara', 'narwhal'],
            'food': ['taco', 'marshmallow', 'pickle', 'donut', 'spaghetti', 'waffle', 'burrito', 'cupcake', 'pretzel', 'bagel'],
            'plural noun': ['socks', 'bubbles', 'cookies', 'buttons', 'feathers', 'marbles', 'springs', 'jellybeans', 'mittens', 'shoelaces'],
            'emotion': ['excited', 'confused', 'amazed', 'delighted', 'puzzled', 'thrilled', 'surprised', 'cheerful', 'curious', 'ecstatic'],
            'number': ['42', '7', '99', '13', '1000', '3.14', '777', '21', '88', '365'],
            'name': ['Alex', 'Sam', 'Jordan', 'Casey', 'Taylor', 'Riley', 'Morgan', 'Avery', 'Quinn', 'Sage', 'Max', 'Luna', 'Leo', 'Zoe', 'Kai'],
            'room': ['kitchen', 'bedroom', 'bathroom', 'living room', 'basement', 'attic', 'garage', 'closet', 'pantry', 'office'],
            'time of day': ['morning', 'afternoon', 'evening', 'night', 'dawn', 'dusk', 'midnight', 'noon', 'sunrise', 'sunset'],
            'day of the week': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            'type of drink': ['water', 'juice', 'soda', 'milk', 'coffee', 'tea', 'smoothie', 'lemonade', 'hot chocolate', 'milkshake'],
            'type of liquid': ['water', 'orange juice', 'milk', 'soda', 'soup', 'paint', 'oil', 'honey', 'syrup', 'sauce'],
            'type of food': ['pizza', 'hamburger', 'spaghetti', 'sandwich', 'tacos', 'soup', 'salad', 'cake', 'cookies', 'ice cream'],
            'kitchen appliance': ['oven', 'microwave', 'blender', 'toaster', 'mixer', 'refrigerator', 'dishwasher', 'coffee maker', 'food processor', 'stove'],
            'office supplies': ['stapler', 'paperclips', 'pens', 'folders', 'notebooks', 'post-it notes', 'rulers', 'erasers', 'markers', 'scissors'],
            'ingredient': ['flour', 'sugar', 'eggs', 'butter', 'vanilla', 'chocolate chips', 'salt', 'pepper', 'onions', 'garlic'],
            'superhero name': ['Captain Thunder', 'Lightning Girl', 'Super Sam', 'Wonder Kid', 'Power Ranger', 'Fire Fox', 'Ice Queen', 'Speed Demon', 'Star Fighter', 'Storm Master'],
            'villain name': ['Dr. Evil', 'Shadow Master', 'Dark Knight', 'Professor Chaos', 'The Destroyer', 'Night Crawler', 'Storm Bringer', 'Fire Demon', 'Ice King', 'Mind Bender'],
            'small animal': ['squirrel', 'rabbit', 'mouse', 'hamster', 'chipmunk', 'ferret', 'guinea pig', 'hedgehog', 'rat', 'gerbil'],
            'bird or small animal': ['robin', 'sparrow', 'cardinal', 'blue jay', 'chickadee', 'mouse', 'squirrel', 'chipmunk', 'hamster', 'rabbit'],
            'type of animal': ['dog', 'cat', 'elephant', 'giraffe', 'lion', 'tiger', 'bear', 'monkey', 'zebra', 'kangaroo'],
            'large place or building': ['mall', 'stadium', 'airport', 'hospital', 'school', 'library', 'museum', 'castle', 'skyscraper', 'cathedral'],
            'type of building': ['house', 'apartment', 'school', 'hospital', 'store', 'restaurant', 'library', 'museum', 'office building', 'factory'],
            'place in building': ['elevator', 'lobby', 'bathroom', 'stairwell', 'cafeteria', 'office', 'meeting room', 'storage room', 'break room', 'reception'],
            'place outdoors': ['park', 'beach', 'forest', 'mountain', 'lake', 'river', 'field', 'garden', 'playground', 'camping site'],
            'outdoor area': ['backyard', 'garden', 'patio', 'deck', 'lawn', 'driveway', 'sidewalk', 'park', 'field', 'forest'],
            'place animals live': ['nest', 'den', 'burrow', 'cave', 'tree', 'barn', 'shed', 'doghouse', 'cage', 'aquarium'],
            'large object': ['truck', 'building', 'tree', 'boulder', 'ship', 'airplane', 'statue', 'mountain', 'bridge', 'tower'],
            'tool or object': ['hammer', 'screwdriver', 'wrench', 'flashlight', 'rope', 'ladder', 'shovel', 'scissors', 'knife', 'bucket'],
            'abstract concept': ['love', 'happiness', 'friendship', 'courage', 'wisdom', 'justice', 'peace', 'freedom', 'hope', 'creativity']
        };
        
        // Find matching word type - improved logic
        let wordType = currentBlank.type.toLowerCase().trim();
        const labelText = currentBlank.label.toLowerCase();
        
        // Check for specific label matches first
        if (labelText.includes('name') || labelText.includes('person')) {
            wordType = 'name';
        }
        else if (labelText.includes('room')) {
            wordType = 'room';
        }
        else if (labelText.includes('time of day') || labelText === 'time of day') {
            wordType = 'time of day';
        }
        else if (labelText.includes('day of the week') || labelText === 'day of the week') {
            wordType = 'day of the week';
        }
        else if (labelText.includes('type of drink') || labelText === 'type of drink') {
            wordType = 'type of drink';
        }
        else if (labelText.includes('type of liquid') || labelText === 'type of liquid') {
            wordType = 'type of liquid';
        }
        else if (labelText.includes('type of food') || labelText === 'type of food') {
            wordType = 'type of food';
        }
        else if (labelText.includes('kitchen appliance') || labelText === 'kitchen appliance') {
            wordType = 'kitchen appliance';
        }
        else if (labelText.includes('office supplies') || labelText === 'office supplies') {
            wordType = 'office supplies';
        }
        else if (labelText.includes('ingredient') || labelText === 'ingredient') {
            wordType = 'ingredient';
        }
        else if (labelText.includes('superhero name') || labelText === 'superhero name') {
            wordType = 'superhero name';
        }
        else if (labelText.includes('villain name') || labelText === 'villain name') {
            wordType = 'villain name';
        }
        else if (labelText.includes('small animal') || labelText === 'small animal') {
            wordType = 'small animal';
        }
        else if (labelText.includes('bird or small animal') || labelText === 'bird or small animal') {
            wordType = 'bird or small animal';
        }
        else if (labelText.includes('type of animal') || labelText === 'type of animal') {
            wordType = 'type of animal';
        }
        else if (labelText.includes('large place or building') || labelText === 'large place or building') {
            wordType = 'large place or building';
        }
        else if (labelText.includes('type of building') || labelText === 'type of building') {
            wordType = 'type of building';
        }
        else if (labelText.includes('place in building') || labelText === 'place in building') {
            wordType = 'place in building';
        }
        else if (labelText.includes('place outdoors') || labelText === 'place outdoors') {
            wordType = 'place outdoors';
        }
        else if (labelText.includes('outdoor area') || labelText === 'outdoor area') {
            wordType = 'outdoor area';
        }
        else if (labelText.includes('place animals live') || labelText === 'place animals live') {
            wordType = 'place animals live';
        }
        else if (labelText.includes('large object') || labelText === 'large object') {
            wordType = 'large object';
        }
        else if (labelText.includes('tool or object') || labelText === 'tool or object') {
            wordType = 'tool or object';
        }
        else if (labelText.includes('abstract concept') || labelText === 'abstract concept') {
            wordType = 'abstract concept';
        }
        // Direct match first
        else if (wordSuggestions[wordType]) {
            // Use direct match
        }
        // Handle special cases with more specific matching
        else if (wordType.includes('plural') && wordType.includes('noun')) {
            wordType = 'plural noun';
        } else if (wordType.includes('noun')) {
            wordType = 'noun';
        } else if (wordType.includes('adjective')) {
            wordType = 'adjective';
        } else if (wordType.includes('verb')) {
            wordType = 'verb';
        } else if (wordType.includes('adverb')) {
            wordType = 'adverb';
        } else if (wordType.includes('color')) {
            wordType = 'color';
        } else if (wordType.includes('animal')) {
            wordType = 'animal';
        } else if (wordType.includes('food')) {
            wordType = 'food';
        } else if (wordType.includes('emotion')) {
            wordType = 'emotion';
        } else if (wordType.includes('number')) {
            wordType = 'number';
        } else {
            // Default fallback
            wordType = 'noun';
        }
        
        // Get suggestions array with safety check
        let suggestions = wordSuggestions[wordType];
        if (!suggestions || !Array.isArray(suggestions) || suggestions.length === 0) {
            console.warn(`No suggestions found for word type: ${wordType}, using noun fallback`);
            suggestions = wordSuggestions['noun'];
        }
        
        const randomWord = suggestions[Math.floor(Math.random() * suggestions.length)];
        
        input.value = randomWord;
        input.classList.add('bounce');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            input.classList.remove('bounce');
        }, 600);
        
        this.validateCurrentInput();
    }

    // Story display
    showStoryDisplay() {
        this.showScreen('storyDisplay');
        this.renderStory();
        document.getElementById('finalStoryTitle').textContent = this.currentTheme.title;
    }

    renderStory() {
        const storyContent = document.getElementById('storyContent');
        let storyText = this.currentTheme.template;
        
        // Replace placeholders with user words
        this.currentTheme.blanks.forEach(blank => {
            const userWord = this.currentWords[blank.id];
            const placeholder = `{${blank.id}}`;
            const highlightedWord = `<span class="user-word">${userWord}</span>`;
            storyText = storyText.replace(new RegExp(placeholder, 'g'), highlightedWord);
        });
        
        storyContent.innerHTML = storyText;
        
        // Add reveal animation
        storyContent.classList.add('fade-in');
    }

    goBackToForm() {
        this.showScreen('wordInputForm');
    }

    playAgain() {
        // Reset words but keep the same theme
        this.currentWords = {};
        this.currentWordIndex = 0;
        this.showWordInputForm();
        this.showToast('Let\'s create another story!');
    }

    // Local storage management
    saveCurrentStory() {
        if (!this.currentTheme || Object.keys(this.currentWords).length === 0) {
            this.showToast('No story to save!', 'warning');
            return;
        }
        
        const story = {
            id: Date.now().toString(),
            theme: this.currentTheme,
            words: this.currentWords,
            createdAt: new Date().toISOString(),
            title: this.currentTheme.title
        };
        
        this.savedStories.unshift(story);
        this.saveSavedStories();
        this.showToast('Story saved successfully!');
    }

    loadSavedStories() {
        try {
            const saved = localStorage.getItem('madLibsSavedStories');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading saved stories:', error);
            return [];
        }
    }

    saveSavedStories() {
        try {
            localStorage.setItem('madLibsSavedStories', JSON.stringify(this.savedStories));
        } catch (error) {
            console.error('Error saving stories:', error);
            this.showToast('Failed to save story to local storage.', 'error');
        }
    }

    showSavedStories() {
        this.showScreen('savedStories');
        this.renderSavedStories();
    }

    renderSavedStories() {
        const container = document.getElementById('savedStoriesContainer');
        const noStoriesDiv = document.getElementById('noSavedStories');
        
        if (this.savedStories.length === 0) {
            container.style.display = 'none';
            noStoriesDiv.style.display = 'block';
            return;
        }
        
        container.style.display = 'block';
        noStoriesDiv.style.display = 'none';
        container.innerHTML = '';
        
        this.savedStories.forEach(story => {
            const storyCard = this.createSavedStoryCard(story);
            container.appendChild(storyCard);
        });
    }

    createSavedStoryCard(story) {
        const card = document.createElement('div');
        card.className = 'saved-story-card';
        
        // Generate preview text
        let previewText = story.theme.template;
        story.theme.blanks.forEach(blank => {
            const userWord = story.words[blank.id];
            const placeholder = `{${blank.id}}`;
            previewText = previewText.replace(new RegExp(placeholder, 'g'), userWord);
        });
        
        // Truncate preview
        const maxLength = 150;
        if (previewText.length > maxLength) {
            previewText = previewText.substring(0, maxLength) + '...';
        }
        
        const createdDate = new Date(story.createdAt).toLocaleDateString();
        
        card.innerHTML = `
            <div class="saved-story-header">
                <h3 class="saved-story-title">${story.title}</h3>
                <span class="saved-story-date">${createdDate}</span>
            </div>
            <p class="saved-story-preview">${previewText}</p>
            <div class="saved-story-actions">
                <button class="saved-story-btn view" onclick="app.viewSavedStory('${story.id}')">
                    👁️ View
                </button>
                <button class="saved-story-btn delete" onclick="app.deleteSavedStory('${story.id}')">
                    🗑️ Delete
                </button>
            </div>
        `;
        
        return card;
    }

    viewSavedStory(storyId) {
        const story = this.savedStories.find(s => s.id === storyId);
        if (!story) return;
        
        // Set current story data
        this.currentTheme = story.theme;
        this.currentWords = story.words;
        
        // Show story display
        this.showStoryDisplay();
        this.showToast('Viewing saved story');
    }

    deleteSavedStory(storyId) {
        this.showConfirmationModal(
            'Delete Story',
            'Are you sure you want to delete this story? This action cannot be undone.',
            () => {
                this.savedStories = this.savedStories.filter(s => s.id !== storyId);
                this.saveSavedStories();
                this.renderSavedStories();
                this.showToast('Story deleted successfully');
            }
        );
    }

    clearAllStories() {
        if (this.savedStories.length === 0) {
            this.showToast('No stories to clear!', 'warning');
            return;
        }
        
        this.showConfirmationModal(
            'Clear All Stories',
            `Are you sure you want to delete all ${this.savedStories.length} saved stories? This action cannot be undone.`,
            () => {
                this.savedStories = [];
                this.saveSavedStories();
                this.renderSavedStories();
                this.showToast('All stories cleared successfully');
            }
        );
    }

    // Share functionality
    shareStory() {
        if (!this.currentTheme || Object.keys(this.currentWords).length === 0) {
            this.showToast('No story to share!', 'warning');
            return;
        }
        
        // Generate shareable text
        let storyText = this.currentTheme.template;
        this.currentTheme.blanks.forEach(blank => {
            const userWord = this.currentWords[blank.id];
            const placeholder = `{${blank.id}}`;
            storyText = storyText.replace(new RegExp(placeholder, 'g'), userWord);
        });
        
        const shareText = `Check out my Mad Libs story: "${this.currentTheme.title}"\n\n${storyText}\n\nCreated with Adhoc Mad Libs!`;
        
        // Try native sharing first, fallback to clipboard
        if (navigator.share) {
            navigator.share({
                title: `Mad Libs: ${this.currentTheme.title}`,
                text: shareText
            }).then(() => {
                this.showToast('Story shared successfully!');
            }).catch(() => {
                this.copyToClipboard(shareText);
            });
        } else {
            this.copyToClipboard(shareText);
        }
    }

    copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                this.showToast('Story copied to clipboard!');
            }).catch(() => {
                this.fallbackCopyToClipboard(text);
            });
        } else {
            this.fallbackCopyToClipboard(text);
        }
    }

    fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showToast('Story copied to clipboard!');
        } catch (err) {
            this.showToast('Failed to copy story. Please try again.', 'error');
        }
        
        document.body.removeChild(textArea);
    }

    // UI utilities
    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        
        toastMessage.textContent = message;
        toast.className = `toast ${type}`;
        toast.style.display = 'flex';
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            this.hideToast();
        }, 3000);
    }

    hideToast() {
        document.getElementById('toast').style.display = 'none';
    }

    showConfirmationModal(title, message, onConfirm) {
        document.getElementById('confirmTitle').textContent = title;
        document.getElementById('confirmMessage').textContent = message;
        document.getElementById('confirmModal').style.display = 'flex';
        
        this.pendingConfirmAction = onConfirm;
    }

    hideModal() {
        document.getElementById('confirmModal').style.display = 'none';
        this.pendingConfirmAction = null;
    }

    confirmAction() {
        if (this.pendingConfirmAction) {
            this.pendingConfirmAction();
        }
        this.hideModal();
    }

    // Keyboard shortcuts
    handleKeyboardShortcuts(e) {
        // Only handle shortcuts when not typing in an input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        switch (e.key) {
            case 'h':
            case 'H':
                this.goHome();
                break;
            case 's':
            case 'S':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    this.saveCurrentStory();
                }
                break;
            case 'r':
            case 'R':
                if (document.querySelector('.screen.active').id === 'themeSelection') {
                    this.selectRandomTheme();
                }
                break;
            case 'Escape':
                this.hideModal();
                this.hideToast();
                break;
        }
    }
    
    // Debug mode methods
    showDebugMode() {
        const debugMode = document.getElementById('debugMode');
        const debugData = document.getElementById('debugData');
        
        let html = '<h3>Available Themes and Story Templates</h3>';
        
        this.themes.forEach((theme, index) => {
            html += `
                <div class="theme-debug">
                    <h4>${theme.title} (${theme.id})</h4>
                    <p><strong>Description:</strong> ${theme.description}</p>
                    <p><strong>Icon:</strong> ${theme.icon}</p>
                    <p><strong>Number of blanks:</strong> ${theme.blanks.length}</p>
                    <details>
                        <summary>View Blanks</summary>
                        <pre>${JSON.stringify(theme.blanks, null, 2)}</pre>
                    </details>
                    <details>
                        <summary>View Template</summary>
                        <pre>${theme.template}</pre>
                    </details>
                    <details>
                        <summary>View Full JSON</summary>
                        <pre>${JSON.stringify(theme, null, 2)}</pre>
                    </details>
                </div>
            `;
        });
        
        debugData.innerHTML = html;
        debugMode.classList.add('active');
    }
    
    hideDebugMode() {
        const debugMode = document.getElementById('debugMode');
        debugMode.classList.remove('active');
    }
}

// Sound effects (simple Web Audio API implementation)
class SoundManager {
    constructor() {
        this.audioContext = null;
        this.enabled = true;
        this.initializeAudio();
    }
    
    initializeAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (error) {
            console.log('Web Audio API not supported');
            this.enabled = false;
        }
    }
    
    playTone(frequency = 440, duration = 200, type = 'sine') {
        if (!this.enabled || !this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration / 1000);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration / 1000);
    }
    
    playSuccess() {
        this.playTone(523.25, 150); // C5
        setTimeout(() => this.playTone(659.25, 150), 100); // E5
        setTimeout(() => this.playTone(783.99, 200), 200); // G5
    }
    
    playError() {
        this.playTone(220, 300, 'sawtooth'); // A3
    }
    
    playClick() {
        this.playTone(800, 50, 'square');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new AdhocApp();
    window.soundManager = new SoundManager();
    
    // Add sound effects to button clicks
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' && window.soundManager) {
            window.soundManager.playClick();
        }
    });
    
    // Add success sound to story completion
    const originalShowStoryDisplay = window.app.showStoryDisplay;
    window.app.showStoryDisplay = function() {
        originalShowStoryDisplay.call(this);
        if (window.soundManager) {
            window.soundManager.playSuccess();
        }
    };
    
    // Add error sound to validation errors
    const originalShowInputError = window.app.showInputError;
    window.app.showInputError = function(message) {
        originalShowInputError.call(this, message);
        if (window.soundManager) {
            window.soundManager.playError();
        }
    };
    
    // Debug mode activation (Ctrl+Shift+D)
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'D') {
            e.preventDefault();
            window.app.showDebugMode();
        }
    });
});

// Service Worker registration for offline capability (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}