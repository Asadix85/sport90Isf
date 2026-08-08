/**
 * ShareService.js - سرویس اشتراک‌گذاری محصول
 *
 * مسئولیت:
 *   - کپی لینک محصول در clipboard
 *   - ساخت لینک‌های شبکه اجتماعی
 *   - deep link برای محصول (?product=CODE)
 */
class ShareService {
    /**
     * ساخت URL محصول
     * @param {Object} product
     * @returns {string}
     */
    buildProductUrl(product) {
        try {
            const code = encodeURIComponent(product.code || product.id || '');
            const url = new URL(window.location.href);
            url.search = '';
            url.searchParams.set('product', code);
            return url.toString();
        } catch (error) {
            console.error('❌ [ShareService.buildProductUrl] خطا:', error);
            return window.location.href;
        }
    }

    /**
     * کپی لینک در clipboard
     * @param {Object} product
     * @returns {Promise<{success: boolean, url: string, message: string}>}
     */
    async copyLink(product) {
        const url = this.buildProductUrl(product);
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(url);
                return { success: true, url, message: 'لینک کپی شد' };
            }
            // Fallback
            const ok = this._legacyCopy(url);
            return {
                success: ok,
                url,
                message: ok ? 'لینک کپی شد' : 'خطا در کپی',
            };
        } catch (error) {
            console.error('❌ [ShareService.copyLink] خطا:', error);
            return { success: false, url, message: 'خطا در کپی لینک' };
        }
    }

    /**
     * لینک‌های شبکه اجتماعی
     * @param {Object} product
     * @returns {Object}
     */
    getSocialLinks(product) {
        const url = encodeURIComponent(this.buildProductUrl(product));
        const text = encodeURIComponent(product.name || '');
        return {
            telegram: `https://t.me/share/url?url=${url}&text=${text}`,
            whatsapp: `https://wa.me/?text=${text}%20${url}`,
            twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
        };
    }

    /**
     * @private
     */
    _legacyCopy(text) {
        try {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            const ok = document.execCommand('copy');
            document.body.removeChild(ta);
            return ok;
        } catch {
            return false;
        }
    }
}export { ShareService };
