/**
 * ViewManager.js - مدیریت حالت نمایش
 * مسئولیت: Grid/List view toggle
 */
export class ViewManager {
    constructor() {
        this.currentView = this._getSavedView() || 'grid';
        this.toggleBtn = null;
    }

    init() {
        this._createToggleButton();
        this._applyView();
    }

    _getSavedView() {
        try {
            return localStorage.getItem('sport90_view_mode');
        } catch {
            return null;
        }
    }

    _saveView(view) {
        try {
            localStorage.setItem('sport90_view_mode', view);
        } catch (e) {}
    }

    _createToggleButton() {
        const productsTitle = document.getElementById('productsTitle');
        if (!productsTitle) return;

        const html = `
      <div class="view-toggle">
        <button class="view-btn ${this.currentView === 'grid' ? 'active' : ''}" data-view="grid" title="نمایش شبکه‌ای">
          <span>▦</span>
        </button>
        <button class="view-btn ${this.currentView === 'list' ? 'active' : ''}" data-view="list" title="نمایش لیستی">
          <span>☰</span>
        </button>
      </div>
    `;

        productsTitle.insertAdjacentHTML('afterend', html);

        // Event listeners
        document.querySelectorAll('.view-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                this.setView(btn.dataset.view);
            });
        });
    }

    setView(view) {
        if (view !== 'grid' && view !== 'list') return;

        this.currentView = view;
        this._saveView(view);
        this._applyView();

        // Update buttons
        document.querySelectorAll('.view-btn').forEach((btn) => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });
    }

    _applyView() {
        const container = document.getElementById('productsContainer');
        if (!container) return;

        container.classList.remove('grid-view', 'list-view');
        container.classList.add(`${this.currentView}-view`);
    }

    getView() {
        return this.currentView;
    }
}


export { ViewManager };
