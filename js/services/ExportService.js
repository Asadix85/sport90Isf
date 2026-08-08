/**
 * ExportService.js - سرویس خروجی CSV و JSON
 *
 * مسئولیت:
 *   - خروجی گرفتن محصولات به صورت CSV (با BOM برای UTF-8 در Excel)
 *   - خروجی گرفتن محصولات به صورت JSON
 *   - دانلود فایل در مرورگر
 */
export class ExportService {
    /**
     * ستون‌های پیش‌فرض CSV
     */
    static get DEFAULT_COLUMNS() {
        return ['code', 'name', 'brand', 'category', 'price', 'stockStatus'];
    }

    /**
     * export به CSV
     * @param {Array<Object>} products
     * @param {string} [filename='products.csv']
     * @param {Array<string>} [columns]
     * @returns {{success: boolean, exported: number, message: string}}
     */
    exportToCSV(products, filename = 'products.csv', columns = null) {
        try {
            if (!Array.isArray(products) || products.length === 0) {
                throw new Error('محصولی برای خروجی وجود ندارد');
            }

            const cols = columns || ExportService.DEFAULT_COLUMNS;
            const csv = this.buildCSV(products, cols);
            // اضافه کردن BOM برای پشتیبانی از UTF-8 در Excel
            this._download('\uFEFF' + csv, filename, 'text/csv;charset=utf-8;');

            return {
                success: true,
                exported: products.length,
                message: `${products.length} محصول به صورت CSV صادر شد`,
            };
        } catch (error) {
            console.error('❌ [ExportService.exportToCSV] خطا:', error);
            return { success: false, exported: 0, message: error.message };
        }
    }

    /**
     * ساخت رشته CSV
     * @param {Array<Object>} products
     * @param {Array<string>} columns
     * @returns {string}
     */
    buildCSV(products, columns) {
        const escape = (val) => {
            const str = val === null || val === undefined ? '' : String(val);
            return /[",\n;]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
        };

        const labels = {
            code: 'کد',
            name: 'نام',
            brand: 'برند',
            category: 'دسته‌بندی',
            price: 'قیمت',
            stockStatus: 'وضعیت موجودی',
        };

        const header = columns.map((c) => escape(labels[c] || c)).join(',');
        const rows = products.map((p) =>
            columns.map((col) => escape(this._extractValue(p, col))).join(',')
        );
        return [header, ...rows].join('\n');
    }

    /**
     * export به JSON
     * @param {Array<Object>} products
     * @param {string} [filename='products.json']
     * @returns {{success: boolean, exported: number, message: string}}
     */
    exportToJSON(products, filename = 'products.json') {
        try {
            if (!Array.isArray(products) || products.length === 0) {
                throw new Error('محصولی برای خروجی وجود ندارد');
            }

            const json = JSON.stringify(products, null, 2);
            this._download(json, filename, 'application/json;charset=utf-8;');

            return {
                success: true,
                exported: products.length,
                message: `${products.length} محصول به صورت JSON صادر شد`,
            };
        } catch (error) {
            console.error('❌ [ExportService.exportToJSON] خطا:', error);
            return { success: false, exported: 0, message: error.message };
        }
    }

    /**
     * استخراج مقدار فیلد
     * @private
     */
    _extractValue(product, field) {
        const value = product[field];
        if (value && typeof value === 'object' && value.label !== undefined) {
            return value.label;
        }
        if (value && typeof value === 'object' && value.value !== undefined) {
            return value.value;
        }
        return value;
    }

    /**
     * دانلود فایل در مرورگر
     * @private
     * @param {string} content
     * @param {string} filename
     * @param {string} mime
     */
    _download(content, filename, mime) {
        try {
            const blob = new Blob([content], { type: mime });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            setTimeout(() => {
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }, 100);
        } catch (error) {
            console.error('❌ [ExportService._download] خطا:', error);
            throw new Error('خطا در دانلود فایل');
        }
    }
}
export { ExportService };
