/**
 * safeRender.js - توابع امن برای رندر کردن محتوا در DOM
 * جلوگیری از حملات XSS با استفاده از textContent به جای innerHTML
 */

/**
 * ایجاد عنصر HTML با متن امن
 * @param {string} tagName - نام تگ HTML
 * @param {Object} attributes - ویژگی‌های عنصر
 * @param {string|Array} content - محتوای متنی یا آرایه‌ای از فرزندان
 * @returns {HTMLElement}
 */
export function createElement(tagName, attributes = {}, content = '') {
    const element = document.createElement(tagName);
    
    // تنظیم attributes
    for (const [key, value] of Object.entries(attributes)) {
        if (key === 'className') {
            element.className = value;
        } else if (key === 'dataset') {
            for (const [dataKey, dataValue] of Object.entries(value)) {
                element.dataset[dataKey] = dataValue;
            }
        } else if (key.startsWith('on') && typeof value === 'function') {
            element.addEventListener(key.slice(2).toLowerCase(), value);
        } else if (value !== null && value !== undefined) {
            element.setAttribute(key, value);
        }
    }
    
    // تنظیم محتوا
    if (typeof content === 'string') {
        element.textContent = content;
    } else if (Array.isArray(content)) {
        content.forEach(child => {
            if (child instanceof Node) {
                element.appendChild(child);
            } else if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            }
        });
    }
    
    return element;
}

/**
 * پاک کردن محتوای یک عنصر و اضافه کردن متن امن
 * @param {HTMLElement} element - عنصر مقصد
 * @param {string} text - متن امن
 */
export function setTextContent(element, text) {
    if (!element) return;
    element.textContent = text;
}

/**
 * اضافه کردن فرزند به عنصر
 * @param {HTMLElement} parent - عنصر والد
 * @param {HTMLElement|string} child - فرزند (عنصر یا متن)
 */
export function appendChild(parent, child) {
    if (!parent) return;
    
    if (child instanceof Node) {
        parent.appendChild(child);
    } else if (typeof child === 'string') {
        parent.appendChild(document.createTextNode(child));
    }
}

/**
 * پاک کردن تمام فرزندان یک عنصر
 * @param {HTMLElement} element
 */
export function clearChildren(element) {
    if (!element) return;
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

/**
 * ایجاد عناصر از آرایه داده‌ها
 * @param {Array} items - آرایه داده‌ها
 * @param {Function} renderFn - تابع رندر هر آیتم
 * @param {HTMLElement} container - کانتینر مقصد
 */
export function renderList(items, renderFn, container) {
    if (!container || !Array.isArray(items)) return;
    
    clearChildren(container);
    
    items.forEach(item => {
        const element = renderFn(item);
        if (element) {
            appendChild(container, element);
        }
    });
}

/**
 * تبدیل innerHTML ناامن به روش امن
 * @param {HTMLElement} element - عنصری که باید محتوایش جایگزین شود
 * @param {string} htmlString - رشته HTML (فقط برای موارد ضروری)
 * @warning فقط در صورتی استفاده کنید که مطمئن هستید محتوا امن است
 */
export function setInnerHTML(element, htmlString) {
    if (!element) return;
    
    // هشدار در کنسول برای بررسی‌های بیشتر
    console.warn('⚠️ استفاده از setInnerHTML - مطمئن شوید محتوا امن است:', htmlString.substring(0, 50));
    
    element.innerHTML = htmlString;
}
