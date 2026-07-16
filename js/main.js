/**
 * main.js - نقطه ورود برنامه با سرویس جستجو
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 شروع برنامه با enum و ارث‌بری...');
    
    try {
        // بررسی کلاس‌ها
        if (typeof DataService === 'undefined') {
            throw new Error('❌ DataService تعریف نشده!');
        }
        if (typeof ThemeManager === 'undefined') {
            throw new Error('❌ ThemeManager تعریف نشده!');
        }
        if (typeof AppController === 'undefined') {
            throw new Error('❌ AppController تعریف نشده!');
        }
        if (typeof SearchService === 'undefined') {
            throw new Error('❌ SearchService تعریف نشده!');
        }
        
        // ایجاد سرویس‌ها
        const dataService = new DataService();
        const themeManager = new ThemeManager();
        const searchService = new SearchService(dataService);  // ← جدید
        
        // ایجاد کنترلر با سرویس جستجو
        const app = new AppController(dataService, themeManager, searchService);  // ← اضافه شدن searchService
        
        // ذخیره در window برای دسترسی در Console
        window.app = app;
        window.dataService = dataService;
        window.searchService = searchService;
        
        console.log('✅ برنامه با موفقیت اجرا شد!');
        console.log(`📦 تعداد محصولات: ${dataService.getAllProducts().length}`);
        
        // تست جستجو در Console
        console.log('💡 برای تست جستجو در Console تایپ کنید:');
        console.log('  searchService.search("توپ")');
        console.log('  searchService.search("P123")');
        
    } catch (error) {
        console.error('❌ خطا:', error);
        // نمایش خطا در صفحه
        const container = document.getElementById('categoriesContainer');
        if (container) {
            container.innerHTML = `
                <div style="text-align:center; padding:40px; color:#e94560; background:#fce4e8; border-radius:12px;">
                    <h3>❌ خطا در اجرای برنامه</h3>
                    <p>${error.message}</p>
                    <p style="font-size:14px; margin-top:10px;">لطفاً کنسول (F12) را بررسی کنید</p>
                </div>
            `;
        }
    }
});