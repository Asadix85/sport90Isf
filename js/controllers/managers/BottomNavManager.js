/**
 * BottomNavManager.js - مدیریت ناوبری پایین (موبایل)
 * نسخه بدون دکمه تم
 */
export class BottomNavManager {
    constructor() {
        this.nav = null;
        this.onNavigate = null;
    }

    init() {
        this.nav = document.getElementById('bottomNav');
        if (!this.nav) return;

        this._bindEvents();
        this._updateBadge();
    }

    _bindEvents() {
        this.nav.querySelectorAll('.nav-item').forEach((item) => {
            item.addEventListener('click', () => {
                const action = item.dataset.nav;
                this._setActive(item);
                this._handleAction(action);
            });
        });

        // آپدیت badge مقایسه
        eventBus.on(AppEvents.COMPARISON_CHANGED, () => {
            this._updateBadge();
        });
    }

    _setActive(item) {
        this.nav.querySelectorAll('.nav-item').forEach((i) => {
            i.classList.remove('active');
        });
        item.classList.add('active');
    }

    _handleAction(action) {
        switch (action) {
            case 'home':
                if (this.onNavigate) this.onNavigate('home');
                break;
            case 'search':
                const searchInput = document.getElementById('searchInput');
                if (searchInput) {
                    searchInput.focus();
                    searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                break;
            case 'compare':
                if (this.onNavigate) this.onNavigate('compare');
                break;
            case 'history':
                if (this.onNavigate) this.onNavigate('history');
                break;
            case 'info':
                if (this.onNavigate) this.onNavigate('info');
                break;
        }
    }

    _updateBadge() {
        const badge = document.getElementById('compareBadge');
        if (!badge) return;

        const count = window.comparisonService?.getCount() || 0;
        if (count > 0) {
            badge.style.display = 'block';
            badge.textContent = count;
        } else {
            badge.style.display = 'none';
        }
    }

    show() {
        if (this.nav) this.nav.classList.add('visible');
    }

    hide() {
        if (this.nav) this.nav.classList.remove('visible');
    }
}export { BottomNavManager };

export { BottomNavManager };
