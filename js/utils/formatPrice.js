/**
 * formatPrice.js - فرمت کردن قیمت‌ها به صورت سه رقم سه رقم
 */

/**
 * فرمت کردن عدد به صورت سه رقم سه رقم
 * @param {number|string} price - قیمت
 * @returns {string} قیمت فرمت شده
 */
function formatPrice(price) {
    if (price === null || price === undefined || price === '') return 'نامشخص';

    const num = typeof price === 'string' ? parseFloat(price.replace(/,/g, '')) : price;

    if (isNaN(num)) return 'نامشخص';

    return num.toLocaleString('en-US');
}

/**
 * فرمت کردن قیمت با واحد تومان
 * @param {number|string} price - قیمت
 * @returns {string} قیمت با واحد
 */
function formatPriceWithUnit(price) {
    const formatted = formatPrice(price);
    if (formatted === 'نامشخص') return 'نامشخص';
    return `${formatted} تومان`;
}

/**
 * محاسبه تخفیف
 * @param {number} originalPrice - قیمت اصلی
 * @param {number} discountPercent - درصد تخفیف
 * @returns {Object} شامل قیمت اصلی، قیمت با تخفیف و مقدار صرفه‌جویی
 */
function calculateDiscount(originalPrice, discountPercent) {
    const original = typeof originalPrice === 'string'
        ? parseFloat(originalPrice.replace(/,/g, ''))
        : originalPrice;

    if (isNaN(original) || !discountPercent) {
        return {
            original: originalPrice,
            discounted: originalPrice,
            saving: 0,
            percent: 0
        };
    }

    const saving = Math.round(original * (discountPercent / 100));
    const discounted = original - saving;

    return {
        original: formatPriceWithUnit(original),
        discounted: formatPriceWithUnit(discounted),
        saving: formatPriceWithUnit(saving),
        percent: discountPercent
    };
}

// قرار دادن در window برای دسترسی سراسری
if (typeof window !== 'undefined') {
    window.formatPrice = formatPrice;
    window.formatPriceWithUnit = formatPriceWithUnit;
    window.calculateDiscount = calculateDiscount;
}
