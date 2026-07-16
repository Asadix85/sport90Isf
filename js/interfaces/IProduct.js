/**
 * Interface IProduct
 * تمام محصولات باید این متدها رو پیاده‌سازی کنند
 */
class IProduct {
    // این کلاس به عنوان "اینترفیس" عمل میکنه
    // در جاوااسکریپت، اینترفیس وجود نداره، پس از این روش استفاده میکنیم
    
    getFormattedPrice() {
        throw new Error('❌ متد getFormattedPrice باید پیاده‌سازی بشه!');
    }
    
    getStockStatus() {
        throw new Error('❌ متد getStockStatus باید پیاده‌سازی بشه!');
    }
    
    getCategory() {
        throw new Error('❌ متد getCategory باید پیاده‌سازی بشه!');
    }
}