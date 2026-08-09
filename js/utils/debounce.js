/**
 * debounce.js - جلوگیری از فراخوانی مکرر
 * برای search و filter real-time
 * @param {Function} func
 * @param {number} [wait=300]
 * @returns {Function}
 */
function debounce(func, wait = 300) {
    let timeout = null;
    return function debounced(...args) {
        const context = this;
        if (timeout !== null) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            func.apply(context, args);
            timeout = null;
        }, wait);
    };
}

/**
 * throttle - محدود کردن تعداد فراخوانی
 * @param {Function} func
 * @param {number} [limit=250]
 * @returns {Function}
 */
function throttle(func, limit = 250) {
    let waiting = false;
    return function throttled(...args) {
        if (!waiting) {
            func.apply(this, args);
            waiting = true;
            setTimeout(() => { waiting = false; }, limit);
        }
    };
}

// Export for module usage
if (typeof window !== 'undefined') {
    window.debounce = debounce;
    window.throttle = throttle;
}
