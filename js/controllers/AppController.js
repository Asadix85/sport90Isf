/**
 * AppController.js - هماهنگ‌کننده اصلی (Facade Pattern)
 *
 * این کلاس فقط مدیرها را ایجاد و هماهنگ می‌کند.
 * هیچ منطق پیچیده‌ای ندارد.
 */
class AppController {
    constructor(
        dataService,
        themeManager,
        searchService,
        filterService,
        comparisonService,
        historyService,
        autocompleteService,
        exportService,
        shareService
    ) {
        // ذخیره سرویس‌ها
        this.dataService = dataService;
        this.themeManager = themeManager;
        this.searchService = searchService;
        this.filterService = filterService;
        this.comparisonService = comparisonService;
        this.historyService = historyService;
        this.autocompleteService = autocompleteService;
        this.exportService = exportService;
        this.shareService = shareService;

        // State
        this.allProducts = dataService.getAllProducts();
        this.visibleProducts = [];

        // ایجاد مدیرها (Managers)
        this.ui = new UIManager();
        this.navigation = new NavigationManager(this.ui);
        this.renderer = new ProductRenderer(this.ui, comparisonService, shareService);
        this.searchManager = new SearchManager(searchService, autocompleteService, this.ui);
        this.filterManager = new FilterManager(filterService, this.ui);
        this.comparisonManager = new ComparisonManager(comparisonService, this.ui);
        this.historyManager = new HistoryManager(historyService, this.ui);

        console.log('🔧 AppController ساخته شد');
        this._init();
    }

    _init() {
        try {
            // init مدیرها
            this.ui.init();
            this.searchManager.init();
            this.filterManager.init();
            this.comparisonManager.init();
            this.historyManager.init();

            // اتصال callbacks
            this._setupCallbacks();
            this._setupNavigation();
            this._setupExport();
            this._subscribeEvents();

            // نمایش صفحه اصلی
            this._renderMainPage();
            this.navigation.showPage('page-main');
            this._openFromUrl();
        } catch (error) {
            console.error('❌ [AppController._init] خطا:', error);
        }
    }

    _setupCallbacks() {
        // رندر
        this.renderer.onCategoryClick = (cat) => this._selectCategory(cat);
        this.renderer.onSubcategoryClick = (items) => this._selectSubcategory(items);
        this.renderer.onProductClick = (product) => this._showProductDetail(product);
        this.renderer.onToggleCompare = (product) => this._toggleCompare(product);
        this.renderer.onShare = (product) => this._shareProduct(product);

        // جستجو
        this.searchManager.onProductFound = (code) => {
            const product = this._findProduct(code);
            if (product) {
                this.searchManager.clear();
                this._showProductDetail(product);
            }
        };
        this.searchManager.onSearchPerformed = (results, query) => {
            this._renderSearchResults(results, query);
        };
        this.searchManager.onClear = () => {
            this.navigation.showPage('page-main');
        };

        // فیلتر
        this.filterManager.onFiltersApplied = () => {
            this._applyFilters();
        };

        // تاریخچه
        this.historyManager.onItemClick = (code) => {
            const product = this._findProduct(code);
            if (product) this._showProductDetail(product);
        };
    }

    _setupNavigation() {
        const backBtn = document.getElementById('backBtn');
        if (backBtn) {
            backBtn.addEventListener('click', () => this._goBack());
        }

        const goBackTop = document.getElementById('goBackTop');
        if (goBackTop) {
            goBackTop.addEventListener('click', () => this._goBack());
        }

        const goBackBottom = document.getElementById('goBackBottom');
        if (goBackBottom) {
            goBackBottom.addEventListener('click', () => this._goBack());
        }
    }

    _setupExport() {
        const exportCSV = document.getElementById('exportCSV');
        const exportJSON = document.getElementById('exportJSON');

        if (exportCSV) {
            exportCSV.addEventListener('click', () => {
                const source = this.visibleProducts.length > 0 ? this.visibleProducts : this.allProducts;
                const result = this.exportService.exportToCSV(source, 'sport90-products.csv');
                this.ui.showToast(result.message, result.success ? 'success' : 'error');
            });
        }

        if (exportJSON) {
            exportJSON.addEventListener('click', () => {
                const source = this.visibleProducts.length > 0 ? this.visibleProducts : this.allProducts;
                const result = this.exportService.exportToJSON(source, 'sport90-products.json');
                this.ui.showToast(result.message, result.success ? 'success' : 'error');
            });
        }
    }

    _subscribeEvents() {
        eventBus.on(AppEvents.COMPARISON_CHANGED, () => {
            this.comparisonManager.updateTray();
        });

        eventBus.on(AppEvents.HISTORY_CHANGED, () => {
            this.historyManager.render();
        });
    }

    // ===== Navigation Methods =====

    _renderMainPage() {
        const container = document.getElementById('categoriesContainer');
        const categories = this.dataService.getCategories() || [];
        this.renderer.renderCategories(categories, container);
    }

    _selectCategory(category) {
        this.navigation.currentCategory = category;
        if (!category?.products?.length) return;

        this.navigation.pushState('page-main');
        this.navigation.showPage('page-sub');
        this._renderSubcategories(category);
    }

    _renderSubcategories(category) {
        const container = document.getElementById('subcategoriesContainer');
        const title = document.getElementById('subCategoryTitle');
        this.renderer.renderSubcategories(category, container, title);
    }

    _selectSubcategory(products) {
        this.navigation.currentSubcategory = products;
        this.navigation.pushState('page-sub');
        this.navigation.showPage('page-products');

        this.visibleProducts = products;
        this.renderer.renderProducts(products, document.getElementById('productsContainer'));
    }

    _showProductDetail(product) {
        this.historyService.add(product);
        this.navigation.pushState('page-products');
        this.navigation.showPage('page-detail');

        const container = document.getElementById('productDetailContainer');
        this.renderer.renderProductDetail(product, container);
    }

    _toggleCompare(product) {
        const result = this.comparisonService.toggleProduct(product);
        this.ui.showToast(result.message, result.success ? 'success' : 'error');
    }

    async _shareProduct(product) {
        const result = await this.shareService.copyLink(product);
        this.ui.showToast(result.message, result.success ? 'success' : 'error');
    }

    _goBack() {
        const lastPage = this.navigation.goBack();
        if (!lastPage) return;

        if (lastPage === 'page-main') {
            this.navigation.showPage('page-main');
        } else if (lastPage === 'page-sub') {
            this.navigation.showPage('page-sub');
            if (this.navigation.currentCategory) {
                this._renderSubcategories(this.navigation.currentCategory);
            }
        } else if (lastPage === 'page-products') {
            this.navigation.showPage('page-products');
            if (this.navigation.currentSubcategory) {
                this.renderer.renderProducts(this.navigation.currentSubcategory, document.getElementById('productsContainer'));
            }
        }
    }

    // ===== Filter Methods =====

    _applyFilters() {
        const source = this.navigation.currentSubcategory || this.allProducts;
        this.visibleProducts = this.filterService.combine(source);
        this.renderer.renderProducts(this.visibleProducts, document.getElementById('productsContainer'));
        this.filterManager.updateResultCount(this.visibleProducts.length);
    }

    // ===== Search Methods =====

    _renderSearchResults(results, query) {
        document.querySelectorAll('.page').forEach((p) => {
            if (p.id !== 'page-search') p.classList.remove('active');
        });
        const searchPage = document.getElementById('page-search');
        if (searchPage) searchPage.classList.add('active');

        const backBtn = document.getElementById('backBtn');
        if (backBtn) backBtn.classList.remove('hidden');

        this.navigation.pushState('page-main');

        const container = document.getElementById('searchResults');
        if (!container) return;
        container.innerHTML = '';

        const title = document.createElement('div');
        title.style.cssText = 'padding: 15px 0; border-bottom: 2px solid var(--border-color); margin-bottom: 20px;';
        title.innerHTML = `
      <span style="font-size: 18px; font-weight: bold;">
        🔍 نتایج برای "${this.ui.escapeHtml(query)}" (${results.length} محصول)
      </span>
    `;
        container.appendChild(title);

        if (results.length === 0) {
            container.innerHTML += `
        <div style="text-align: center; padding: 60px 20px; color: var(--text-muted);">
          <div style="font-size: 64px;">🔍</div>
          <h3>محصولی پیدا نشد!</h3>
        </div>
      `;
            return;
        }

        const grid = document.createElement('div');
        grid.className = 'products-grid';
        container.appendChild(grid);
        this.renderer.renderProducts(results, grid);
    }

    // ===== Helpers =====

    _findProduct(code) {
        return this.allProducts.find((p) => p.code === code) || null;
    }

    _openFromUrl() {
        try {
            const params = new URLSearchParams(window.location.search);
            const code = params.get('product');
            if (!code) return;
            const product = this._findProduct(code);
            if (product) {
                setTimeout(() => this._showProductDetail(product), 100);
            }
        } catch (error) {
            console.error('❌ [AppController._openFromUrl] خطا:', error);
        }
    }
}