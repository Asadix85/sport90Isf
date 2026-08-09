/**
 * LoadingManager.js - مدیریت صفحه لودینگ و Skeleton
 * مسئولیت: نمایش loading state
 */
class LoadingManager {
    constructor() {
        this.loadingScreen = null;
        this.isLoading = false;
    }

    init() {
        this._createLoadingScreen();
        this._hideAfterLoad();
    }

    _createLoadingScreen() {
        const html = `
      <div id="loadingScreen" class="loading-screen">
        <div class="loader-container">
          <div class="loader-ball">⚽</div>
          <div class="loader-text">اسپرت ۹۰</div>
          <div class="loader-progress">
            <div class="loader-bar"></div>
          </div>
          <p class="loader-status">در حال بارگذاری محصولات...</p>
        </div>
      </div>
    `;
        document.body.insertAdjacentHTML('afterbegin', html);
        this.loadingScreen = document.getElementById('loadingScreen');
    }

    _hideAfterLoad() {
        window.addEventListener('load', () => {
            setTimeout(() => this.hide(), 800);
        });

        // Fallback: اگر بعد از 5 ثانیه هنوز لود نشده
        setTimeout(() => this.hide(), 5000);
    }

    show(message = 'در حال بارگذاری...') {
        if (!this.loadingScreen) return;
        this.isLoading = true;
        this.loadingScreen.classList.add('visible');
        const status = this.loadingScreen.querySelector('.loader-status');
        if (status) status.textContent = message;
    }

    hide() {
        if (!this.loadingScreen) return;
        this.isLoading = false;
        this.loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            this.loadingScreen.classList.remove('visible', 'fade-out');
        }, 500);
    }

    /**
     * نمایش Skeleton برای یک container
     */
    showSkeleton(container, count = 8) {
        if (!container) return;
        const skeletonHtml = Array(count).fill(0).map(() => `
      <div class="skeleton-card">
        <div class="skeleton-image skeleton"></div>
        <div class="skeleton-text skeleton" style="width: 80%"></div>
        <div class="skeleton-text skeleton" style="width: 60%"></div>
        <div class="skeleton-price skeleton" style="width: 40%"></div>
      </div>
    `).join('');
        container.innerHTML = skeletonHtml;
    }

    hideSkeleton(container) {
        if (container) container.innerHTML = '';
    }
}


if (typeof window !== 'undefined') { window.LoadingManager = LoadingManager; }
