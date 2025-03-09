// Define the ranks
const ranks = [
    { name: "Newbie", threshold: 0, description: "You're just starting your cybersecurity journey. Keep learning!" },
    { name: "Script Kiddie", threshold: 0.2, description: "You're familiar with basic tools but need deeper understanding." },
    { name: "Security Enthusiast", threshold: 0.4, description: "You're building good security knowledge. Keep practicing!" },
    { name: "Security Analyst", threshold: 0.6, description: "You have solid security foundations and analytical skills." },
    { name: "Security Expert", threshold: 0.75, description: "You have extensive knowledge across multiple security domains." },
    { name: "Security Guru", threshold: 0.9, description: "You've mastered cybersecurity concepts. Few challenges can stump you!" }
];

// Define the categories
const categories = [
    { id: "self_protection", name: "Protecting Yourself First", file: "questions/self_protection.json", description: "Personal security measures and protection" },
    { id: "cyber_terms", name: "Common Cybersecurity Terms", file: "questions/cyber_terms.json", description: "Terminology and concepts in cybersecurity" },
    { id: "computers", name: "What is a computer?", file: "questions/computers.json", description: "Fundamentals of computing systems" },
    { id: "windows", name: "Understanding Windows", file: "questions/windows.json", description: "Windows operating system security" },
    { id: "file_integrity", name: "File Integrity", file: "questions/file_integrity.json", description: "File integrity monitoring and verification" },
    { id: "batch", name: "Understanding Batch", file: "questions/batch.json", description: "Batch scripting and security" },
    { id: "powershell", name: "Understanding PowerShell", file: "questions/powershell.json", description: "PowerShell scripting and security" },
    { id: "python", name: "Understanding Python", file: "questions/python.json", description: "Python programming for security" },
    { id: "vscode", name: "Visual Studio Code Tips", file: "questions/vscode.json", description: "Using VS Code for security tasks" },
    { id: "obfuscation", name: "Obfuscation & Minified Code", file: "questions/obfuscation.json", description: "Code obfuscation techniques" },
    { id: "crypto", name: "Basic Encryption & Cryptography", file: "questions/crypto.json", description: "Encryption principles and methods" },
    { id: "hashcat", name: "Hashcat & Cracking Hashes", file: "questions/hashcat.json", description: "Password cracking and hash analysis" },
    { id: "web_dev", name: "Web Development Basics", file: "questions/web_dev.json", description: "Web development security fundamentals" },
    { id: "hardware", name: "Hardware and Tools", file: "questions/hardware.json", description: "Physical security tools and hardware" },
    { id: "virtual_machines", name: "Virtual Machines", file: "questions/virtual_machines.json", description: "Virtualization for security testing" },
    { id: "linux_distros", name: "Linux Distros", file: "questions/linux_distros.json", description: "Linux distributions for security" },
    { id: "linux_usage", name: "Linux Structure & Usage", file: "questions/linux_usage.json", description: "Linux OS structure and commands" },
    { id: "kali_tools", name: "Kali Linux Tools", file: "questions/kali_tools.json", description: "Tools in Kali Linux distribution" },
    { id: "internet", name: "Internet Infrastructure", file: "questions/internet.json", description: "How the internet works" },
    { id: "isps", name: "ISPs and Networking", file: "questions/isps.json", description: "Internet service providers and networking" },
    { id: "devtools", name: "Browser DevTools", file: "questions/devtools.json", description: "Using browser developer tools" },
    { id: "network_analysis", name: "Network Analysis", file: "questions/network_analysis.json", description: "Analyzing network traffic" },
    { id: "data_formats", name: "Data Formats", file: "questions/data_formats.json", description: "Various data formats and security" },
    { id: "website_osint", name: "Website OSINT", file: "questions/website_osint.json", description: "Open-source intelligence for websites" },
    { id: "port_scanning", name: "Port Scanning", file: "questions/port_scanning.json", description: "Network port scanning techniques" },
    { id: "directory_scanning", name: "Directory Scanning", file: "questions/directory_scanning.json", description: "Web directory enumeration techniques" },
    { id: "idor", name: "IDOR", file: "questions/idor.json", description: "Insecure Direct Object Reference vulnerabilities" },
    { id: "wifi_hacking", name: "WiFi Hacking", file: "questions/wifi_hacking.json", description: "Wireless network security testing" },
    { id: "network_mapping", name: "Network Mapping", file: "questions/network_mapping.json", description: "Creating network maps and topology" },
    { id: "cve_mitre", name: "CVEs and MITRE", file: "questions/cve_mitre.json", description: "Common Vulnerabilities and Exposures" },
    { id: "security_models", name: "Security Models", file: "questions/security_models.json", description: "Frameworks for secure systems" },
    { id: "pentesting", name: "Pentesting Methodology", file: "questions/pentesting.json", description: "Structured penetration testing approaches" },
    { id: "resources", name: "Website Resources", file: "questions/resources.json", description: "Online resources for security professionals" },
    { id: "dorking", name: "Dorking", file: "questions/dorking.json", description: "Advanced search techniques" },
    { id: "tool_scenarios", name: "Tool Specific Questions", file: "questions/tool_scenarios.json", description: "Using specific security tools" },
    { id: "ctf", name: "CTF Techniques", file: "questions/ctf.json", description: "Capture The Flag competition skills" },
    { id: "mobile_security", name: "Mobile Security Testing", file: "questions/mobile_security.json", description: "Testing security of mobile applications" },
    { id: "reverse_engineering", name: "Reverse Engineering", file: "questions/reverse_engineering.json", description: "Analyzing and understanding software" }
];

// Quiz state
const quizState = {
    categories: categories,
    currentCategory: null,
    questions: {}, // Will hold questions for each category
    currentQuestionIndex: 0,
    answeredQuestions: {}, // By category
    score: {}, // By category
    totalPoints: {}, // By category
    maxPossiblePoints: {}, // By category
    selectedOption: null,
    answered: false,
    loading: true,
    currentRank: ranks[0],
    overallScore: 0,
    overallMaxPossible: 0,
    categoryProgress: {} // Tracks progress for each category
};

// Initialize category-specific state
categories.forEach(category => {
    quizState.answeredQuestions[category.id] = [];
    quizState.score[category.id] = 0;
    quizState.totalPoints[category.id] = 0;
    quizState.maxPossiblePoints[category.id] = 0;
    quizState.categoryProgress[category.id] = {
        available: false, // Will be set to true when successfully loaded
        progress: 0
    };
});

// DOM elements - Get these when document is loaded
let loadingElement;
let categoriesView;
let categoriesContainer;
let categoryCountElement;
let quizView;
let categoryIndicator;
let questionElement;
let optionsElement;
let feedbackElement;
let nextButton;
let backToCategoriesButton;
let resetButton;
let overallProgressStat;
let overallScoreStat;
let rankBadge;
let rankName;
let rankProgressBar;
let currentRankElement;
let nextRankElement;
let rankDescription;
let themeToggle;

// Filter buttons
let filterAllButton;
let filterAvailableButton;
let filterCompletedButton;
let filterInProgressButton;

// Display the current question
function displayQuestion() {
    // Get questions for the current category
    const categoryQuestions = quizState.questions[quizState.currentCategory];

    // Check if questions exist before trying to display them
    if (!categoryQuestions || categoryQuestions.length === 0) {
        console.error(`No questions available for category: ${quizState.currentCategory}`);
        return;
    }

    // Get the current question for this category
    const currentQuestion = categoryQuestions[quizState.currentQuestionIndex];

    // Double-check that the current question exists
    if (!currentQuestion) {
        console.error('Current question is undefined', {
            category: quizState.currentCategory,
            index: quizState.currentQuestionIndex,
            totalQuestions: categoryQuestions.length
        });
        return;
    }

    // Reset state for new question
    quizState.selectedOption = null;
    quizState.answered = false;
    nextButton.disabled = true;
    feedbackElement.style.display = 'none';
    feedbackElement.classList.remove('correct', 'incorrect');

    // Display question with weight indicator
    questionElement.innerHTML = `
        ${currentQuestion.question}
        <span class="question-weight">Weight: ${currentQuestion.weight || 1}</span>
    `;

    // Display options - MODIFIED: No event listeners on individual options
    optionsElement.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.dataset.index = index;
        // No event listener here - we use event delegation instead
        optionsElement.appendChild(optionElement);
    });
}

// Load questions for all categories
async function loadAllCategories() {
    loadingElement.classList.remove('hidden');
    categoriesView.classList.add('hidden');

    let loadedCount = 0;
    const totalCategories = categories.length;

    try {
        // Load questions from separate JSON files for each category
        const loadPromises = categories.map(async (category) => {
            try {
                console.log(`Attempting to load: ${category.file}`);
                const response = await fetch(category.file);

                if (!response.ok) {
                    console.warn(`HTTP error when loading ${category.id}: ${response.status}`);
                    throw new Error(`Failed to load ${category.id} questions: ${response.status}`);
                }

                // First get the response as text to help with debugging
                const text = await response.text();

                if (!text || text.trim() === '') {
                    console.warn(`Empty JSON file for ${category.id}`);
                    throw new Error(`Empty JSON file for ${category.id}`);
                }

                try {
                    // Parse the text into JSON
                    const data = JSON.parse(text);
                    quizState.questions[category.id] = data;

                    // Calculate max possible points for this category
                    quizState.maxPossiblePoints[category.id] = data.reduce(
                        (sum, question) => sum + (question.weight || 1), 0
                    );

                    // Update overall max possible
                    quizState.overallMaxPossible += quizState.maxPossiblePoints[category.id];

                    // Mark this category as available
                    quizState.categoryProgress[category.id].available = true;
                    loadedCount++;

                    console.log(`Successfully loaded ${category.id}: ${data.length} questions`);
                    return { success: true, category: category.id };
                } catch (jsonError) {
                    console.error(`JSON parse error for ${category.id}:`, jsonError,
                        "First 100 chars:", text.substring(0, 100) + "...");
                    throw jsonError;
                }
            } catch (error) {
                console.error(`Error loading ${category.id} questions:`, error);

                // Mark this category as unavailable but don't fail entirely
                quizState.categoryProgress[category.id].available = false;
                // Initialize with empty array to prevent errors
                quizState.questions[category.id] = [];

                return { success: false, category: category.id };
            }
        });

        const results = await Promise.allSettled(loadPromises);
        const failedCategories = results
            .filter(result => result.status === 'rejected' || (result.status === 'fulfilled' && !result.value.success))
            .map(result => result.status === 'fulfilled' ? result.value.category : 'unknown');

        if (failedCategories.length > 0) {
            console.warn(`Failed to load questions for categories: ${failedCategories.join(', ')}`);
        }

        console.log(`Successfully loaded ${loadedCount}/${totalCategories} categories`);

        // Load saved progress from localStorage
        loadProgress();

        // Update statistics
        updateStats();

        // Update rank information
        updateRank();

        // Render category cards
        renderCategoryCards();

        // Hide loading spinner, show categories
        quizState.loading = false;
        loadingElement.classList.add('hidden');
        categoriesView.classList.remove('hidden');

    } catch (error) {
        console.error('Error during quiz initialization:', error);

        // Even with an unexpected error, we'll try to show categories as unavailable
        // Initialize any undefined state
        categories.forEach(category => {
            if (!quizState.questions[category.id]) {
                quizState.questions[category.id] = [];
            }
            quizState.categoryProgress[category.id].available = false;
        });

        // Try to render what we can
        loadingElement.classList.add('hidden');
        categoriesView.classList.remove('hidden');
        renderCategoryCards();
    }
}

// Function to handle loading error button click
function loadErrorHandling() {
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('categories-view').classList.remove('hidden');
    renderCategoryCards();
}

// Make loadErrorHandling available globally
window.loadErrorHandling = loadErrorHandling;

// Render category cards in the category selection view - MODIFIED: No event listeners on individual cards
function renderCategoryCards() {
    categoriesContainer.innerHTML = '';

    categories.forEach(category => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.dataset.categoryId = category.id;

        // Check if category is available (JSON file loaded successfully)
        const isAvailable = quizState.questions[category.id] &&
            quizState.questions[category.id].length > 0 &&
            quizState.categoryProgress[category.id].available;

        if (!isAvailable) {
            categoryCard.classList.add('category-unavailable');
        }

        // Calculate progress percentage for this category
        const totalQuestions = quizState.questions[category.id] ? quizState.questions[category.id].length : 0;
        const answeredQuestions = quizState.answeredQuestions[category.id] ? quizState.answeredQuestions[category.id].length : 0;
        const progressPercentage = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;

        // Calculate score percentage for this category
        const categoryScore = quizState.totalPoints[category.id] || 0;
        const categoryMaxScore = quizState.maxPossiblePoints[category.id] || 0;
        const scorePercentage = categoryMaxScore > 0 ? (categoryScore / categoryMaxScore) * 100 : 0;

        categoryCard.innerHTML = `
            <h3 class="category-title">${category.name}</h3>
            <p>${category.description}</p>
            <div class="category-progress">
                <div class="category-progress-bar" style="width: ${progressPercentage}%"></div>
            </div>
            <div class="category-stats">
                <span>${answeredQuestions}/${totalQuestions} Questions</span>
                <span>${categoryScore}/${categoryMaxScore} Points</span>
            </div>
            ${!isAvailable ? '<div class="unavailable-badge">Not Available</div>' : ''}
        `;

        // No event listeners here - we use event delegation instead
        categoriesContainer.appendChild(categoryCard);
    });

    // Update category count text
    categoryCountElement.textContent = `Showing all ${categories.length} categories`;

    // Apply current filter
    const activeFilter = document.querySelector('.filter-button.active');
    if (activeFilter) {
        const filterType = activeFilter.id.replace('filter-', '');
        filterCategories(filterType);
    } else {
        filterCategories('all');
    }
}

// Start quiz for a specific category
function startCategoryQuiz(categoryId) {
    // Set current category
    quizState.currentCategory = categoryId;
    const category = categories.find(cat => cat.id === categoryId);

    // Set category indicator
    categoryIndicator.textContent = category.name;

    // Find next unanswered question in this category
    findNextUnansweredQuestion();

    // Hide categories view, show quiz view
    categoriesView.classList.add('hidden');
    quizView.classList.remove('hidden');
}

// Find the next unanswered question in the current category
function findNextUnansweredQuestion() {
    const categoryQuestions = quizState.questions[quizState.currentCategory];

    if (!categoryQuestions || categoryQuestions.length === 0) {
        // No questions available
        questionElement.innerHTML = `<p>No questions available for this category.</p>`;
        optionsElement.innerHTML = '';
        feedbackElement.style.display = 'none';
        nextButton.disabled = true;
        return false;
    }

    // Check if all questions in this category have been answered
    const answeredQuestionIndices = quizState.answeredQuestions[quizState.currentCategory].map(q => q.questionIndex);
    const unansweredIndices = [];

    for (let i = 0; i < categoryQuestions.length; i++) {
        if (!answeredQuestionIndices.includes(i)) {
            unansweredIndices.push(i);
        }
    }

    if (unansweredIndices.length === 0) {
        // All questions in this category have been answered
        questionElement.innerHTML = `
            <h2>Category Complete!</h2>
            <p>You've answered all questions in this category.</p>
            <p>Score: ${quizState.totalPoints[quizState.currentCategory]}/${quizState.maxPossiblePoints[quizState.currentCategory]}</p>
        `;
        optionsElement.innerHTML = '';
        feedbackElement.style.display = 'none';
        nextButton.disabled = true;
        return false;
    }

    // Set current question to the first unanswered question
    quizState.currentQuestionIndex = unansweredIndices[0];
    displayQuestion();
    return true;
}

// Handle option selection - MODIFIED to work with event delegation
function selectOption(event) {
    if (quizState.answered) return;

    const selectedIndex = parseInt(event.target.dataset.index);
    const currentQuestion = quizState.questions[quizState.currentCategory][quizState.currentQuestionIndex];

    // Reset previously selected option
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
    });

    // Mark selected option
    event.target.classList.add('selected');
    quizState.selectedOption = selectedIndex;

    // Enable next button
    nextButton.disabled = false;

    // Check answer
    const isCorrect = selectedIndex === currentQuestion.correctAnswer;

    // Show feedback
    feedbackElement.style.display = 'block';
    if (isCorrect) {
        feedbackElement.classList.add('correct');
        feedbackElement.textContent = 'Correct! ' + (currentQuestion.explanation || '');
        event.target.classList.add('correct');
        quizState.totalPoints[quizState.currentCategory] += (currentQuestion.weight || 1);
        quizState.overallScore += (currentQuestion.weight || 1);
    } else {
        feedbackElement.classList.add('incorrect');
        const correctOption = currentQuestion.options[currentQuestion.correctAnswer];
        feedbackElement.textContent = `Incorrect. The correct answer is: "${correctOption}". ` +
            (currentQuestion.explanation || '');
        event.target.classList.add('incorrect');
        document.querySelectorAll('.option')[currentQuestion.correctAnswer].classList.add('correct');
    }

    // Update state
    quizState.answered = true;
    quizState.answeredQuestions[quizState.currentCategory].push({
        questionIndex: quizState.currentQuestionIndex,
        isCorrect,
        weight: currentQuestion.weight || 1
    });

    if (isCorrect) {
        quizState.score[quizState.currentCategory]++;
    }

    // Update statistics
    updateStats();

    // Update rank information
    updateRank();

    // Save progress
    saveProgress();
}

// Move to the next question
function nextQuestion() {
    // Check if all questions in the category have been answered
    if (findNextUnansweredQuestion() === false) {
        // Go back to categories view if all questions are answered
        backToCategories();
    }
}

// Go back to categories view
function backToCategories() {
    quizView.classList.add('hidden');
    categoriesView.classList.remove('hidden');
    renderCategoryCards(); // Update category progress
}

// Update statistics display - MODIFIED to use correct DOM element IDs
function updateStats() {
    let totalAnsweredQuestions = 0;
    let totalQuestions = 0;

    for (const categoryId in quizState.answeredQuestions) {
        totalAnsweredQuestions += quizState.answeredQuestions[categoryId].length;
    }

    for (const categoryId in quizState.questions) {
        totalQuestions += quizState.questions[categoryId].length;
    }

    // Use correct element IDs as in the HTML
    if (overallProgressStat) {
        overallProgressStat.textContent = `Overall: ${totalAnsweredQuestions}/${totalQuestions}`;
    }
    if (overallScoreStat) {
        overallScoreStat.textContent = `Total Score: ${quizState.overallScore}/${quizState.overallMaxPossible}`;
    }
}

// Update rank information
function updateRank() {
    // Calculate percentage of max possible points
    const percentComplete = quizState.overallMaxPossible > 0 ?
        quizState.overallScore / quizState.overallMaxPossible : 0;

    // Determine current rank
    let currentRank = ranks[0];
    let nextRank = ranks[1];

    for (let i = ranks.length - 1; i >= 0; i--) {
        if (percentComplete >= ranks[i].threshold) {
            currentRank = ranks[i];
            nextRank = i < ranks.length - 1 ? ranks[i + 1] : ranks[i];
            break;
        }
    }

    // Update UI
    if (rankName) rankName.textContent = currentRank.name;
    if (currentRankElement) currentRankElement.textContent = currentRank.name;

    // If user has reached top rank, show that instead of "next rank"
    if (currentRank === ranks[ranks.length - 1]) {
        if (nextRankElement) nextRankElement.textContent = "Maximum Rank Achieved!";
        if (rankProgressBar) rankProgressBar.style.width = "100%";
    } else {
        if (nextRankElement) nextRankElement.textContent = nextRank.name;

        // Calculate progress to next rank
        const currentThreshold = currentRank.threshold;
        const nextThreshold = nextRank.threshold;
        const progress = (percentComplete - currentThreshold) / (nextThreshold - currentThreshold) * 100;
        if (rankProgressBar) rankProgressBar.style.width = `${Math.min(progress, 100)}%`;
    }

    if (rankDescription) rankDescription.textContent = currentRank.description;
    quizState.currentRank = currentRank;
}

// Load saved progress from localStorage
function loadProgress() {
    const savedProgress = localStorage.getItem('cybersecurityQuizProgress');
    if (savedProgress) {
        try {
            const progress = JSON.parse(savedProgress);

            // Load category-specific progress
            for (const categoryId in progress.answeredQuestions) {
                quizState.answeredQuestions[categoryId] = progress.answeredQuestions[categoryId] || [];
                quizState.score[categoryId] = progress.score[categoryId] || 0;
                quizState.totalPoints[categoryId] = progress.totalPoints[categoryId] || 0;
            }

            // Load overall progress
            quizState.overallScore = progress.overallScore || 0;

            // Validate if the saved progress matches the current questions
            // This prevents issues if questions have been added/removed
            for (const categoryId in quizState.questions) {
                const categoryQuestions = quizState.questions[categoryId];
                if (categoryQuestions) {
                    // Filter out saved answers for questions that no longer exist
                    quizState.answeredQuestions[categoryId] = (quizState.answeredQuestions[categoryId] || [])
                        .filter(q => q.questionIndex < categoryQuestions.length);
                }
            }
        } catch (error) {
            console.error('Error loading saved progress:', error);
            resetQuiz(); // Reset if the saved progress is corrupt
        }
    }
}

// Save progress to localStorage
function saveProgress() {
    const progress = {
        answeredQuestions: quizState.answeredQuestions,
        score: quizState.score,
        totalPoints: quizState.totalPoints,
        overallScore: quizState.overallScore
    };
    localStorage.setItem('cybersecurityQuizProgress', JSON.stringify(progress));
}

// Reset quiz progress
function resetQuiz() {
    if (confirm('Are you sure you want to reset all your quiz progress? This cannot be undone.')) {
        localStorage.removeItem('cybersecurityQuizProgress');

        // Reset category-specific state
        categories.forEach(category => {
            quizState.answeredQuestions[category.id] = [];
            quizState.score[category.id] = 0;
            quizState.totalPoints[category.id] = 0;
        });

        // Reset overall stats
        quizState.overallScore = 0;

        // Update UI
        updateStats();
        updateRank();
        renderCategoryCards();

        // Go back to categories view if in quiz view
        if (!quizView.classList.contains('hidden')) {
            backToCategories();
        }
    }
}

// Filter categories based on criteria
function filterCategories(filterType) {
    // Update active button
    document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`filter-${filterType}`).classList.add('active');

    const categoryCards = document.querySelectorAll('.category-card');
    let visibleCount = 0;

    categoryCards.forEach(card => {
        const categoryId = card.dataset.categoryId;
        const isAvailable = quizState.questions[categoryId] &&
            quizState.questions[categoryId].length > 0 &&
            quizState.categoryProgress[categoryId].available;

        const totalQuestions = quizState.questions[categoryId] ? quizState.questions[categoryId].length : 0;
        const answeredQuestions = quizState.answeredQuestions[categoryId] ? quizState.answeredQuestions[categoryId].length : 0;

        const isCompleted = answeredQuestions > 0 && answeredQuestions === totalQuestions;
        const isInProgress = answeredQuestions > 0 && answeredQuestions < totalQuestions;

        let shouldShow = false;

        switch (filterType) {
            case 'all':
                shouldShow = true;
                break;
            case 'available':
                shouldShow = isAvailable;
                break;
            case 'completed':
                shouldShow = isCompleted;
                break;
            case 'in-progress':
                shouldShow = isInProgress;
                break;
        }

        if (shouldShow) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // Update count text
    categoryCountElement.textContent = `Showing ${visibleCount} of ${categories.length} categories`;

    // Show empty state if no categories match filter
    if (visibleCount === 0) {
        // Remove any existing empty state
        const existingEmptyState = document.querySelector('.category-empty-state');
        if (existingEmptyState) {
            existingEmptyState.remove();
        }

        // Create and add empty state message
        const emptyState = document.createElement('div');
        emptyState.className = 'category-empty-state';

        let message = '';
        switch (filterType) {
            case 'available':
                message = 'No available categories found. Make sure you have created JSON files for your categories.';
                break;
            case 'completed':
                message = 'You haven\'t completed any categories yet. Keep going!';
                break;
            case 'in-progress':
                message = 'You haven\'t started any categories yet. Click on a category to begin!';
                break;
            default:
                message = 'No categories found.';
        }

        emptyState.innerHTML = `
            <h3>No matches found</h3>
            <p>${message}</p>
            <button class="btn" onclick="showAllCategories()">Show All Categories</button>
        `;

        categoriesContainer.appendChild(emptyState);
    }
}

// Function to show all categories (for the empty state button)
function showAllCategories() {
    document.getElementById('filter-all').click();
}

// Make this function available in the global scope
window.showAllCategories = showAllCategories;

// Modified event handling using event delegation
document.addEventListener('DOMContentLoaded', function () {
    // Initialize DOM element references
    loadingElement = document.getElementById('loading');
    categoriesView = document.getElementById('categories-view');
    categoriesContainer = document.getElementById('categories-container');
    categoryCountElement = document.getElementById('category-count');
    quizView = document.getElementById('quiz-view');
    categoryIndicator = document.getElementById('category-indicator');
    questionElement = document.getElementById('question');
    optionsElement = document.getElementById('options');
    feedbackElement = document.getElementById('feedback');
    nextButton = document.getElementById('next-btn');
    backToCategoriesButton = document.getElementById('back-to-categories-btn');
    resetButton = document.getElementById('reset-btn');
    overallProgressStat = document.getElementById('overall-progress-stat');
    overallScoreStat = document.getElementById('overall-score-stat');
    rankBadge = document.getElementById('rank-badge');
    rankName = document.getElementById('rank-name');
    rankProgressBar = document.getElementById('rank-progress-bar');
    currentRankElement = document.getElementById('current-rank');
    nextRankElement = document.getElementById('next-rank');
    rankDescription = document.getElementById('rank-description');
    themeToggle = document.getElementById('theme-toggle');

    // Filter buttons
    filterAllButton = document.getElementById('filter-all');
    filterAvailableButton = document.getElementById('filter-available');
    filterCompletedButton = document.getElementById('filter-completed');
    filterInProgressButton = document.getElementById('filter-in-progress');

    // Add event listeners using event delegation where appropriate
    nextButton.addEventListener('click', nextQuestion);
    backToCategoriesButton.addEventListener('click', backToCategories);
    resetButton.addEventListener('click', resetQuiz);

    // Use event delegation for options - attach to the parent element instead
    if (optionsElement) {
        optionsElement.addEventListener('click', function (event) {
            // Find the closest .option parent from the clicked element
            const option = event.target.closest('.option');
            if (option) {
                // Call selectOption with the proper target
                selectOption({ target: option });
            }
        });
    }

    // Use event delegation for categories container
    if (categoriesContainer) {
        categoriesContainer.addEventListener('click', function (event) {
            // Find the closest .category-card parent from the clicked element
            const categoryCard = event.target.closest('.category-card');
            if (categoryCard) {
                const categoryId = categoryCard.dataset.categoryId;
                const category = categories.find(cat => cat.id === categoryId);

                // Check if category is available
                const isAvailable = quizState.questions[categoryId] &&
                    quizState.questions[categoryId].length > 0 &&
                    quizState.categoryProgress[categoryId].available;

                if (isAvailable) {
                    startCategoryQuiz(categoryId);
                } else {
                    alert(`The questions for "${category.name}" are not available yet. Please check back later or ensure the ${category.file} file exists.`);
                }
            }
        });
    }

    // Filter button event listeners
    filterAllButton.addEventListener('click', () => filterCategories('all'));
    filterAvailableButton.addEventListener('click', () => filterCategories('available'));
    filterCompletedButton.addEventListener('click', () => filterCategories('completed'));
    filterInProgressButton.addEventListener('click', () => filterCategories('in-progress'));

    // Load all categories and questions
    loadAllCategories();
});
