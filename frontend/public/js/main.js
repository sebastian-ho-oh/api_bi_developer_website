document.addEventListener("DOMContentLoaded", () => {
    // Sprachumschaltung
    const languageOptions = document.querySelectorAll(".lang-option");
    const defaultLang = localStorage.getItem("language") || "en";
    loadLanguage(defaultLang);
  
    languageOptions.forEach(option => {
      option.addEventListener("click", () => {
        const selectedLang = option.getAttribute("data-lang");
        localStorage.setItem("language", selectedLang);
        loadLanguage(selectedLang);
      });
    });
  
    function loadLanguage(lang) {
      fetch(`./lang/${lang}.json`)
        .then(res => {
          if (!res.ok) {
            throw new Error(`Language file not found: ${lang}.json (Status: ${res.status})`);
          }
          return res.json();
        })
        .then(data => {
          document.querySelectorAll("[data-translate]").forEach(el => {
            const key = el.getAttribute("data-translate");
            if (data[key]) {
              el.innerText = data[key];
            }
          });
        })
        .catch(err => console.error("Error loading language file:", err));
    }
  
    // Theme-Umschaltung
    const themeToggle = document.querySelector(".theme-switcher");
    if (themeToggle) {
      const icon = themeToggle.querySelector("i");
      const savedTheme = localStorage.getItem("theme") || "light";
      setTheme(savedTheme);
  
      themeToggle.addEventListener("click", () => {
        const newTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        setTheme(newTheme);
      });
  
      function setTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
        if (icon) {
          icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
        }
      }
    } else {
      console.warn("Theme switcher element not found in DOM.");
    }
  });
  