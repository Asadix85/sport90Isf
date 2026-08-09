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
function createElement(tagName, attributes = {}, content = '') {
    const element = document.createElement(tagName);

    // تنظیم attributes
    for (const [key, value] of Object.entries(attributes)) {
        if (key === 'className') {
            element.className = value;
        } else if (key === 'dataset') {
            Object.assign(element.dataset, value);
        } else if (key === 'style') {
            Object.assign(element.style, value);
        } else if (key.startsWith('data-')) {
            element.setAttribute(key, value);
        } else if (key === 'textContent') {
            element.textContent = value;
        } else if (key === 'html') {
            // فقط در صورتی که مطمئن هستید محتوا امن است
            element.innerHTML = value;
        } else {
            element.setAttribute(key, value);
        }
    }

    // افزودن محتوا
    if (typeof content === 'string') {
        element.textContent = content;
    } else if (Array.isArray(content)) {
        content.forEach(child => {
            if (child instanceof HTMLElement) {
                element.appendChild(child);
            }
        });
    }

    return element;
}

/**
 * تنظیم متن به صورت امن
 * @param {HTMLElement} element
 * @param {string} text
 */
function setTextContent(element, text) {
    if (!element) return;
    element.textContent = text;
}

/**
 * افزودن فرزند به عنصر والد
 * @param {HTMLElement} parent
 * @param {HTMLElement} child
 */
function appendChild(parent, child) {
    if (!parent || !child) return;
    parent.appendChild(child);
}

/**
 * پاک کردن همه فرزندان یک عنصر
 * @param {HTMLElement} element
 */
function clearChildren(element) {
    if (!element) return;
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

/**
 * رندر کردن لیست آیتم‌ها
 * @param {Array} items
 * @param {Function} renderFn - تابعی که هر آیتم را به HTMLElement تبدیل می‌کند
 * @param {HTMLElement} container
 */
function renderList(items, renderFn, container) {
    if (!container || !Array.isArray(items)) return;

    clearChildren(container);

    items.forEach((item, index) => {
        const element = renderFn(item, index);
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
function setInnerHTML(element, htmlString) {
    if (!element) return;

    // هشدار در کنسول برای بررسی‌های بیشتر
    console.warn('⚠️ استفاده از setInnerHTML - مطمئن شوید محتوا امن است:', htmlString.substring(0, 50));

    element.innerHTML = htmlString;
}

// قرار دادن در window برای دسترسی سراسری
if (typeof window !== 'undefined') {
    window.createElement = createElement;
    window.setTextContent = setTextContent;
    window.appendChild = appendChild;
    window.clearChildren = clearChildren;
    window.renderList = renderList;
    window.setInnerHTML = setInnerHTML;
}
