// Language selector functionality
document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('language-select');
    if (!languageSelect) {
        console.warn('Language selector not found');
        return;
    }

    // Get saved language preference or default to 'en'
    const savedLanguage = localStorage.getItem('language') || 'en';
    document.documentElement.lang = savedLanguage;
    languageSelect.value = savedLanguage;

    // Load initial translations
    loadTranslations(savedLanguage);

    // Add change event listener
    languageSelect.addEventListener('change', (e) => {
        const newLang = e.target.value;
        document.documentElement.lang = newLang;
        localStorage.setItem('language', newLang);
        loadTranslations(newLang);
    });
});

// Function to load translations
async function loadTranslations(lang) {
    try {
        const response = await fetch(`/lang/${lang}.json`);
        if (!response.ok) {
            throw new Error(`Failed to load translations for ${lang}`);
        }
        const translations = await response.json();
        applyTranslations(translations);
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

// Function to apply translations
function applyTranslations(translations) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[key];
            } else {
                element.textContent = translations[key];
            }
        } else {
            console.warn(`Translation missing for key: ${key}`);
        }
    });
} 