/**
 * SearchManager.js - مدیریت جستجو و autocomplete
 * مسئولیت: search input, suggestions, results
 */
export class SearchManager {
    constructor(searchService, autocompleteService, uiManager) {
        this.searchService = searchService;
        this.autocompleteService = autocompleteService;
        this.ui = uiManager;

        this.elements = {};
        this.onProductFound = null; // callback when product found
        this.onSearchPerformed = null; // callback when search performed
    }

    init() {
        this.elements = {
            input: document.getElementById('searchInput'),
            button: document.getElementById('searchButton'),
            clear: document.getElementById('searchClear'),
            results: document.getElementById('searchResults'),
            container: document.getElementById('searchContainer'),
            suggestionList: document.getElementById('suggestionList'),
        };

        this._bindEvents();
    }

    _bindEvents() {
        const { input, button, clear } = this.elements;
        if (!input) return;

        const debouncedSuggest = debounce((value) => this._showSuggestions(value), 200);

        input.addEventListener('input', (e) => {
            const val = e.target.value;
            debouncedSuggest(val);
            if (clear) clear.style.display = val ? 'block' : 'none';
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.performSearch(input.value);
                this.hideSuggestions();
            }
            if (e.key === 'Escape') this.hideSuggestions();
        });

        input.addEventListener('focus', () => {
            if (!input.value.trim()) this._showSearchHistory();
        });

        document.addEventListener('click', (e) => {
            const box = document.querySelector('.search-box');
            if (box && !box.contains(e.target)) this.hideSuggestions();
        });

        if (button) {
            button.addEventListener('click', () => {
                this.performSearch(input.value);
                this.hideSuggestions();
            });
        }

        if (clear) {
            clear.addEventListener('click', () => {
                input.value = '';
                clear.style.display = 'none';
                this.hideSuggestions();
                if (this.onClear) this.onClear();
            });
        }
    }

    performSearch(query) {
        try {
            const trimmed = (query || '').trim();
            if (!trimmed) {
                if (this.onClear) this.onClear();
                return [];
            }

            this.autocompleteService.addToHistory(trimmed);
            const results = this.searchService.search(trimmed);

            if (this.onSearchPerformed) {
                this.onSearchPerformed(results, trimmed);
            }

            return results;
        } catch (error) {
            console.error('❌ [SearchManager.performSearch] خطا:', error);
            return [];
        }
    }

    _showSuggestions(query) {
        try {
            const list = this.elements.suggestionList;
            if (!list) return;

            const trimmed = (query || '').trim();
            if (!trimmed) {
                this._showSearchHistory();
                return;
            }

            const allProducts = window.dataService?.getAllProducts() || [];
            const suggestions = this.autocompleteService.getSuggestions(trimmed, allProducts);

            if (suggestions.length === 0) {
                list.innerHTML = `<li class="suggestion-empty">❌ محصولی یافت نشد</li>`;
                list.style.display = 'block';
                return;
            }

            list.innerHTML = suggestions
                .map((s) => `
          <li class="suggestion-item" data-code="${this.ui.escapeHtml(s.code)}">
            <div class="suggestion-name">${this._highlight(this.ui.escapeHtml(s.name), trimmed)}</div>
            <div class="suggestion-meta">
              <span>${this.ui.escapeHtml(s.brand?.label || '')}</span>
              <span class="suggestion-price">${this.ui.formatPrice(s.price)} ت</span>
            </div>
          </li>
        `)
                .join('');

            list.style.display = 'block';

            list.querySelectorAll('.suggestion-item').forEach((item) => {
                item.addEventListener('click', () => {
                    const code = item.dataset.code;
                    if (this.onProductFound) this.onProductFound(code);
                });
            });
        } catch (error) {
            console.error('❌ [SearchManager._showSuggestions] خطا:', error);
        }
    }

    _showSearchHistory() {
        try {
            const list = this.elements.suggestionList;
            if (!list) return;

            const history = this.autocompleteService.getHistory();
            if (history.length === 0) {
                list.style.display = 'none';
                return;
            }

            list.innerHTML = history
                .map((q) => `
          <li class="suggestion-item history-item" data-query="${this.ui.escapeHtml(q)}">
            <span>🕘</span>
            <span>${this.ui.escapeHtml(q)}</span>
            <button class="history-remove" data-remove="${this.ui.escapeHtml(q)}">✕</button>
          </li>
        `)
                .join('');

            list.style.display = 'block';

            list.querySelectorAll('.history-item').forEach((item) => {
                item.addEventListener('click', (e) => {
                    if (e.target.classList.contains('history-remove')) return;
                    const q = item.dataset.query;
                    if (this.elements.input) this.elements.input.value = q;
                    this.performSearch(q);
                    this.hideSuggestions();
                });
            });

            list.querySelectorAll('.history-remove').forEach((btn) => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.autocompleteService.removeFromHistory(btn.dataset.remove);
                    this._showSearchHistory();
                });
            });
        } catch (error) {
            console.error('❌ [SearchManager._showSearchHistory] خطا:', error);
        }
    }

    hideSuggestions() {
        if (this.elements.suggestionList) {
            this.elements.suggestionList.style.display = 'none';
        }
    }

    _highlight(text, query) {
        if (!query?.trim()) return text;
        const regex = new RegExp(`(${query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        return text.replace(regex, '<span style="background:#ffeb3b; padding:0 2px; border-radius:2px; font-weight:bold;">$1</span>');
    }

    clear() {
        if (this.elements.input) this.elements.input.value = '';
        if (this.elements.clear) this.elements.clear.style.display = 'none';
        this.hideSuggestions();
    }
}


// Removed duplicate export
