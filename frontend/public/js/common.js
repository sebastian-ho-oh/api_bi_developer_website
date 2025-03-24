// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const icon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
});

function updateIcon(theme) {
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Language Selector Functionality
const languageSelect = document.getElementById('language-select');
const savedLanguage = localStorage.getItem('language') || 'en';

languageSelect.value = savedLanguage;
document.documentElement.setAttribute('lang', savedLanguage);

languageSelect.addEventListener('change', (e) => {
    const newLang = e.target.value;
    document.documentElement.setAttribute('lang', newLang);
    localStorage.setItem('language', newLang);
    // Hier können Sie die Übersetzungen laden
    loadTranslations(newLang);
});

// Function to load translations
async function loadTranslations(lang) {
    try {
        const response = await fetch(`/lang/${lang}.json`);
        const translations = await response.json();
        // Hier können Sie die Übersetzungen auf die Seite anwenden
        applyTranslations(translations);
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

// Function to apply translations
function applyTranslations(translations) {
    // Implementieren Sie hier die Logik zum Anwenden der Übersetzungen
    // Beispiel:
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[key]) {
            element.textContent = translations[key];
        }
    });
} 