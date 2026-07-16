/**
 * کلاس ThemeManager - مدیریت تم (دارک/روشن)
 * مسئولیت: تغییر و ذخیره‌سازی تم
 */
class ThemeManager {
    constructor() {
        this.theme = 'light';
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = document.getElementById('themeIcon');
        this.themeLabel = document.getElementById('themeLabel');
        
        this.loadTheme();
        this._attachEvents();
    }
    
    loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);
    }
    
    setTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        if (theme === 'dark') {
            this.themeIcon.textContent = '☀️';
            this.themeLabel.textContent = 'روشن';
        } else {
            this.themeIcon.textContent = '🌙';
            this.themeLabel.textContent = 'تاریک';
        }
    }
    
    toggle() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
    
    _attachEvents() {
        this.themeToggle.addEventListener('click', () => this.toggle());
    }
}