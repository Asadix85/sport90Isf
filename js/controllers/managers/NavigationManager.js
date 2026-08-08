/**
 * NavigationManager.js - مدیریت navigation بین صفحات
 * مسئولیت: showPage, goBack, historyStack
 */
class NavigationManager {
    constructor(uiManager) {
        this.ui = uiManager;
        this.historyStack = [];
        this.currentCategory = null;
        this.currentSubcategory = null;
        this.onPageChange = null; // callback
    }

    /**
     * نمایش یک صفحه
     * @param {string} pageId
     */
    showPage(pageId) {
        try {
            document.querySelectorAll('.page').forEach((p) => p.classList.remove('active'));
            const page = document.getElementById(pageId);
            if (page) page.classList.add('active');

            this._updateBackButton(pageId);

            if (typeof this.onPageChange === 'function') {
                this.onPageChange(pageId);
            }
        } catch (error) {
            console.error('❌ [NavigationManager.showPage] خطا:', error);
        }
    }

    /**
     * به‌روزرسانی دکمه back
     * @private
     */
    _updateBackButton(pageId) {
        const backBtn = document.getElementById('backBtn');
        if (!backBtn) return;
        if (pageId === 'page-main') {
            backBtn.classList.add('hidden');
        } else {
            backBtn.classList.remove('hidden');
        }
    }

    /**
     * بازگشت به صفحه قبلی
     */
    goBack() {
        try {
            if (this.historyStack.length === 0) return null;
            return this.historyStack.pop();
        } catch (error) {
            console.error('❌ [NavigationManager.goBack] خطا:', error);
            return null;
        }
    }

    /**
     * push به history stack
     */
    pushState(state) {
        this.historyStack.push(state);
    }

    /**
     * آیا می‌توان بازگشت؟
     */
    canGoBack() {
        return this.historyStack.length > 0;
    }
}export { NavigationManager };
