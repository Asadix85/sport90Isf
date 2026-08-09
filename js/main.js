/**
 * main.js - نقطه ورود برنامه (نسخه نهایی و قطعی)
 *
 * استفاده از window.onload به جای DOMContentLoaded
 * چون onload بعد از بارگذاری همه script ها اجرا می‌شود
 */

window.addEventListener('load', async function () {
    console.log('🚀 شروع برنامه Sport 90...');

    try {
        // ===== بررسی کلاس‌های مورد نیاز =====
        const required = {
            DataService: typeof window.DataService,
            ThemeManager: typeof window.ThemeManager,
            SearchService: typeof window.SearchService,
            FilterService: typeof window.FilterService,
            ComparisonService: typeof window.ComparisonService,
            HistoryService: typeof window.HistoryService,
            AutocompleteService: typeof window.AutocompleteService,
            ExportService: typeof window.ExportService,
            ShareService: typeof window.ShareService,
            AppController: typeof window.AppController,
            eventBus: typeof window.eventBus,
        };

        // نمایش وضعیت هر کلاس
        console.log('📋 وضعیت کلاس‌ها:');
        Object.entries(required).forEach(([name, type]) => {
            console.log(`  ${type === 'undefined' ? '❌' : '✅'} ${name}: ${type}`);
        });

        // بررسی کلاس‌های مفقود
        const missing = Object.entries(required)
            .filter(([_, type]) => type === 'undefined')
            .map(([name]) => name);

        if (missing.length > 0) {
            throw new Error(`کلاس‌های زیر تعریف نشده‌اند: ${missing.join(', ')}`);
        }

        // ===== ایجاد سرویس‌ها =====
        console.log('⚙️ ساخت سرویس‌ها...');
        const dataService = new window.DataService();
        const themeManager = new window.ThemeManager();
        const searchService = new window.SearchService(dataService);

        // سرویس‌های جدید (Singleton ها)
        const filterService = new window.FilterService();
        const comparisonService = window.ComparisonService.getInstance();
        const historyService = window.HistoryService.getInstance();
        const autocompleteService = new window.AutocompleteService();
        const exportService = new window.ExportService();
        const shareService = new window.ShareService();

        console.log('✅ همه سرویس‌ها ساخته شدند');

        // ===== ایجاد کنترلر اصلی =====
        const app = new window.AppController(
            dataService,
            themeManager,
            searchService,
            filterService,
            comparisonService,
            historyService,
            autocompleteService,
            exportService,
            shareService
        );

        // ===== دسترسی global برای debug در Console =====
        window.app = app;
        window.dataService = dataService;
        window.searchService = searchService;
        window.filterService = filterService;
        window.comparisonService = comparisonService;
        window.historyService = historyService;
        window.autocompleteService = autocompleteService;
        window.exportService = exportService;
        window.shareService = shareService;
        window.eventBus = window.eventBus;

        console.log('✅ برنامه با موفقیت اجرا شد!');
        console.log(`📦 تعداد محصولات: ${dataService.getAllProducts().length}`);
        console.log('');
        console.log('💡 دستورات تست در Console:');
        console.log('   filterService.setSortOption("price_asc")');
        console.log('   comparisonService.getComparison()');
        console.log('   historyService.getLastViewed(5)');
        console.log('   exportService.exportToCSV(dataService.getAllProducts())');

        window.loadingManager = app.loading;
        window.breadcrumb = app.breadcrumb;
        window.scrollManager = app.scrollManager;
        window.viewManager = app.viewManager;
        window.quickView = app.quickView;
        window.bottomNav = app.bottomNav;
    } catch (error) {
        console.error('❌ خطای بحرانی:', error.message);

        const container = document.getElementById('categoriesContainer');
        if (container) {
            container.innerHTML = `
        <div style="text-align:center; padding:40px; color:#e94560; background:#fce4e8; border-radius:12px;">
          <h3>❌ خطا در اجرای برنامه</h3>
          <p style="font-weight:bold;">${error.message}</p>
          <p style="font-size:14px; margin-top:15px;">لطفاً ترتیب <code>&lt;script&gt;</code> ها در index.html را بررسی کنید.</p>
          <button onclick="location.reload()" style="margin-top:15px; padding:10px 20px; background:#e94560; color:white; border:none; border-radius:6px; cursor:pointer;">🔄 تلاش مجدد</button>
        </div>
      `;
        }
    }
});
