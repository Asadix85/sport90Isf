/**
 * ThemeManager.js - مدیریت تم‌های رنگی (نسخه لوکس/ورزشی)
 * مسئولیت: Dark/Light mode + تم‌های رنگی کامل (نه فقط رنگ اصلی)
 */
class ThemeManager {
    constructor() {
        this.themes = {
            fire: {
                name: 'آتشین',
                emoji: '🔥',
                primary: '#ff4d1c',
                primaryDark: '#d63a10',
                primaryLight: '#ff8a5c',
                gold: '#c9971f',
                goldLight: '#f0d585',
                gradient: 'linear-gradient(120deg, #ff4d1c 0%, #ff8a3d 55%, #ffb454 100%)',
                glow: 'rgba(255, 77, 28, 0.4)',
                accentGlow: 'rgba(201, 151, 31, 0.35)'
            },
            ocean: {
                name: 'اقیانوس',
                emoji: '🌊',
                primary: '#00b4d8',
                primaryDark: '#0077b6',
                primaryLight: '#48cae4',
                gold: '#90e0ef',
                goldLight: '#caf0f8',
                gradient: 'linear-gradient(120deg, #0077b6 0%, #00b4d8 55%, #90e0ef 100%)',
                glow: 'rgba(0, 180, 216, 0.42)',
                accentGlow: 'rgba(144, 224, 239, 0.35)'
            },
            forest: {
                name: 'جنگل',
                emoji: '🌲',
                primary: '#2d6a4f',
                primaryDark: '#1b4332',
                primaryLight: '#52b788',
                gold: '#c9a227',
                goldLight: '#e9d38a',
                gradient: 'linear-gradient(120deg, #1b4332 0%, #2d6a4f 55%, #52b788 100%)',
                glow: 'rgba(45, 106, 79, 0.4)',
                accentGlow: 'rgba(201, 162, 39, 0.3)'
            },
            royal: {
                name: 'سلطنتی',
                emoji: '👑',
                primary: '#7209b7',
                primaryDark: '#560a86',
                primaryLight: '#b5179e',
                gold: '#e8c25f',
                goldLight: '#f7dfa0',
                gradient: 'linear-gradient(120deg, #560a86 0%, #7209b7 55%, #b5179e 100%)',
                glow: 'rgba(114, 9, 183, 0.45)',
                accentGlow: 'rgba(232, 194, 95, 0.3)'
            },
            sunset: {
                name: 'غروب',
                emoji: '🌅',
                primary: '#ff006e',
                primaryDark: '#c40057',
                primaryLight: '#ff758f',
                gold: '#ffb703',
                goldLight: '#ffd166',
                gradient: 'linear-gradient(120deg, #c40057 0%, #ff006e 55%, #ff758f 100%)',
                glow: 'rgba(255, 0, 110, 0.42)',
                accentGlow: 'rgba(255, 183, 3, 0.32)'
            },
            luxe: {
                name: 'طلای لوکس',
                emoji: '💎',
                primary: '#c9a227',
                primaryDark: '#8f7115',
                primaryLight: '#e8c25f',
                gold: '#ffd700',
                goldLight: '#fff2b8',
                gradient: 'linear-gradient(120deg, #8f7115 0%, #c9a227 45%, #ffd700 100%)',
                glow: 'rgba(255, 215, 0, 0.45)',
                accentGlow: 'rgba(255, 215, 0, 0.35)',
                forceDark: true
            },
            neon: {
                name: 'نئون الکتریک',
                emoji: '⚡',
                primary: '#00f0ff',
                primaryDark: '#00b8c4',
                primaryLight: '#7dfdff',
                gold: '#ff00e5',
                goldLight: '#ff8ef0',
                gradient: 'linear-gradient(120deg, #00f0ff 0%, #7dfdff 45%, #ff00e5 100%)',
                glow: 'rgba(0, 240, 255, 0.55)',
                accentGlow: 'rgba(255, 0, 229, 0.4)',
                forceDark: true
            },
            carbon: {
                name: 'کربن مسابقه‌ای',
                emoji: '🏁',
                primary: '#e10600',
                primaryDark: '#a10400',
                primaryLight: '#ff4136',
                gold: '#c0c0c0',
                goldLight: '#eaeaea',
                gradient: 'linear-gradient(120deg, #a10400 0%, #e10600 55%, #ff4136 100%)',
                glow: 'rgba(225, 6, 0, 0.5)',
                accentGlow: 'rgba(192, 192, 192, 0.3)',
                forceDark: true
            },
            emerald: {
                name: 'زمرد',
                emoji: '💚',
                primary: '#00a86b',
                primaryDark: '#046307',
                primaryLight: '#3ddc97',
                gold: '#d4af37',
                goldLight: '#f0d98c',
                gradient: 'linear-gradient(120deg, #046307 0%, #00a86b 55%, #3ddc97 100%)',
                glow: 'rgba(0, 168, 107, 0.42)',
                accentGlow: 'rgba(212, 175, 55, 0.35)'
            },
            platinum: {
                name: 'پلاتینیوم',
                emoji: '🥈',
                primary: '#8a94a3',
                primaryDark: '#5c6470',
                primaryLight: '#c3cad4',
                gold: '#e4e8ee',
                goldLight: '#ffffff',
                gradient: 'linear-gradient(120deg, #5c6470 0%, #8a94a3 50%, #c3cad4 100%)',
                glow: 'rgba(138, 148, 163, 0.4)',
                accentGlow: 'rgba(228, 232, 238, 0.4)',
                forceDark: true
            },
            cosmos: {
                name: 'کهکشان',
                emoji: '🌌',
                primary: '#5b3df0',
                primaryDark: '#3a1f9e',
                primaryLight: '#9c8bff',
                gold: '#00e0c6',
                goldLight: '#8ffff0',
                gradient: 'linear-gradient(120deg, #3a1f9e 0%, #5b3df0 55%, #9c8bff 100%)',
                glow: 'rgba(91, 61, 240, 0.5)',
                accentGlow: 'rgba(0, 224, 198, 0.35)',
                forceDark: true
            },
            copper: {
                name: 'مسی صنعتی',
                emoji: '🔶',
                primary: '#b5622f',
                primaryDark: '#7a3e1a',
                primaryLight: '#e08a4f',
                gold: '#d9a441',
                goldLight: '#f0cd85',
                gradient: 'linear-gradient(120deg, #7a3e1a 0%, #b5622f 55%, #e08a4f 100%)',
                glow: 'rgba(181, 98, 47, 0.4)',
                accentGlow: 'rgba(217, 164, 65, 0.32)'
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
        const theme = this.themes[this.currentTheme];
        // بعضی تم‌های خفن (نئون/کربن/طلا) همیشه روی حالت تاریک بهتر دیده می‌شن
        const effectiveMode = theme && theme.forceDark ? 'dark' : this.currentMode;
        document.documentElement.setAttribute('data-theme', effectiveMode);
        this._updateToggleButton();
    }

    _applyTheme() {
        const theme = this.themes[this.currentTheme];
        if (!theme) return;

        const root = document.documentElement.style;
        root.setProperty('--primary', theme.primary);
        root.setProperty('--primary-dark', theme.primaryDark);
        root.setProperty('--primary-light', theme.primaryLight);
        root.setProperty('--accent', theme.gold);
        root.setProperty('--gold', theme.gold);
        root.setProperty('--gold-light', theme.goldLight);
        root.setProperty('--gradient-primary', theme.gradient);
        root.setProperty('--gradient-accent', `linear-gradient(120deg, ${theme.gold} 0%, ${theme.goldLight} 50%, ${theme.gold} 100%)`);
        root.setProperty('--gradient-gold', `linear-gradient(120deg, ${theme.primaryDark} 0%, ${theme.goldLight} 50%, ${theme.primaryDark} 100%)`);
        root.setProperty('--shadow-glow', `0 0 34px ${theme.glow}`);
        root.setProperty('--shadow-accent', `0 0 24px ${theme.accentGlow}`);

        document.body.classList.toggle('theme-force-dark', !!theme.forceDark);
        this._applyMode();
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
            <button class="theme-option ${key === this.currentTheme ? 'active' : ''}" data-theme="${key}" style="--swatch-a:${theme.primary}; --swatch-b:${theme.gold};">
              <span class="theme-swatch"><span class="theme-emoji">${theme.emoji}</span></span>
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
}

if (typeof window !== 'undefined') { window.ThemeManager = ThemeManager; }

