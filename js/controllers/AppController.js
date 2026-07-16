/**
 * AppController - کنترلر اصلی برنامه
 */
class AppController {
    constructor(dataService, themeManager, searchService) {
        this.dataService = dataService;
        this.themeManager = themeManager;
        this.searchService = searchService;  // ← جدید
        
        this.historyStack = [];
        this.currentCategory = null;
        this.currentSubcategory = null;
        
        console.log('🔧 AppController ساخته شد');
        this._initUI();
        this._initSearch();  // ← جدید: مقداردهی جستجو
    }    
    _initUI() {
        // تست دیتا
        const products = this.dataService.getAllProducts();
        console.log('📦 تعداد محصولات:', products ? products.length : 0);
        
        const categories = this.dataService.getCategories();
        console.log('📂 تعداد دسته‌بندی‌ها:', categories ? categories.length : 0);
        
        this.renderMainPage();
        this.showPage('page-main');
        
        const backBtn = document.getElementById('backBtn');
        if (backBtn) {
            backBtn.addEventListener('click', () => this.goBack());
        }
    }
    
    showPage(pageId) {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        const page = document.getElementById(pageId);
        if (page) {
            page.classList.add('active');
        }
        
        const backBtn = document.getElementById('backBtn');
        if (backBtn) {
            if (pageId === 'page-main') {
                backBtn.classList.add('hidden');
            } else {
                backBtn.classList.remove('hidden');
            }
        }
    }
    
    goBack() {
        if (this.historyStack.length === 0) return;
        const lastPage = this.historyStack.pop();
        
        if (lastPage === 'page-main') {
            this.showPage('page-main');
        } else if (lastPage === 'page-sub') {
            this.showPage('page-sub');
            if (this.currentCategory) {
                this.renderSubcategories(this.currentCategory);
            }
        } else if (lastPage === 'page-products') {
            this.showPage('page-products');
            if (this.currentSubcategory) {
                this.renderProducts(this.currentSubcategory);
            }
        } else if (lastPage === 'page-detail') {
            this.showPage('page-products');
            if (this.currentSubcategory) {
                this.renderProducts(this.currentSubcategory);
            }
        }
    }
    
    renderMainPage() {
        const container = document.getElementById('categoriesContainer');
        if (!container) {
            console.error('❌ categoriesContainer پیدا نشد!');
            return;
        }
        
        container.innerHTML = '';
        
        // گرفتن دسته‌بندی‌ها با چک ایمنی
        const categories = this.dataService.getCategories() || [];
        console.log('📋 رندر دسته‌بندی‌ها:', categories.length);
        
        if (categories.length === 0) {
            container.innerHTML = `
                <div style="text-align:center; padding:40px; color:var(--text-muted);">
                    <p>⚠️ هیچ دسته‌بندی‌ای وجود ندارد</p>
                    <p style="font-size:14px;">لطفاً به DataService محصول اضافه کنید</p>
                </div>
            `;
            return;
        }
        
        categories.forEach(cat => {
            const card = document.createElement('div');
            card.className = 'category-card';
            card.innerHTML = `
                <span class="emoji">${cat.emoji || '📂'}</span>
                <div class="name">${cat.name || 'بدون نام'}</div>
                <div class="count">${cat.products ? cat.products.length : 0} محصول</div>
            `;
            card.addEventListener('click', () => this.selectCategory(cat));
            container.appendChild(card);
        });
    }
    
    selectCategory(category) {
        this.currentCategory = category;
        if (!category || !category.products || category.products.length === 0) {
            console.warn('⚠️ این دسته‌بندی محصولی ندارد');
            return;
        }
        
        this.historyStack.push('page-main');
        this.showPage('page-sub');
        this.renderSubcategories(category);
    }
    
    renderSubcategories(category) {
        const title = document.getElementById('subCategoryTitle');
        if (title) {
            title.innerHTML = `
                <span class="emoji">${category.emoji || '📂'}</span>
                ${category.name || 'دسته‌بندی'} - زیردسته‌ها
            `;
        }
        
        const container = document.getElementById('subcategoriesContainer');
        if (!container) return;
        
        container.innerHTML = '';
        
        // برای سادگی، محصولات رو به عنوان زیردسته نشون می‌دیم
        const products = category.products || [];
        
        if (products.length === 0) {
            container.innerHTML = `
                <div style="text-align:center; padding:30px; color:var(--text-muted);">
                    ⚠️ این دسته‌بندی محصولی ندارد
                </div>
            `;
            return;
        }
        
        // گروه‌بندی محصولات بر اساس نوع (مثلاً برای توپ‌ها)
        const groups = {};
        products.forEach(product => {
            const key = product.constructor.name || 'سایر';
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(product);
        });
        
        Object.keys(groups).forEach(groupName => {
            const card = document.createElement('div');
            card.className = 'subcategory-card';
            const items = groups[groupName];
            card.innerHTML = `
                <span class="emoji">📦</span>
                <div class="name">${groupName}</div>
                <div class="count">${items.length} محصول</div>
            `;
            card.addEventListener('click', () => this.selectSubcategory(items));
            container.appendChild(card);
        });
    }
    
    selectSubcategory(products) {
        this.currentSubcategory = products;
        this.historyStack.push('page-sub');
        this.showPage('page-products');
        this.renderProducts(products);
    }
    
    renderProducts(products) {
        const title = document.getElementById('productsTitle');
        if (title) {
            title.innerHTML = `
                <span class="emoji">📦</span>
                لیست محصولات
            `;
        }
        
        const container = document.getElementById('productsContainer');
        if (!container) return;
        
        container.innerHTML = '';
        
        if (!products || products.length === 0) {
            container.innerHTML = `
                <div style="text-align:center; padding:30px; color:var(--text-muted);">
                    ⚠️ هیچ محصولی وجود ندارد
                </div>
            `;
            return;
        }
        
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            
            let imageHtml = product.hasImage && product.hasImage() 
                ? `<img class="product-image" src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.style.display='none'">`
                : `<div class="product-image-placeholder">📷</div>`;
            
            const price = product.getFormattedPrice ? product.getFormattedPrice() : 
                         new Intl.NumberFormat('fa-IR').format(product.price || 0);
            
            const stockStatus = product.getStockStatus ? product.getStockStatus() : 
                               (product.stockStatus ? product.stockStatus.label || 'نامشخص' : 'نامشخص');
            
            const stockClass = product.getStockClass ? product.getStockClass() : 'available';
            const stockEmoji = product.getStockEmoji ? product.getStockEmoji() : '✅';
            
            card.innerHTML = `
                ${imageHtml}
                <div class="product-name">${product.name || 'بدون نام'}</div>
                <div class="product-price">${price} تومان</div>
                <span class="product-stock ${stockClass}">${stockEmoji} ${stockStatus}</span>
            `;
            card.addEventListener('click', () => this.showProductDetail(product));
            container.appendChild(card);
        });
    }
    
    showProductDetail(product) {
        this.historyStack.push('page-products');
        this.showPage('page-detail');
        
        const container = document.getElementById('productDetailContainer');
        if (!container) return;
        
        const price = product.getFormattedPrice ? product.getFormattedPrice() : 
                     new Intl.NumberFormat('fa-IR').format(product.price || 0);
        
        container.innerHTML = `
            <div class="detail-header">
                <div class="detail-info-right">
                    <div class="detail-name">${product.name || 'بدون نام'}</div>
                    <div class="detail-price">${price} تومان</div>
                    <div class="detail-meta">
                        <span class="meta-item"><strong>برند:</strong> ${product.brand ? product.brand.label || product.brand : 'نامشخص'}</span>
                        <span class="meta-item"><strong>کد:</strong> ${product.code || 'نامشخص'}</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-description">
                <strong>📝 توضیحات:</strong><br>
                ${product.description || 'توضیحی برای این محصول ثبت نشده است.'}
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
                <a href="https://eitaa.com/sport_90_isfahan" target="_blank" class="order-btn">
                    🛒 ثبت سفارش
                </a>
            </div>
        `;
    }
    /**
 * AppController - کنترلر اصلی برنامه
 * (بخش‌های قبلی را نگه دارید و این بخش‌ها را اضافه کنید)
 */

// ================================================================
//  بخش جدید: جستجو
// ================================================================

/**
 * مقداردهی اولیه جستجو
 */
_initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchClear = document.getElementById('searchClear');
    const searchResults = document.getElementById('searchResults');
    const searchSuggestions = document.getElementById('searchSuggestions');

    if (searchInput) {
        // جستجو با تایپ کردن (با تاخیر)
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this._performSearch(e.target.value);
            }, 300);
        });

        // جستجو با دکمه Enter
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this._performSearch(searchInput.value);
            }
        });

        // دکمه پاک کردن جستجو
        if (searchClear) {
            searchClear.addEventListener('click', () => {
                searchInput.value = '';
                this._clearSearch();
            });
        }
    }

    if (searchButton) {
        searchButton.addEventListener('click', () => {
            this._performSearch(searchInput.value);
        });
    }
}

/**
 * اجرای جستجو
 */
_performSearch(query) {
    const searchResults = document.getElementById('searchResults');
    const searchContainer = document.getElementById('searchContainer');
    
    if (!query || query.trim() === '') {
        this._clearSearch();
        return;
    }

    // جستجو در سرویس
    const results = this.searchService.search(query);
    
    // نمایش نتایج
    this._renderSearchResults(results, query);
    
    // نمایش بخش نتایج
    if (searchContainer) {
        searchContainer.style.display = 'block';
    }
    
    // مخفی کردن صفحات دیگر
    document.querySelectorAll('.page').forEach(p => {
        if (p.id !== 'page-search') {
            p.classList.remove('active');
        }
    });
    const searchPage = document.getElementById('page-search');
    if (searchPage) {
        searchPage.classList.add('active');
    }
    
    // نمایش دکمه بازگشت
    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
        backBtn.classList.remove('hidden');
    }
}

/**
 * رندر نتایج جستجو
 */
_renderSearchResults(results, query) {
    const container = document.getElementById('searchResults');
    if (!container) return;

    container.innerHTML = '';

    // عنوان نتایج
    const title = document.createElement('div');
    title.style.cssText = `
        padding: 15px 0;
        border-bottom: 2px solid var(--border-color);
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
    `;
    title.innerHTML = `
        <span style="font-size: 18px; font-weight: bold; color: var(--text-secondary);">
            🔍 نتایج جستجو برای "<span style="color: var(--primary-color);">${query}</span>"
        </span>
        <span style="font-size: 14px; color: var(--text-muted);">
            ${results.length} محصول پیدا شد
        </span>
    `;
    container.appendChild(title);

    if (results.length === 0) {
        container.innerHTML += `
            <div style="text-align: center; padding: 60px 20px; color: var(--text-muted);">
                <div style="font-size: 64px; margin-bottom: 20px;">🔍</div>
                <h3 style="font-size: 20px; color: var(--text-secondary);">محصولی پیدا نشد!</h3>
                <p style="margin-top: 10px;">عبارت "<strong>${query}</strong>" در هیچ محصولی یافت نشد.</p>
                <p style="font-size: 14px; margin-top: 5px;">پیشنهاد: از کلمات کلیدی کوتاه‌تر استفاده کنید.</p>
            </div>
        `;
        return;
    }

    // نمایش نتایج به صورت گرید
    const grid = document.createElement('div');
    grid.className = 'products-grid';
    grid.style.cssText = `
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 20px;
        margin-top: 10px;
    `;

    results.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        // هایلایت کردن کلمه جستجو شده در اسم
        const highlightedName = this._highlightText(product.name, query);
        
        let imageHtml = product.hasImage && product.hasImage() 
            ? `<img class="product-image" src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.style.display='none'">`
            : `<div class="product-image-placeholder">📷</div>`;

        const price = product.getFormattedPrice ? product.getFormattedPrice() : 
                     new Intl.NumberFormat('fa-IR').format(product.price || 0);
        
        const stockStatus = product.getStockStatus ? product.getStockStatus() : 
                           (product.stockStatus ? product.stockStatus.label || 'نامشخص' : 'نامشخص');
        const stockClass = product.getStockClass ? product.getStockClass() : 'available';
        const stockEmoji = product.getStockEmoji ? product.getStockEmoji() : '✅';

        card.innerHTML = `
            ${imageHtml}
            <div class="product-name">${highlightedName}</div>
            <div class="product-price">${price} تومان</div>
            <span class="product-stock ${stockClass}">${stockEmoji} ${stockStatus}</span>
            <div class="product-code" style="font-size: 12px; color: var(--text-muted); margin-top: 5px;">
                کد: ${product.code || 'نامشخص'}
            </div>
        `;
        card.addEventListener('click', () => this.showProductDetail(product));
        grid.appendChild(card);
    });

    container.appendChild(grid);
}

/**
 * هایلایت کردن متن جستجو شده
 */
_highlightText(text, query) {
    if (!query || query.trim() === '') return text;
    
    const normalizedQuery = query.trim().toLowerCase();
    const index = text.toLowerCase().indexOf(normalizedQuery);
    
    if (index === -1) return text;
    
    const before = text.substring(0, index);
    const matched = text.substring(index, index + normalizedQuery.length);
    const after = text.substring(index + normalizedQuery.length);
    
    return `${before}<span style="background-color: #ffeb3b; padding: 0 2px; border-radius: 2px; font-weight: bold;">${matched}</span>${after}`;
}

/**
 * پاک کردن نتایج جستجو
 */
_clearSearch() {
    const searchContainer = document.getElementById('searchContainer');
    const searchInput = document.getElementById('searchInput');
    
    if (searchContainer) {
        searchContainer.style.display = 'none';
    }
    
    if (searchInput) {
        searchInput.value = '';
    }
    
    // برگشت به صفحه اصلی
    this.showPage('page-main');
    
    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
        backBtn.classList.add('hidden');
    }
}

/**
 * جستجوی پیشرفته (با فیلتر)
 */
_searchAdvanced(query, filters) {
    const results = this.searchService.searchAdvanced(query, filters);
    this._renderSearchResults(results, query);
    return results;
}
}