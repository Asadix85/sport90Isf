/**
 * ScrollManager.js - مدیریت اسکرول
 * مسئولیت: Scroll to Top button و Lazy Loading
 */
class ScrollManager {
    constructor() {
        this.scrollTopBtn = null;
        this.lazyImages = new Set();
        this.observer = null;
    }

    init() {
        this._createScrollTopButton();
        this._setupLazyLoading();
        this._bindEvents();
    }

    _createScrollTopButton() {
        const html = `
      <button id="scrollTopBtn" class="scroll-top-btn" aria-label="بازگشت به بالا">
        <span class="scroll-icon">↑</span>
      </button>
    `;
        document.body.insertAdjacentHTML('beforeend', html);
        this.scrollTopBtn = document.getElementById('scrollTopBtn');
    }

    _bindEvents() {
        // نمایش/مخفی کردن دکمه بر اساس اسکرول
        window.addEventListener('scroll', () => {
            if (!this.scrollTopBtn) return;
            if (window.scrollY > 300) {
                this.scrollTopBtn.classList.add('visible');
            } else {
                this.scrollTopBtn.classList.remove('visible');
            }
        }, { passive: true });

        // کلیک برای بازگشت به بالا
        if (this.scrollTopBtn) {
            this.scrollTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    _setupLazyLoading() {
        if (!('IntersectionObserver' in window)) return;

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        this.observer.unobserve(img);
                    }
                }
            });
        }, { rootMargin: '100px' });
    }

    /**
     * ثبت تصویر برای lazy loading
     */
    observeImage(img) {
        if (this.observer && img) {
            this.observer.observe(img);
        }
    }

    /**
     * اسکرول نرم به یک المان
     */
    scrollToElement(element, offset = 100) {
        if (!element) return;
        const top = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    }

    /**
     * اسکرول به بالای صفحه
     */
    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}