/**
 * escapeHtml.js - جلوگیری از XSS
 * @param {*} value
 * @returns {string}
 */
function escapeHtml(value) {
    if (value === null || value === undefined) return '';
    const str = String(value);
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    };
    return str.replace(/[&<>"']/g, (m) => map[m]);
}

// Export for module usage
if (typeof window !== 'undefined') {
    window.escapeHtml = escapeHtml;
}
