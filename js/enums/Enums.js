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
    ADIDAS: { value: 'adidas', label: 'آدیداس' },
    NIKE: { value: 'nike', label: 'نایکی' },
    PUMA: { value: 'puma', label: 'پوما' },
    BODY_CRAFT: { value: 'body_craft', label: 'بادی‌کرفت' },
    BETA: { value: 'beta', label: 'بتا' },
    MOLTEN: { value: 'molten', label: 'مولتن' },
    MIKASA: { value: 'mikasa', label: 'میکاسا' },
    GOLD_CUP: { value: 'gold_cup', label: 'گلدکاپ' },
    FOX: { value: 'fox', label: 'فوکس' },
    YAS: { value: 'yas', label: 'یاس' },
    GAMPO: { value: 'gampo', label: 'گامپو' },
    PRIMA: { value: 'prima', label: 'پریما' },
    VISA: { value: 'visa', label: 'ویسا' },
    MAGISTA: { value: 'magista', label: 'مجیستا' },
    ASICS: { value: 'asics', label: 'اسیکس' },
    GLADIATOR: { value: 'gladiator', label: 'گلادیاتور' },
    YUZ: { value: 'yuz', label: 'یوز' },
    SANTANA: { value: 'santana', label: 'سانتانا' },
    DERAFSH: { value: 'derafsh', label: 'درفش' },
    FILA: { value: 'fila', label: 'فیلا' },
    SNOWA: { value: 'snowa', label: 'اسنوا' },
    ALEX: { value: 'alex', label: 'الکس' },
    LP: { value: 'lp', label: 'ال پی' },
    NAIK: { value: 'naik', label: 'نایک' },
    YONEX: { value: 'yonex', label: 'یونیکس' },
    SPEEDO: { value: 'speedo', label: 'اسپیدو' },
    YAKAWAMA: { value: 'yakawama', label: 'یاکاواما' },
    IRANIAN: { value: 'iranian', label: 'ایرانی' },
    IMPORTED: { value: 'imported', label: 'خارجی' },
    SPALDING: { value: 'spalding', label: 'اسپالدینگ' }
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