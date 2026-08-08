/**
 * Service Worker برای PWA
 * Cache کردن فایل‌های استاتیک برای دسترسی آفلاین
 */

const CACHE_NAME = 'sport90-v1';
const DYNAMIC_CACHE = 'sport90-dynamic-v1';

// فایل‌هایی که باید cache شوند
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/main.js',
    '/js/enums/Enums.js',
    '/js/core/EventBus.js',
    '/js/utils/escapeHtml.js',
    '/js/utils/debounce.js',
    '/js/utils/ThemeManager.js',
    '/js/models/abstract/Product.js',
    '/js/services/DataService.js',
    '/js/services/SearchService.js',
    '/js/services/FilterService.js',
    '/js/services/ComparisonService.js',
    '/js/services/HistoryService.js',
    '/js/services/AutocompleteService.js',
    '/js/services/ExportService.js',
    '/js/services/ShareService.js',
    '/js/controllers/managers/UIManager.js',
    '/js/controllers/managers/NavigationManager.js',
    '/js/controllers/managers/ProductRenderer.js',
    '/js/controllers/managers/SearchManager.js',
    '/js/controllers/managers/FilterManager.js',
    '/js/controllers/managers/ComparisonManager.js',
    '/js/controllers/managers/HistoryManager.js',
    '/js/controllers/managers/LoadingManager.js',
    '/js/controllers/managers/BreadcrumbManager.js',
    '/js/controllers/managers/ScrollManager.js',
    '/js/controllers/managers/ViewManager.js',
    '/js/controllers/managers/QuickViewManager.js',
    '/js/controllers/AppController.js'
];

// نصب Service Worker
self.addEventListener('install', (event) => {
    console.log('📦 Service Worker: Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting();
});

// فعال‌سازی
self.addEventListener('activate', (event) => {
    console.log('✅ Service Worker: Activated');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME && name !== DYNAMIC_CACHE)
                    .map((name) => caches.delete(name))
            );
        })
    );
    self.clients.claim();
});

// Fetch - استراتژی Cache First
self.addEventListener('fetch', (event) => {
    const { request } = event;

    // فقط GET requests
    if (request.method !== 'GET') return;

    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
                // اگر در cache بود، برگردان و در پس‌زمینه به‌روز کن
                this._updateCache(request);
                return cachedResponse;
            }

            // اگر نبود، از سرور بگیر
            return fetch(request).then((networkResponse) => {
                // Cache کردن response جدید
                if (networkResponse && networkResponse.status === 200) {
                    const responseClone = networkResponse.clone();
                    caches.open(DYNAMIC_CACHE).then((cache) => {
                        cache.put(request, responseClone);
                    });
                }
                return networkResponse;
            }).catch(() => {
                // اگر آفلاین بود و cache هم نبود
                return new Response('آفلاین هستید', {
                    status: 503,
                    statusText: 'Offline',
                    headers: new Headers({ 'Content-Type': 'text/html; charset=utf-8' })
                });
            });
        })
    );
});

// به‌روزرسانی cache در پس‌زمینه
async function _updateCache(request) {
    try {
        const networkResponse = await fetch(request);
        if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(DYNAMIC_CACHE);
            await cache.put(request, networkResponse);
        }
    } catch (error) {
        // آفلاین - مشکلی نیست
    }
}