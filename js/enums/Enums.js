/**
 * ============================================================
 *  Enums - مقادیر ثابت
 * ============================================================
 */

// ----- وضعیت موجودی -----
const StockStatus = Object.freeze({
    AVAILABLE: { value: 'available', label: 'موجود', emoji: '✅' },
    OUT_OF_STOCK: { value: 'out_of_stock', label: 'ناموجود', emoji: '❌' },
    PRE_ORDER: { value: 'pre_order', label: 'پیش‌سفارش', emoji: '⏳' },
    LIMITED: { value: 'limited', label: 'موجودی محدود', emoji: '⚠️' }
});

// ----- جنسیت -----
const Gender = Object.freeze({
    MEN: { value: 'men', label: 'مردانه', emoji: '👨' },
    WOMEN: { value: 'women', label: 'زنانه', emoji: '👩' },
    UNISEX: { value: 'unisex', label: 'یونیسکس', emoji: '👤' },
    KIDS: { value: 'kids', label: 'کودکان', emoji: '🧒' }
});

// ===== سایز لباس (جدید) =====
const ClothingSize = Object.freeze({
    XS: { value: 'XS', label: 'خیلی کوچک' },
    S: { value: 'S', label: 'کوچک' },
    M: { value: 'M', label: 'متوسط' },
    L: { value: 'L', label: 'بزرگ' },
    XL: { value: 'XL', label: 'خیلی بزرگ' },
    XXL: { value: 'XXL', label: 'بسیار بزرگ' },
    XXXL: { value: 'XXXL', label: 'خیلی خیلی بزرگ' },
    KIDS_S: { value: 'KIDS_S', label: 'کودک کوچک' },
    KIDS_M: { value: 'KIDS_M', label: 'کودک متوسط' },
    KIDS_L: { value: 'KIDS_L', label: 'کودک بزرگ' }
});

// ----- سایز کفش -----
const ShoeSize = Object.freeze({
    SIZE_36: 36,
    SIZE_37: 37,
    SIZE_38: 38,
    SIZE_39: 39,
    SIZE_40: 40,
    SIZE_41: 41,
    SIZE_42: 42,
    SIZE_43: 43,
    SIZE_44: 44,
    SIZE_45: 45,
    SIZE_46: 46,
    SIZE_47: 47,
    SIZE_48: 48
});

// ----- نوع توپ فوتبال -----
const FootballType = Object.freeze({
    TRAINING: { value: 'training', label: 'تمرینی' },
    MATCH: { value: 'match', label: 'مسابقه' },
    BEACH: { value: 'beach', label: 'ساحلی' },
    FUTSAL: { value: 'futsal', label: 'فوتسال' }
});

// ----- جنس توپ -----
const BallMaterial = Object.freeze({
    LEATHER: { value: 'leather', label: 'چرم طبیعی' },
    PU: { value: 'pu', label: 'چرم مصنوعی (PU)' },
    PVC: { value: 'pvc', label: 'PVC' },
    RUBBER: { value: 'rubber', label: 'لاستیک' },
    COMPOSITE: { value: 'composite', label: 'کامپوزیت' }
});

// ----- نوع زمین -----
const Terrain = Object.freeze({
    NATURAL: { value: 'natural', label: 'چمن طبیعی' },
    ARTIFICIAL: { value: 'artificial', label: 'چمن مصنوعی' },
    INDOOR: { value: 'indoor', label: 'سالنی' },
    OUTDOOR: { value: 'outdoor', label: 'خارج از سالن' }
});

// ===== برندها =====
const Brand = Object.freeze({
    // ===== برندهای بین‌المللی =====
    ADIDAS: { value: 'adidas', label: 'آدیداس', type: 'international' },
    NIKE: { value: 'nike', label: 'نایکی', type: 'international' },
    PUMA: { value: 'puma', label: 'پوما', type: 'international' },
    ASICS: { value: 'asics', label: 'اسیکس', type: 'international' },
    FILA: { value: 'fila', label: 'فیلا', type: 'international' },
    SPEEDO: { value: 'speedo', label: 'اسپیدو', type: 'international' },
    YONEX: { value: 'yonex', label: 'یونکس', type: 'international' },
    SPALDING: { value: 'spalding', label: 'اسپالدینگ', type: 'international' },

    // ===== برندهای تخصصی ورزشی =====
    MOLTEN: { value: 'molten', label: 'مولتن', type: 'sports' },
    MIKASA: { value: 'mikasa', label: 'میکاسا', type: 'sports' },
    GOLD_CUP: { value: 'gold_cup', label: 'گلدکاپ', type: 'sports' },
    FOX: { value: 'fox', label: 'فوکس', type: 'sports' },
    GAMPO: { value: 'gampo', label: 'گامپو', type: 'sports' },
    PRIMA: { value: 'prima', label: 'پریما', type: 'sports' },
    MAGISTA: { value: 'magista', label: 'مجیستا', type: 'sports' },
    YAKAWAMA: { value: 'yakawama', label: 'یاکاواما', type: 'sports' },

    // ===== برندهای ایرانی =====
    BODY_CRAFT: { value: 'body_craft', label: 'بادی‌کرفت', type: 'iranian' },
    BETA: { value: 'beta', label: 'بتا', type: 'iranian' },
    YAS: { value: 'yas', label: 'یاس', type: 'iranian' },
    SANTANA: { value: 'santana', label: 'سانتانا', type: 'iranian' },
    ALEX: { value: 'alex', label: 'الکس', type: 'iranian' },
    LP: { value: 'lp', label: 'ال‌پی', type: 'iranian' },

    // ===== سایر =====
    OTHER: { value: 'other', label: 'متفرقه', type: 'other' },
});

// ===== رنگ‌ها =====
const Color = Object.freeze({
    WHITE: { value: 'white', label: 'سفید', hex: '#FFFFFF' },
    BLACK: { value: 'black', label: 'مشکی', hex: '#000000' },
    RED: { value: 'red', label: 'قرمز', hex: '#FF0000' },
    BLUE: { value: 'blue', label: 'آبی', hex: '#0000FF' },
    GREEN: { value: 'green', label: 'سبز', hex: '#00FF00' },
    YELLOW: { value: 'yellow', label: 'زرد', hex: '#FFFF00' },
    ORANGE: { value: 'orange', label: 'نارنجی', hex: '#FFA500' },
    PURPLE: { value: 'purple', label: 'بنفش', hex: '#800080' },
    PINK: { value: 'pink', label: 'صورتی', hex: '#FF69B4' },
    GRAY: { value: 'gray', label: 'خاکستری', hex: '#808080' }
});

// ===== دسته‌بندی محصولات =====
const Category = Object.freeze({
    // دمبل و وزنه
    DUMBBELL: { value: 'dumbbell', label: 'دمبل و وزنه', emoji: '🏋️' },

    // توپ‌ها
    FOOTBALL_BALL: { value: 'football_ball', label: 'توپ فوتبال', emoji: '⚽' },
    BASKETBALL_BALL: { value: 'basketball_ball', label: 'توپ بسکتبال', emoji: '🏀' },
    VOLLEYBALL_BALL: { value: 'volleyball_ball', label: 'توپ والیبال', emoji: '🏐' },
    HANDBALL_BALL: { value: 'handball_ball', label: 'توپ هندبال', emoji: '🤾' },
    EXERCISE_BALL: { value: 'exercise_ball', label: 'توپ بدنسازی', emoji: '💪' },
    PING_PONG: { value: 'ping_pong', label: 'پینگ پنگ', emoji: '🏓' },
    TENNIS_BALL: { value: 'tennis_ball', label: 'توپ تنیس', emoji: '🎾' },

    // کفش
    FOOTBALL_SHOE: { value: 'football_shoe', label: 'کفش فوتبال', emoji: '👟' },
    VOLLEYBALL_SHOE: { value: 'volleyball_shoe', label: 'کفش والیبال', emoji: '👟' },
    WRESTLING_SHOE: { value: 'wrestling_shoe', label: 'کفش کشتی', emoji: '👟' },
    SPORTS_SHOE: { value: 'sports_shoe', label: 'کفش ورزشی', emoji: '👟' },

    // پوشاک
    CLOTHING: { value: 'clothing', label: 'پوشاک ورزشی', emoji: '👕' },
    MARTIAL_ARTS: { value: 'martial_arts', label: 'ورزش‌های رزمی', emoji: '🥋' },
    SWIMMING: { value: 'swimming', label: 'شنا', emoji: '🏊' },

    // تجهیزات بدنسازی
    FITNESS: { value: 'fitness', label: 'تجهیزات بدنسازی', emoji: '💪' },

    // لوازم جانبی
    GLOVES: { value: 'gloves', label: 'دستکش', emoji: '🧤' },
    BANDS: { value: 'bands', label: 'بند و زانوبند', emoji: '🔄' },
    ACCESSORIES: { value: 'accessories', label: 'لوازم جانبی', emoji: '🔧' },

    // تور
    NETS: { value: 'nets', label: 'تور و تجهیزات زمین', emoji: '🥅' },

    // راکت
    RACKET: { value: 'racket', label: 'راکت', emoji: '🏸' },

    // سایر
    OTHER: { value: 'other', label: 'سایر محصولات', emoji: '📦' },
    DECORATIVE: { value: 'decorative', label: 'تزیینی', emoji: '✨' }
});

// ===== گزینه‌های مرتب‌سازی =====
const SortOption = Object.freeze({
    NEWEST: 'newest',
    PRICE_ASC: 'price_asc',
    PRICE_DESC: 'price_desc',
    NAME_ASC: 'name_asc',
    NAME_DESC: 'name_desc',
});

// ===== نام رویدادها =====
const AppEvents = Object.freeze({
    FILTER_CHANGED: 'filter:changed',
    SORT_CHANGED: 'sort:changed',
    COMPARISON_CHANGED: 'comparison:changed',
    HISTORY_CHANGED: 'history:changed',
    PRODUCTS_UPDATED: 'products:updated',
    PAGE_CHANGED: 'page:changed',
});

// ===== کلیدهای localStorage =====
const StorageKeys = Object.freeze({
    THEME: 'sport90_theme',
    HISTORY: 'sport90_history',
    COMPARISON: 'sport90_comparison',
    SEARCH_HISTORY: 'sport90_search_history',
    FILTERS: 'sport90_filters',
});

// ===== محدودیت‌ها =====
const AppLimits = Object.freeze({
    MAX_COMPARISON: 3,
    MAX_HISTORY: 10,
    MAX_SEARCH_HISTORY: 5,
    MAX_SUGGESTIONS: 8,
});