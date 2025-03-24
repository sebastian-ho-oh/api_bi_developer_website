// Function to fetch CV data from the API
async function loadCVData() {
    try {
        console.log('Fetching CV data...');
        const response = await fetch('/api/cv', {
            headers: {
                'Accept': 'application/json',
                'Cache-Control': 'no-cache'
            }
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Server response:', errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Server did not return JSON');
        }
        
        const data = await response.text();
        console.log('Received data length:', data.length);
        console.log('First 100 characters:', data.substring(0, 100));
        
        if (!data || data.trim() === '') {
            throw new Error('Empty response received');
        }
        
        try {
            const parsedData = JSON.parse(data);
            console.log('Successfully parsed JSON data');
            return parsedData;
        } catch (parseError) {
            console.error('JSON Parse Error:', parseError);
            console.error('Invalid JSON content:', data);
            throw new Error('Invalid JSON format received from server');
        }
    } catch (error) {
        console.error('Error loading CV data:', error);
        throw error;
    }
}

// Function to adjust heights of timeline items and project cards
function adjustHeights() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const content = item.querySelector('.timeline-content');
        const projectCards = item.querySelector('.project-cards');
        
        if (content && projectCards) {
            // Get the total height of all project cards
            const projectCardsHeight = Array.from(projectCards.children)
                .reduce((total, card) => total + card.offsetHeight, 0);
            
            // Add padding and gap to the total height
            const totalProjectCardsHeight = projectCardsHeight + 
                (parseInt(getComputedStyle(projectCards).paddingTop) || 0) +
                (parseInt(getComputedStyle(projectCards).paddingBottom) || 0) +
                (parseInt(getComputedStyle(projectCards).gap) || 0) * (projectCards.children.length - 1);
            
            // Set the height of the timeline item to match the project cards height
            item.style.height = `${totalProjectCardsHeight}px`;
            
            // Ensure the content has the same height
            content.style.height = `${totalProjectCardsHeight}px`;
            
            // Add a small delay to ensure all content is rendered
            setTimeout(() => {
                // Recalculate heights after a short delay
                const finalProjectCardsHeight = Array.from(projectCards.children)
                    .reduce((total, card) => total + card.offsetHeight, 0) +
                    (parseInt(getComputedStyle(projectCards).paddingTop) || 0) +
                    (parseInt(getComputedStyle(projectCards).paddingBottom) || 0) +
                    (parseInt(getComputedStyle(projectCards).gap) || 0) * (projectCards.children.length - 1);
                
                item.style.height = `${finalProjectCardsHeight}px`;
                content.style.height = `${finalProjectCardsHeight}px`;
            }, 100);
        }
    });
}

// Function to create HTML for a timeline item
function createTimelineItem(experience) {
    console.log('Creating timeline item for:', experience.title);
    const item = document.createElement('div');
    item.className = 'timeline-item';
    
    // Create content with all available information
    let content = `
        <div class="timeline-content">
            <h3>${experience.title}</h3>
            <h4>${experience.company}</h4>
            <div class="timeline-meta">
                <span class="timeline-date">${experience.duration}</span>
                <span class="timeline-location">${experience.location}</span>
            </div>
            <p>${experience.description}</p>
    `;

    // Add technologies if available
    if (experience.technologies && experience.technologies.length > 0) {
        content += `
            <div class="timeline-technologies">
                <strong>Technologies:</strong>
                <ul>
                    ${experience.technologies.map(tech => `<li>${tech}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    content += '</div>';
    item.innerHTML = content;

    // Create project cards if available
    if (experience.study_cases && experience.study_cases.length > 0) {
        const projectCards = document.createElement('div');
        projectCards.className = 'project-cards';
        
        experience.study_cases.forEach(case_ => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <h4>${case_.title}</h4>
                <p>${case_.description}</p>
                <div class="tech-stack">
                    ${case_.tech_stack.map(tech => `<span>${tech}</span>`).join('')}
                </div>
                <div class="goals">
                    <strong>Goals:</strong>
                    <ul>
                        ${case_.goals.map(goal => `<li>${goal}</li>`).join('')}
                    </ul>
                </div>
            `;
            projectCards.appendChild(projectCard);
        });

        // Add project cards to the timeline item
        item.appendChild(projectCards);
    }

    console.log('Timeline item created:', item.outerHTML);
    return item;
}

// Function to initialize the timeline
async function initTimeline() {
    console.log('Initializing timeline...');
    const timelineContainer = document.querySelector('.timeline');
    
    if (!timelineContainer) {
        console.error('Timeline container not found');
        return;
    }
    
    console.log('Timeline container found, loading data...');
    try {
        const experiences = await loadCVData();
        console.log(`Found ${experiences.length} experiences`);
        
        if (experiences.length === 0) {
            timelineContainer.innerHTML = '<p class="error">No experiences found</p>';
            return;
        }
        
        // Clear existing content
        timelineContainer.innerHTML = '';
        
        // Create and append timeline items with staggered animation
        experiences.forEach((experience, index) => {
            console.log(`Creating timeline item ${index + 1} of ${experiences.length}`);
            const item = createTimelineItem(experience);
            timelineContainer.appendChild(item);
            
            // Add staggered animation delay
            setTimeout(() => {
                item.classList.add('animate');
            }, index * 200); // 200ms delay between each item
        });
        
        // Initialize intersection observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        document.querySelectorAll('.timeline-item').forEach(item => {
            observer.observe(item);
        });
        
        // Adjust heights after all items are created
        adjustHeights();
        
        // Re-adjust heights on window resize
        window.addEventListener('resize', adjustHeights);
        
        console.log('Timeline initialization complete');
    } catch (error) {
        console.error('Error initializing timeline:', error);
        timelineContainer.innerHTML = `<p class="error">Error loading timeline: ${error.message}</p>`;
    }
}

// Theme and language management
let currentTheme = localStorage.getItem('theme') || 'light';
let currentLanguage = localStorage.getItem('language') || 'en';

// Function to update theme
function updateTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    currentTheme = theme;
}

// Function to update language
function updateLanguage(lang) {
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('language', lang);
    currentLanguage = lang;
    loadTranslations(lang);
}

// Function to load translations
async function loadTranslations(lang) {
    try {
        const response = await fetch(`/api/translations/${lang}`);
        const translations = await response.json();
        applyTranslations(translations);
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

// Function to apply translations
function applyTranslations(translations) {
    // Update navigation
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[key]) {
            element.textContent = translations[key];
        }
    });
}

// Initialize theme and language
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing theme and language...');
    
    // Set initial theme and language
    updateTheme(currentTheme);
    updateLanguage(currentLanguage);
    
    // Add event listeners for theme and language switchers
    const themeSwitcher = document.querySelector('.theme-switcher');
    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', () => {
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            updateTheme(newTheme);
        });
    }
    
    const languageSwitcher = document.querySelector('.language-switcher');
    if (languageSwitcher) {
        languageSwitcher.addEventListener('click', (e) => {
            if (e.target.classList.contains('lang-option')) {
                const newLang = e.target.getAttribute('data-lang');
                updateLanguage(newLang);
            }
        });
    }
    
    // Initialize timeline
    initTimeline();
}); 