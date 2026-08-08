/**
 * EventBus.js - سیستم انتشار رویداد
 * الگوی Observer Pattern برای ارتباط غیرمستقیم بین سرویس‌ها
 *
 * مسئولیت:
 *   - ثبت listener برای رویدادها
 *   - انتشار رویدادها به همه listeners
 *   - جلوگیری از شکست یک listener روی بقیه
 *
 * الگو: Observer + Singleton
 */
class EventBus {
    /**
     * @constructor
     */
    constructor() {
        if (EventBus._instance) {
            return EventBus._instance;
        }
        /** @type {Object<string, Array<Function>>} */
        this.events = new Map();
        EventBus._instance = this;
    }

    /**
     * دریافت نمونه Singleton
     * @returns {EventBus}
     */
    static getInstance() {
        if (!EventBus._instance) {
            EventBus._instance = new EventBus();
        }
        return EventBus._instance;
    }

    /**
     * ثبت listener برای یک رویداد
     * @param {string} eventName - نام رویداد
     * @param {Function} callback - تابع callback
     * @returns {Function} - تابع unsubscribe
     * @throws {TypeError} اگر callback تابع نباشد
     */
    on(eventName, callback) {
        try {
            if (typeof callback !== 'function') {
                throw new TypeError('callback باید یک تابع باشد');
            }
            if (!this.events.has(eventName)) {
                this.events.set(eventName, []);
            }
            this.events.get(eventName).push(callback);

            // برگرداندن تابع unsubscribe
            return () => this.off(eventName, callback);
        } catch (error) {
            console.error('❌ [EventBus.on] خطا:', error);
            return () => {};
        }
    }

    /**
     * حذف listener از یک رویداد
     * @param {string} eventName
     * @param {Function} callback
     */
    off(eventName, callback) {
        try {
            if (!this.events.has(eventName)) return;
            const listeners = this.events.get(eventName);
            const index = listeners.indexOf(callback);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        } catch (error) {
            console.error('❌ [EventBus.off] خطا:', error);
        }
    }

    /**
     * انتشار رویداد به همه listeners
     * هر listener در try/catch جداگانه اجرا می‌شود
     * @param {string} eventName
     * @param {*} data
     */
    emit(eventName, data) {
        try {
            if (!this.events.has(eventName)) return;
            const listeners = this.events.get(eventName);
            listeners.forEach((callback, index) => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`❌ [EventBus] خطا در listener #${index} برای "${eventName}":`, error);
                }
            });
        } catch (error) {
            console.error('❌ [EventBus.emit] خطا:', error);
        }
    }

    /**
     * پاک کردن همه listeners یک رویداد
     * @param {string} [eventName] - اگر داده نشود همه پاک می‌شوند
     */
    clear(eventName) {
        try {
            if (eventName) {
                this.events.delete(eventName);
            } else {
                this.events.clear();
            }
        } catch (error) {
            console.error('❌ [EventBus.clear] خطا:', error);
        }
    }
}

// ساخت نمونه singleton
const eventBus = new EventBus();export { EventBus, eventBus };
