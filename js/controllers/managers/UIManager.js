/**
 * UIManager.js - مدیریت UI عمومی (toast, loading, etc.)
 * مسئولیت: نمایش پیام‌ها و مدیریت وضعیت UI
 */
class UIManager {
    constructor() {
        this.toastRoot = null;
    }

    init() {
        this.toastRoot = document.getElementById('toastRoot');
    }

    /**
     * نمایش پیام toast
     * @param {string} message
     * @param {'success'|'error'|'info'} type
     */
    showToast(message, type = 'success') {
        try {
            if (!this.toastRoot) {
                this.toastRoot = document.getElementById('toastRoot');
                if (!this.toastRoot) return console.log(`[${type}] ${message}`);
            }

            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            toast.textContent = message;
            this.toastRoot.appendChild(toast);

            setTimeout(() => {
                toast.style.opacity = '0';
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        } catch (error) {
            console.error('❌ [UIManager.showToast] خطا:', error);
        }
    }

    /**
     * escape HTML برای جلوگیری از XSS
     */
    escapeHtml(value) {
        if (typeof window.escapeHtml === 'function') {
            return window.escapeHtml(value);
        }
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    /**
     * فرمت قیمت به فارسی
     */
    formatPrice(price) {
        try {
            return new Intl.NumberFormat('en-US').format(Number(price) || 0);
        } catch {
            return String(price || 0);
        }
    }

    /**
     * دریافت مقدار امن از شیء
     */
    safeGet(obj, path, fallback = '') {
        try {
            return path.split('.').reduce((acc, key) => acc?.[key], obj) ?? fallback;
        } catch {
            return fallback;
        }
    }
}


if (typeof window !== 'undefined') { window.UIManager = UIManager; }
