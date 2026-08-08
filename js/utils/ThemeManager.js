/**
 * ThemeManager.js - مدیریت تم‌های رنگی (نسخه پیشرفته)
 * مسئولیت: Dark/Light mode + تم‌های رنگی
 */
export class ThemeManager {
    constructor() {
        this.themes = {
            fire: {
                name: 'آتشین',
                emoji: '🔥',
                primary: '#ff6b35',
                gradient: 'linear-gradient(135deg, #ff6b35 0%, #ff9e6d 100%)'
            },
            ocean: {
                name: 'اقیانوس',
                emoji: '🌊',
                primary: '#00b4d8',
                gradient: 'linear-gradient(135deg, #00b4d8 0%, #0077b6 100%)'
            },
            forest: {
                name: 'جنگل',
                emoji: '🌲',
                primary: '#2d6a4f',
                gradient: 'linear-gradient(135deg, #2d6a4f 0%, #40916c 100%)'
            },
            royal: {
                name: 'سلطنتی',
                emoji: '👑',
                primary: '#7209b7',
                gradient: 'linear-gradient(135deg, #7209b7 0%, #b5179e 100%)'
            },
            sunset: {
                name: 'غروب',
                emoji: '🌅',
                primary: '#ff006e',
                gradient: 'linear-gradient(135deg, #ff006e 0%, #ff758f 100%)'
            }
        };

        this.currentMode = this._getSavedMode() || 'light';
        this.currentTheme = this._getSavedTheme() || 'fire';
        this.toggleBtn = null;
        this.themePanel = null;

        this.init();
    }

    init() {
        this._applyMode();
        this._applyTheme();
        this._createThemePanel();
        this._bindEvents();
    }

    _getSavedMode() {
        try {
            return localStorage.getItem('sport90_theme_mode');
        } catch {
            return null;
        }
    }

    _getSavedTheme() {
        try {
            return localStorage.getItem('sport90_theme_color');
        } catch {
            return null;
        }
    }

    _saveMode(mode) {
        try {
            localStorage.setItem('sport90_theme_mode', mode);
        } catch (e) {}
    }

    _saveTheme(theme) {
        try {
            localStorage.setItem('sport90_theme_color', theme);
        } catch (e) {}
    }

    _applyMode() {
        document.documentElement.setAttribute('data-theme', this.currentMode);
        this._updateToggleButton();
    }

    _applyTheme() {
        const theme = this.themes[this.currentTheme];
        if (!theme) return;

        document.documentElement.style.setProperty('--primary', theme.primary);
        document.documentElement.style.setProperty('--gradient-primary', theme.gradient);
    }

    _createThemePanel() {
        const html = `
      <div id="themePanel" class="theme-panel">
        <div class="theme-panel-header">
          <h3>🎨 انتخاب تم</h3>
          <button id="closeThemePanel" class="theme-panel-close">✕</button>
        </div>
        <div class="theme-options">
          ${Object.entries(this.themes).map(([key, theme]) => `
            <button class="theme-option ${key === this.currentTheme ? 'active' : ''}" data-theme="${key}">
              <span class="theme-emoji">${theme.emoji}</span>
              <span class="theme-name">${theme.name}</span>
            </button>
          `).join('')}
        </div>
        <div class="theme-mode-toggle">
          <button class="mode-btn ${this.currentMode === 'light' ? 'active' : ''}" data-mode="light">
            ☀️ روشن
          </button>
          <button class="mode-btn ${this.currentMode === 'dark' ? 'active' : ''}" data-mode="dark">
            🌙 تاریک
          </button>
        </div>
      </div>
    `;
        document.body.insertAdjacentHTML('beforeend', html);
        this.themePanel = document.getElementById('themePanel');

        // Bind theme options
        this.themePanel.querySelectorAll('.theme-option').forEach((btn) => {
            btn.addEventListener('click', () => {
                this.setTheme(btn.dataset.theme);
            });
        });

        // Bind mode buttons
        this.themePanel.querySelectorAll('.mode-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                this.setMode(btn.dataset.mode);
            });
        });

        // Close button
        const closeBtn = document.getElementById('closeThemePanel');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closePanel());
        }
    }

    _bindEvents() {
        this.toggleBtn = document.getElementById('themeToggle');
        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', () => {
                this.openPanel();
            });
        }
    }

    toggleMode() {
        this.setMode(this.currentMode === 'light' ? 'dark' : 'light');
    }

    setMode(mode) {
        if (mode !== 'light' && mode !== 'dark') return;
        this.currentMode = mode;
        this._saveMode(mode);
        this._applyMode();
        this._updateModeButtons();
    }

    setTheme(themeKey) {
        if (!this.themes[themeKey]) return;
        this.currentTheme = themeKey;
        this._saveTheme(themeKey);
        this._applyTheme();
        this._updateThemeButtons();
        this._updateToggleButton();
    }

    _updateToggleButton() {
        const icon = document.getElementById('themeIcon');
        const label = document.getElementById('themeLabel');
        const currentThemeData = this.themes[this.currentTheme];
        if (icon) {
            icon.textContent = currentThemeData?.emoji || '🎨';
        }
        if (label) {
            label.textContent = currentThemeData?.name || 'تم‌ها';
        }
    }

    _updateModeButtons() {
        document.querySelectorAll('.mode-btn').forEach((btn) => {
            btn.classList.toggle('active', btn.dataset.mode === this.currentMode);
        });
        this._updateToggleButton();
    }

    _updateThemeButtons() {
        document.querySelectorAll('.theme-option').forEach((btn) => {
            btn.classList.toggle('active', btn.dataset.theme === this.currentTheme);
        });
    }

    openPanel() {
        if (this.themePanel) {
            this.themePanel.classList.add('visible');
        }
    }

    closePanel() {
        if (this.themePanel) {
            this.themePanel.classList.remove('visible');
        }
    }
}export { ThemeManager };
export { ThemeManager };
