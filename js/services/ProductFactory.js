/**
 * ProductFactory.js - کارخانه ساخت محصولات از روی داده‌های خام (JSON)
 * ------------------------------------------------------------------
 * این فایل، دیتای ساده (رشته/عدد) خونده‌شده از data/products.json رو
 * به نمونه‌های واقعی کلاس‌های محصول (FootballBall، Shirt، Barbell و...)
 * تبدیل می‌کنه. اضافه‌کردن یا ادیت محصول یعنی فقط ادیت products.json —
 * لازم نیست این فایل رو دست بزنید مگر بخواید یه «نوع محصول» کاملاً جدید
 * (type جدید) اضافه کنید.
 */

// نگاشت type (رشته‌ای که در JSON میاد) -> کلاس محصول
const PRODUCT_TYPE_TO_CLASS = {
    // دمبل
    fixed_dumbbell: 'FixedDumbbell',
    // توپ‌ها
    football_ball: 'FootballBall',
    basketball_ball: 'BasketballBall',
    volleyball_ball: 'VolleyballBall',
    exercise_ball: 'ExerciseBall',
    medicine_ball: 'MedicineBall',
    handball_ball: 'Ball',
    ping_pong: 'Ball',
    tennis_ball: 'Ball',
    decorative: 'Ball',
    // کفش‌ها
    football_shoe: 'FootballShoe',
    volleyball_shoe: 'VolleyballShoe',
    wrestling_shoe: 'WrestlingShoe',
    sports_shoe: 'SportsShoe',
    // لباس‌ها
    shirt: 'Shirt',
    short: 'Short',
    socks: 'Socks',
    swimsuit: 'Swimsuit',
    martial_arts_uniform: 'MartialArtsUniform',
    clothing_other: 'Clothing',
    swimming_other: 'Clothing',
    // تجهیزات بدنسازی
    barbell: 'Barbell',
    pull_up_bar: 'PullUpBar',
    resistance_band: 'ResistanceBand',
    yoga_mat: 'YogaMat',
    fitness_other: 'FitnessEquipment',
    // لوازم جانبی
    glove: 'Glove',
    band: 'Band',
    racket: 'Racket',
    accessory: 'Accessory',
    swimming_accessory: 'Product',
    // تور
    net: 'Net',
    football_net: 'FootballNet',
    // سایر
    other: 'Product',
};

// وقتی کلاس هدف عمومی (Ball/Clothing/FitnessEquipment/Product) باشه،
// باید دسته‌بندی درست رو صریحاً پاس بدیم، چون خود کلاس category پیش‌فرض دیگه‌ای داره
const PRODUCT_TYPE_CATEGORY_OVERRIDE = {
    handball_ball: () => window.Category.HANDBALL_BALL,
    ping_pong: () => window.Category.PING_PONG,
    tennis_ball: () => window.Category.TENNIS_BALL,
    decorative: () => window.Category.DECORATIVE,
    swimming_other: () => window.Category.SWIMMING,
    swimming_accessory: () => window.Category.SWIMMING,
    other: () => window.Category.OTHER,
};

// فیلدهایی که در JSON به‌صورت رشته/عدد ساده ذخیره میشن ولی کلاس‌ها
// انتظار آبجکت enum کامل (با label/emoji) رو دارن؛ اینجا بازسازی‌شون می‌کنیم.
const ENUM_FIELD_MAP = {
    stockStatus: () => window.StockStatus,
    brand: () => window.Brand,
    gender: () => window.Gender,
    terrain: () => window.Terrain,
    footballType: () => window.FootballType,
    material: () => window.BallMaterial,
    size: () => window.ClothingSize,
};

function resolveEnumValue(dict, rawValue) {
    if (rawValue === null || rawValue === undefined || typeof rawValue === 'object') {
        return rawValue;
    }
    const match = Object.values(dict).find(entry => entry && typeof entry === 'object' && entry.value === rawValue);
    // اگه پیدا نشد (مثلاً یه رشته آزاد مثل «آهن روکش‌دار» برای دمبل)، همون مقدار خام رو نگه می‌داریم
    return match !== undefined ? match : rawValue;
}

function hydrateProductData(raw) {
    const data = { ...raw };

    for (const [field, getDict] of Object.entries(ENUM_FIELD_MAP)) {
        if (field in data) {
            data[field] = resolveEnumValue(getDict(), data[field]);
        }
    }

    if (Array.isArray(data.colors)) {
        data.colors = data.colors.map(c => resolveEnumValue(window.Color, c));
    }

    return data;
}

class ProductFactory {
    /**
     * ساخت یک نمونه محصول از روی یک رکورد JSON
     * @param {Object} raw - یک آیتم از data/products.json
     * @returns {Product|null}
     */
    static createProduct(raw) {
        if (!raw || !raw.type) {
            console.warn('⚠️ محصول بدون type نادیده گرفته شد:', raw);
            return null;
        }

        const className = PRODUCT_TYPE_TO_CLASS[raw.type];
        const ProductClass = className && window[className];

        if (!ProductClass) {
            console.warn(`⚠️ نوع محصول ناشناخته: "${raw.type}" (محصول: ${raw.name || raw.id})`);
            return null;
        }

        const data = hydrateProductData(raw);

        const overrideFn = PRODUCT_TYPE_CATEGORY_OVERRIDE[raw.type];
        if (overrideFn) {
            data.category = overrideFn();
        }

        try {
            const product = new ProductClass(data);
            if (raw.id) product.id = raw.id;
            return product;
        } catch (error) {
            console.error(`❌ خطا در ساخت محصول "${raw.name || raw.id}":`, error);
            return null;
        }
    }

    /**
     * ساخت لیستی از محصولات از روی آرایه JSON
     * @param {Array} rows
     * @returns {Array<Product>}
     */
    static createProductList(rows) {
        if (!Array.isArray(rows)) {
            console.error('❌ داده‌های محصولات باید آرایه باشد');
            return [];
        }
        return rows.map(row => ProductFactory.createProduct(row)).filter(p => p !== null);
    }
}

window.ProductFactory = ProductFactory;
