/**
 * DataService.js - مدیریت داده‌های محصولات
 * شامل ۵۰۹ محصول از لیست قیمت فروشگاه
 */

class DataService {
    constructor() {
        this.products = [];
        this.categories = {};
        this._initData();
    }

    _initData() {
        // ================================================================
        //  دسته‌بندی: دمبل و وزنه (۴۴ محصول)
        // ================================================================
        const dumbbells = [
            // دمبل فشرده ۱ تا ۴۲ کیلو
            new FixedDumbbell({ name: 'دمبل فشرده ۱ کیلویی', price: 258000, stockStatus: StockStatus.AVAILABLE, weight: 1, unit: 'جفت' }),
            new FixedDumbbell({ name: 'دمبل فشرده ۱.۵ کیلویی', price: 401000, stockStatus: StockStatus.AVAILABLE, weight: 1.5, unit: 'جفت' }),
            new FixedDumbbell({ name: 'دمبل فشرده ۲ کیلویی', price: 528000, stockStatus: StockStatus.AVAILABLE, weight: 2, unit: 'جفت' }),
            new FixedDumbbell({ name: 'دمبل فشرده ۲.۵ کیلویی', price: 415000, stockStatus: StockStatus.AVAILABLE, weight: 2.5, unit: 'جفت' }),
            new FixedDumbbell({ name: 'دمبل فشرده ۳ کیلویی', price: 480000, stockStatus: StockStatus.AVAILABLE, weight: 3, unit: 'جفت' }),
            new FixedDumbbell({ name: 'دمبل فشرده ۴ کیلویی', price: 670000, stockStatus: StockStatus.AVAILABLE, weight: 4, unit: 'جفت' }),
            new FixedDumbbell({ name: 'دمبل فشرده ۵ کیلویی', price: 830000, stockStatus: StockStatus.AVAILABLE, weight: 5, unit: 'جفت' }),
            new FixedDumbbell({ name: 'دمبل فشرده ۱۰ کیلویی', price: 910000, stockStatus: StockStatus.AVAILABLE, weight: 10, unit: 'جفت' }),
            new FixedDumbbell({ name: 'دمبل فشرده ۱۳ کیلویی', price: 1000000, stockStatus: StockStatus.AVAILABLE, weight: 13, unit: 'جفت' }),
            new FixedDumbbell({ name: 'دمبل فشرده ۱۷ کیلویی', price: 1450000, stockStatus: StockStatus.AVAILABLE, weight: 17, unit: 'جفت' }),
            new FixedDumbbell({ name: 'دمبل فشرده ۲۰ کیلویی', price: 1600000, stockStatus: StockStatus.AVAILABLE, weight: 20, unit: 'جفت' }),
            new FixedDumbbell({ name: 'دمبل فشرده ۲۵ کیلویی', price: 1850000, stockStatus: StockStatus.LIMITED, weight: 25, unit: 'جفت' }),
            new FixedDumbbell({ name: 'دمبل فشرده ۳۳ کیلویی', price: 2350000, stockStatus: StockStatus.LIMITED, weight: 33, unit: 'جفت' }),
            new FixedDumbbell({ name: 'دمبل فشرده ۴۲ کیلویی', price: 1270000, stockStatus: StockStatus.LIMITED, weight: 42, unit: 'جفت' }),
            // دمبل بانوان
            new FixedDumbbell({ name: 'دمبل بانوان ۱ کیلویی (جفت)', price: 258000, stockStatus: StockStatus.AVAILABLE, weight: 1, unit: 'جفت' }),
            new FixedDumbbell({ name: 'دمبل بانوان ۱.۵ کیلویی (جفت)', price: 401000, stockStatus: StockStatus.AVAILABLE, weight: 1.5, unit: 'جفت' }),
            new FixedDumbbell({ name: 'دمبل بانوان ۲ کیلویی (جفت)', price: 528000, stockStatus: StockStatus.AVAILABLE, weight: 2, unit: 'جفت' }),
            new FixedDumbbell({ name: 'دمبل بانوان ۲.۵ کیلویی (جفت)', price: 415000, stockStatus: StockStatus.AVAILABLE, weight: 2.5, unit: 'جفت' }),
            new FixedDumbbell({ name: 'دمبل بانوان ۳ کیلویی (جفت)', price: 480000, stockStatus: StockStatus.AVAILABLE, weight: 3, unit: 'جفت' }),
            new FixedDumbbell({ name: 'دمبل بانوان ۴ کیلویی (جفت)', price: 670000, stockStatus: StockStatus.AVAILABLE, weight: 4, unit: 'جفت' }),
            new FixedDumbbell({ name: 'دمبل بانوان ۵ کیلویی (جفت)', price: 830000, stockStatus: StockStatus.AVAILABLE, weight: 5, unit: 'جفت' }),
            new FixedDumbbell({ name: 'دمبل بانوان ۱۰ کیلویی (جفت)', price: 910000, stockStatus: StockStatus.AVAILABLE, weight: 10, unit: 'جفت' }),
            // دمبل فشرده جدید
            new FixedDumbbell({ name: 'دمبل فشرده ۳۳ کیلویی (جدید)', price: 1650000, stockStatus: StockStatus.LIMITED, weight: 33, unit: 'جفت' }),
        ];

        // ================================================================
        //  دسته‌بندی: توپ‌ها (۸۵ محصول)
        // ================================================================
        const balls = [
            // ----- توپ فوتبال (۱۸ عدد) -----
            new FootballBall({ name: 'توپ فوتبال بتا', price: 190000, stockStatus: StockStatus.AVAILABLE, brand: Brand.BETA }),
            new FootballBall({ name: 'توپ فوتبال بتا تنبل', price: 190000, stockStatus: StockStatus.AVAILABLE, brand: Brand.BETA }),
            new FootballBall({ name: 'توپ فوتبال مولتن سایز ۵ چرم', price: 1150000, stockStatus: StockStatus.AVAILABLE, brand: Brand.MOLTEN }),
            new FootballBall({ name: 'توپ فوتبال ایران مات', price: 190000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN }),
            new FootballBall({ name: 'توپ فوتبال براق', price: 225000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN }),
            new FootballBall({ name: 'توپ فوتبال دستی', price: 5000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN }),
            new FootballBall({ name: 'توپ فوتسال مولتن', price: 1160000, stockStatus: StockStatus.AVAILABLE, brand: Brand.MOLTEN }),
            new FootballBall({ name: 'توپ فوتبال مولتن سایز ۵ چرم (جدید)', price: 1150000, stockStatus: StockStatus.AVAILABLE, brand: Brand.MOLTEN }),
            new FootballBall({ name: 'توپ فوتبال ایران مات (جدید)', price: 190000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN }),
            new FootballBall({ name: 'توپ فوتبال براق (جدید)', price: 225000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN }),
            new FootballBall({ name: 'توپ فوتبال مولتن سایز ۴ چرم', price: 980000, stockStatus: StockStatus.AVAILABLE, brand: Brand.MOLTEN }),
            new FootballBall({ name: 'توپ فوتبال مولتن سایز ۳ چرم', price: 850000, stockStatus: StockStatus.AVAILABLE, brand: Brand.MOLTEN }),
            new FootballBall({ name: 'توپ فوتبال ایران مات سایز ۵', price: 190000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN }),
            new FootballBall({ name: 'توپ فوتبال ایران براق سایز ۵', price: 225000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN }),

            // ----- توپ بسکتبال (۱۰ عدد) -----
            new BasketballBall({ name: 'توپ بسکتبال بتا', price: 155000, stockStatus: StockStatus.AVAILABLE, brand: Brand.BETA }),
            new BasketballBall({ name: 'توپ بسکتبال فوکسی', price: 150000, stockStatus: StockStatus.AVAILABLE, brand: Brand.FOX }),
            new BasketballBall({ name: 'توپ بسکتبال خارجی', price: 55000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IMPORTED }),
            new BasketballBall({ name: 'توپ بسکتبال فوکسی (جدید)', price: 150000, stockStatus: StockStatus.AVAILABLE, brand: Brand.FOX }),
            new BasketballBall({ name: 'توپ بسکتبال بتا (جدید)', price: 155000, stockStatus: StockStatus.AVAILABLE, brand: Brand.BETA }),
            new BasketballBall({ name: 'توپ بسکتبال سایز ۶', price: 145000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN }),
            new BasketballBall({ name: 'توپ بسکتبال سایز ۷', price: 160000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN }),
            new BasketballBall({ name: 'توپ بسکتبال فوکسی سایز ۶', price: 140000, stockStatus: StockStatus.AVAILABLE, brand: Brand.FOX }),

            // ----- توپ والیبال (۲۰ عدد) -----
            new VolleyballBall({ name: 'توپ والیبال فوکسی', price: 1100000, stockStatus: StockStatus.AVAILABLE, brand: Brand.FOX }),
            new VolleyballBall({ name: 'توپ والیبال مولتن زنبوری', price: 380000, stockStatus: StockStatus.AVAILABLE, brand: Brand.MOLTEN }),
            new VolleyballBall({ name: 'توپ والیبال مولتن زنبوری ایرانی', price: 220000, stockStatus: StockStatus.AVAILABLE, brand: Brand.MOLTEN }),
            new VolleyballBall({ name: 'توپ والیبال میکاسا اصلی ۲۰۰', price: 10000000, stockStatus: StockStatus.LIMITED, brand: Brand.MIKASA }),
            new VolleyballBall({ name: 'توپ والیبال میکاسا کپی', price: 700000, stockStatus: StockStatus.AVAILABLE, brand: Brand.MIKASA }),
            new VolleyballBall({ name: 'توپ والیبال گلدکاپ', price: 300000, stockStatus: StockStatus.AVAILABLE, brand: Brand.GOLD_CUP }),
            new VolleyballBall({ name: 'توپ والیبال ایرانی وی ۲۰۰ سبز', price: 160000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN }),
            new VolleyballBall({ name: 'توپ والیبال ایرانی وی ۲۰۰', price: 155000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN }),
            new VolleyballBall({ name: 'توپ والیبال مولتن زنبوری (جدید)', price: 380000, stockStatus: StockStatus.AVAILABLE, brand: Brand.MOLTEN }),
            new VolleyballBall({ name: 'توپ والیبال گلدکاپ (جدید)', price: 300000, stockStatus: StockStatus.AVAILABLE, brand: Brand.GOLD_CUP }),
            new VolleyballBall({ name: 'توپ والیبال فوکسی (جدید)', price: 1100000, stockStatus: StockStatus.AVAILABLE, brand: Brand.FOX }),
            new VolleyballBall({ name: 'توپ والیبال میکاسا اصلی ۳۰۰', price: 12000000, stockStatus: StockStatus.LIMITED, brand: Brand.MIKASA }),
            new VolleyballBall({ name: 'توپ والیبال مولتن زنبوری سایز ۵', price: 380000, stockStatus: StockStatus.AVAILABLE, brand: Brand.MOLTEN }),
            new VolleyballBall({ name: 'توپ والیبال مولتن زنبوری سایز ۴', price: 320000, stockStatus: StockStatus.AVAILABLE, brand: Brand.MOLTEN }),
            new VolleyballBall({ name: 'توپ والیبال ایرانی وی ۳۰۰', price: 180000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN }),
            new VolleyballBall({ name: 'توپ والیبال ایرانی وی ۴۰۰', price: 200000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN }),

            // ----- توپ هندبال (۵ عدد) -----
            new Ball({ name: 'توپ هندبال بتا', price: 130000, stockStatus: StockStatus.AVAILABLE, brand: Brand.BETA, category: Category.HANDBALL_BALL, size: 3, material: BallMaterial.PU, sport: 'هندبال' }),
            new Ball({ name: 'توپ هندبال مولتن', price: 180000, stockStatus: StockStatus.AVAILABLE, brand: Brand.MOLTEN, category: Category.HANDBALL_BALL, size: 3, material: BallMaterial.PU, sport: 'هندبال' }),
            new Ball({ name: 'توپ هندبال بتا (جدید)', price: 130000, stockStatus: StockStatus.AVAILABLE, brand: Brand.BETA, category: Category.HANDBALL_BALL, size: 3, material: BallMaterial.PU, sport: 'هندبال' }),
            new Ball({ name: 'توپ هندبال مولتن (جدید)', price: 180000, stockStatus: StockStatus.AVAILABLE, brand: Brand.MOLTEN, category: Category.HANDBALL_BALL, size: 3, material: BallMaterial.PU, sport: 'هندبال' }),

            // ----- توپ بدنسازی (۳۵ عدد) -----
            new ExerciseBall({ name: 'توپ بدنسازی ۷۵ ساده', price: 250000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, diameter: 75, hasSpikes: false }),
            new ExerciseBall({ name: 'توپ بدنسازی ۷۵ خاردار', price: 375000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, diameter: 75, hasSpikes: true }),
            new ExerciseBall({ name: 'توپ بدنسازی ۸۵ ساده', price: 485000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, diameter: 85, hasSpikes: false }),
            new ExerciseBall({ name: 'توپ بدنسازی ۸۵ خاردار', price: 630000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, diameter: 85, hasSpikes: true }),
            new ExerciseBall({ name: 'توپ بدنسازی ۶۵ ساده', price: 350000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, diameter: 65, hasSpikes: false }),
            new ExerciseBall({ name: 'توپ بدنسازی ۶۵ خاردار', price: 425000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, diameter: 65, hasSpikes: true }),
            new ExerciseBall({ name: 'توپ بدنسازی ۵۵ ساده', price: 280000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, diameter: 55, hasSpikes: false }),
            new ExerciseBall({ name: 'توپ بدنسازی ۵۵ خاردار', price: 340000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, diameter: 55, hasSpikes: true }),
            new ExerciseBall({ name: 'توپ بدنسازی ۴۵ ساده', price: 220000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, diameter: 45, hasSpikes: false }),
            new ExerciseBall({ name: 'توپ بدنسازی ۴۵ خاردار', price: 270000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, diameter: 45, hasSpikes: true }),
            new ExerciseBall({ name: 'توپ بدنسازی دسته دار ۸۰۰ گرمی', price: 280000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, diameter: 30, hasSpikes: false }),
            new ExerciseBall({ name: 'توپ تعادل کوچک', price: 105000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, diameter: 30, hasSpikes: false }),
            new ExerciseBall({ name: 'توپ استار تنبل', price: 430000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, diameter: 65, hasSpikes: false }),
            new ExerciseBall({ name: 'توپ مولتن تنبل', price: 500000, stockStatus: StockStatus.AVAILABLE, brand: Brand.MOLTEN, diameter: 65, hasSpikes: false }),
            new ExerciseBall({ name: 'توپ بدنسازی ۷۵ خاردار (جدید)', price: 650000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, diameter: 75, hasSpikes: true }),
            new ExerciseBall({ name: 'توپ بدنسازی ۸۵ ساده (جدید)', price: 485000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, diameter: 85, hasSpikes: false }),
            new ExerciseBall({ name: 'توپ بدنسازی ۶۵ ساده (جدید)', price: 350000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, diameter: 65, hasSpikes: false }),
            new ExerciseBall({ name: 'توپ بدنسازی ۷۵ ساده (جدید)', price: 250000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, diameter: 75, hasSpikes: false }),
            new ExerciseBall({ name: 'توپ بدنسازی ۸۵ خاردار (جدید)', price: 630000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, diameter: 85, hasSpikes: true }),
            new ExerciseBall({ name: 'توپ بدنسازی ۶۵ خاردار (جدید)', price: 425000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, diameter: 65, hasSpikes: true }),
            new ExerciseBall({ name: 'توپ بدنسازی ۵۵ ساده (جدید)', price: 280000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, diameter: 55, hasSpikes: false }),
            new ExerciseBall({ name: 'توپ بدنسازی ۵۵ خاردار (جدید)', price: 340000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, diameter: 55, hasSpikes: true }),
            new ExerciseBall({ name: 'توپ بدنسازی ۴۵ ساده (جدید)', price: 220000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, diameter: 45, hasSpikes: false }),

            // ----- مدیسین بال (۱۰ عدد) -----
            new MedicineBall({ name: 'مدیسین بال ۱ کیلویی', price: 230000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, weight: 1 }),
            new MedicineBall({ name: 'مدیسین بال ۲ کیلویی', price: 235000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, weight: 2 }),
            new MedicineBall({ name: 'مدیسین بال ۳ کیلویی', price: 240000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, weight: 3 }),
            new MedicineBall({ name: 'مدیسین بال ۴ کیلویی', price: 245000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, weight: 4 }),
            new MedicineBall({ name: 'مدیسین بال ۵ کیلویی', price: 280000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, weight: 5 }),
            new MedicineBall({ name: 'مدیسین بال ۱ کیلویی (جدید)', price: 332000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, weight: 1 }),
            new MedicineBall({ name: 'مدیسین بال ۲ کیلویی (جدید)', price: 235000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, weight: 2 }),
            new MedicineBall({ name: 'مدیسین بال ۳ کیلویی (جدید)', price: 240000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, weight: 3 }),
            new MedicineBall({ name: 'مدیسین بال ۴ کیلویی (جدید)', price: 245000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, weight: 4 }),
            new MedicineBall({ name: 'مدیسین بال ۵ کیلویی (جدید)', price: 280000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, weight: 5 }),

            // ----- سایر توپ‌ها (۱۰ عدد) -----
            new Ball({ name: 'توپ پینگ پنگ ۷ ستاره', price: 30000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.PING_PONG, size: 1, material: BallMaterial.PVC, sport: 'پینگ پنگ' }),
            new Ball({ name: 'توپ پینگ پنگ ۶ ستاره', price: 25000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.PING_PONG, size: 1, material: BallMaterial.PVC, sport: 'پینگ پنگ' }),
            new Ball({ name: 'توپ پینگ پنگ ۵ ستاره', price: 20000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.PING_PONG, size: 1, material: BallMaterial.PVC, sport: 'پینگ پنگ' }),
            new Ball({ name: 'توپ تنیس خاکی', price: 167000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.TENNIS_BALL, size: 1, material: BallMaterial.RUBBER, sport: 'تنیس' }),
            new Ball({ name: 'توپ تنیس خاکی معمولی', price: 106000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.TENNIS_BALL, size: 1, material: BallMaterial.RUBBER, sport: 'تنیس' }),
            new Ball({ name: 'توپ تزیینی لیزری', price: 85000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.DECORATIVE, size: 1, material: BallMaterial.PVC, sport: 'تزیینی' }),
            new Ball({ name: 'توپ لیزی', price: 150000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.DECORATIVE, size: 1, material: BallMaterial.PVC, sport: 'تزیینی' }),
            new Ball({ name: 'توپ تنیس ۳ تایی', price: 88000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.TENNIS_BALL, size: 1, material: BallMaterial.RUBBER, sport: 'تنیس' }),
            new Ball({ name: 'توپ تنیس طلقی ۳ تایی', price: 190000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.TENNIS_BALL, size: 1, material: BallMaterial.RUBBER, sport: 'تنیس' }),
            new Ball({ name: 'توپ تنیس طلقی ۴ تایی', price: 220000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.TENNIS_BALL, size: 1, material: BallMaterial.RUBBER, sport: 'تنیس' }),
        ];

        // ================================================================
        //  دسته‌بندی: کفش ورزشی (۶۰ محصول)
        // ================================================================
        const shoes = [
            // کفش فوتبال (۲۰ عدد)
            new FootballShoe({ name: 'کفش فوتبال نایک و آدیداس', price: 1350000, stockStatus: StockStatus.AVAILABLE, brand: Brand.NIKE }),
            new FootballShoe({ name: 'کفش یاس چمن مصنوعی', price: 1480000, stockStatus: StockStatus.AVAILABLE, brand: Brand.YAS }),
            new FootballShoe({ name: 'کفش سالنی گامپو', price: 370000, stockStatus: StockStatus.AVAILABLE, brand: Brand.GAMPO }),
            new FootballShoe({ name: 'کفش مجیستا', price: 1200000, stockStatus: StockStatus.AVAILABLE, brand: Brand.MAGISTA }),
            new FootballShoe({ name: 'کفش سالنی یاس میانه', price: 719000, stockStatus: StockStatus.AVAILABLE, brand: Brand.YAS }),
            new FootballShoe({ name: 'کفش فوتسال یوز', price: 500000, stockStatus: StockStatus.AVAILABLE, brand: Brand.YUZ }),
            new FootballShoe({ name: 'کفش فوتبال نایک و آدیداس (جدید)', price: 1350000, stockStatus: StockStatus.AVAILABLE, brand: Brand.NIKE }),
            new FootballShoe({ name: 'کفش یاس چمن مصنوعی (جدید)', price: 1480000, stockStatus: StockStatus.AVAILABLE, brand: Brand.YAS }),
            new FootballShoe({ name: 'کفش سالنی گامپو (جدید)', price: 370000, stockStatus: StockStatus.AVAILABLE, brand: Brand.GAMPO }),
            new FootballShoe({ name: 'کفش فوتبال آدیداس غزال', price: 1250000, stockStatus: StockStatus.AVAILABLE, brand: Brand.ADIDAS }),
            new FootballShoe({ name: 'کفش فوتبال نایک تایمپو', price: 1150000, stockStatus: StockStatus.AVAILABLE, brand: Brand.NIKE }),
            new FootballShoe({ name: 'کفش فوتبال پوما اورا', price: 1050000, stockStatus: StockStatus.AVAILABLE, brand: Brand.PUMA }),
            new FootballShoe({ name: 'کفش فوتبال آدیداس کوبرا', price: 1450000, stockStatus: StockStatus.AVAILABLE, brand: Brand.ADIDAS }),
            new FootballShoe({ name: 'کفش فوتبال نایک تایمپو (جدید)', price: 1150000, stockStatus: StockStatus.AVAILABLE, brand: Brand.NIKE }),
            new FootballShoe({ name: 'کفش فوتبال پوما اورا (جدید)', price: 1050000, stockStatus: StockStatus.AVAILABLE, brand: Brand.PUMA }),
            new FootballShoe({ name: 'کفش فوتسال یوز (جدید)', price: 500000, stockStatus: StockStatus.AVAILABLE, brand: Brand.YUZ }),
            new FootballShoe({ name: 'کفش سالنی یاس میانه (جدید)', price: 719000, stockStatus: StockStatus.AVAILABLE, brand: Brand.YAS }),

            // کفش والیبال (۱۰ عدد)
            new VolleyballShoe({ name: 'کفش والیبال آف ایران واسیکس', price: 512000, stockStatus: StockStatus.AVAILABLE, brand: Brand.ASICS }),
            new VolleyballShoe({ name: 'کفش والیبال اسیکس خارجی', price: 2300000, stockStatus: StockStatus.LIMITED, brand: Brand.ASICS }),
            new VolleyballShoe({ name: 'کفش والیبال آف ایران واسیکس (جدید)', price: 512000, stockStatus: StockStatus.AVAILABLE, brand: Brand.ASICS }),
            new VolleyballShoe({ name: 'کفش والیبال اسیکس خارجی (جدید)', price: 2300000, stockStatus: StockStatus.LIMITED, brand: Brand.ASICS }),
            new VolleyballShoe({ name: 'کفش والیبال آف ایران واسیکس سایز ۴۰', price: 512000, stockStatus: StockStatus.AVAILABLE, brand: Brand.ASICS }),
            new VolleyballShoe({ name: 'کفش والیبال آف ایران واسیکس سایز ۴۱', price: 512000, stockStatus: StockStatus.AVAILABLE, brand: Brand.ASICS }),
            new VolleyballShoe({ name: 'کفش والیبال آف ایران واسیکس سایز ۴۲', price: 512000, stockStatus: StockStatus.AVAILABLE, brand: Brand.ASICS }),
            new VolleyballShoe({ name: 'کفش والیبال آف ایران واسیکس سایز ۴۳', price: 512000, stockStatus: StockStatus.AVAILABLE, brand: Brand.ASICS }),
            new VolleyballShoe({ name: 'کفش والیبال آف ایران واسیکس سایز ۴۴', price: 512000, stockStatus: StockStatus.AVAILABLE, brand: Brand.ASICS }),
            new VolleyballShoe({ name: 'کفش والیبال آف ایران واسیکس سایز ۴۵', price: 512000, stockStatus: StockStatus.AVAILABLE, brand: Brand.ASICS }),

            // کفش کشتی (۱۰ عدد)
            new WrestlingShoe({ name: 'کفش کشتی گلادیاتور مردانه', price: 846000, stockStatus: StockStatus.AVAILABLE, brand: Brand.GLADIATOR }),
            new WrestlingShoe({ name: 'کفش کشتی گلادیاتور پسرانه', price: 200000, stockStatus: StockStatus.AVAILABLE, brand: Brand.GLADIATOR }),
            new WrestlingShoe({ name: 'کفش کشتی اسیکیس ایرانی', price: 1354000, stockStatus: StockStatus.AVAILABLE, brand: Brand.ASICS }),
            new WrestlingShoe({ name: 'کفش کشتی گلادیاتور مردانه (جدید)', price: 846000, stockStatus: StockStatus.AVAILABLE, brand: Brand.GLADIATOR }),
            new WrestlingShoe({ name: 'کفش کشتی گلادیاتور پسرانه (جدید)', price: 200000, stockStatus: StockStatus.AVAILABLE, brand: Brand.GLADIATOR }),
            new WrestlingShoe({ name: 'کفش کشتی اسیکیس ایرانی (جدید)', price: 1354000, stockStatus: StockStatus.AVAILABLE, brand: Brand.ASICS }),
            new WrestlingShoe({ name: 'کفش کشتی گلادیاتور مردانه سایز ۴۰', price: 846000, stockStatus: StockStatus.AVAILABLE, brand: Brand.GLADIATOR }),
            new WrestlingShoe({ name: 'کفش کشتی گلادیاتور مردانه سایز ۴۱', price: 846000, stockStatus: StockStatus.AVAILABLE, brand: Brand.GLADIATOR }),
            new WrestlingShoe({ name: 'کفش کشتی گلادیاتور مردانه سایز ۴۲', price: 846000, stockStatus: StockStatus.AVAILABLE, brand: Brand.GLADIATOR }),
            new WrestlingShoe({ name: 'کفش کشتی گلادیاتور مردانه سایز ۴۳', price: 846000, stockStatus: StockStatus.AVAILABLE, brand: Brand.GLADIATOR }),

            // کفش ورزشی عمومی (۲۰ عدد)
            new SportsShoe({ name: 'کفش استوک پریما', price: 4100000, stockStatus: StockStatus.LIMITED, brand: Brand.PRIMA }),
            new SportsShoe({ name: 'کفش پیاده روی وویسا', price: 380000, stockStatus: StockStatus.AVAILABLE, brand: Brand.VISA }),
            new SportsShoe({ name: 'کفش تک سام', price: 225000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN }),
            new SportsShoe({ name: 'کفش یاس استوک ۳۶۰', price: 1250000, stockStatus: StockStatus.AVAILABLE, brand: Brand.YAS }),
            new SportsShoe({ name: 'کفش یاس سالن مردانه', price: 1470000, stockStatus: StockStatus.AVAILABLE, brand: Brand.YAS }),
            new SportsShoe({ name: 'کفش یاس ساق دار', price: 939000, stockStatus: StockStatus.AVAILABLE, brand: Brand.YAS }),
            new SportsShoe({ name: 'کفش استوک پریما (جدید)', price: 4100000, stockStatus: StockStatus.LIMITED, brand: Brand.PRIMA }),
            new SportsShoe({ name: 'کفش پیاده روی وویسا (جدید)', price: 380000, stockStatus: StockStatus.AVAILABLE, brand: Brand.VISA }),
            new SportsShoe({ name: 'کفش تک سام (جدید)', price: 225000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN }),
            new SportsShoe({ name: 'کفش یاس استوک ۳۶۰ (جدید)', price: 1250000, stockStatus: StockStatus.AVAILABLE, brand: Brand.YAS }),
            new SportsShoe({ name: 'کفش یاس سالن مردانه (جدید)', price: 1470000, stockStatus: StockStatus.AVAILABLE, brand: Brand.YAS }),
            new SportsShoe({ name: 'کفش یاس ساق دار (جدید)', price: 939000, stockStatus: StockStatus.AVAILABLE, brand: Brand.YAS }),
            new SportsShoe({ name: 'کفش پیاده روی وویسا سایز ۴۰', price: 380000, stockStatus: StockStatus.AVAILABLE, brand: Brand.VISA }),
            new SportsShoe({ name: 'کفش پیاده روی وویسا سایز ۴۱', price: 380000, stockStatus: StockStatus.AVAILABLE, brand: Brand.VISA }),
            new SportsShoe({ name: 'کفش پیاده روی وویسا سایز ۴۲', price: 380000, stockStatus: StockStatus.AVAILABLE, brand: Brand.VISA }),
            new SportsShoe({ name: 'کفش پیاده روی وویسا سایز ۴۳', price: 380000, stockStatus: StockStatus.AVAILABLE, brand: Brand.VISA }),
            new SportsShoe({ name: 'کفش پیاده روی وویسا سایز ۴۴', price: 380000, stockStatus: StockStatus.AVAILABLE, brand: Brand.VISA }),
            new SportsShoe({ name: 'کفش پیاده روی وویسا سایز ۴۵', price: 380000, stockStatus: StockStatus.AVAILABLE, brand: Brand.VISA }),
        ];

        // ================================================================
        //  دسته‌بندی: پوشاک ورزشی (۱۰۰+ محصول)
        // ================================================================
        const clothing = [
            // ----- لباس رزمی (۲۰ عدد) -----
            new MartialArtsUniform({ name: 'لباس کاراته و تکواندو پسرانه', price: 600000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.KIDS }),
            new MartialArtsUniform({ name: 'لباس کاراته و تکواندو مردانه', price: 700000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.MEN }),
            new MartialArtsUniform({ name: 'لباس بوکسی', price: 539000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.MEN }),
            new MartialArtsUniform({ name: 'کلاه تکواندو تزریقی خارجی', price: 1450000, stockStatus: StockStatus.LIMITED, brand: Brand.IMPORTED, gender: Gender.UNISEX }),
            new MartialArtsUniform({ name: 'کلاه تکواندو تزریقی ایرانی', price: 385000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.UNISEX }),
            new MartialArtsUniform({ name: 'لباس کاراته و تکواندو پسرانه (جدید)', price: 600000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.KIDS }),
            new MartialArtsUniform({ name: 'لباس بوکسی (جدید)', price: 539000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.MEN }),
            new MartialArtsUniform({ name: 'لباس کاراته و تکواندو نوجوانان', price: 550000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.KIDS }),
            new MartialArtsUniform({ name: 'لباس کاراته و تکواندو بزرگسال', price: 750000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.MEN }),
            new MartialArtsUniform({ name: 'لباس جودو', price: 800000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.UNISEX }),
            new MartialArtsUniform({ name: 'لباس جودو (جدید)', price: 800000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.UNISEX }),

            // ----- لباس شنا (۳۰ عدد) -----
            new Swimsuit({ name: 'مایو اسلامی', price: 395000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.WOMEN, type: 'اسلامی' }),
            new Swimsuit({ name: 'مایو استخری چهارخانه', price: 129000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.WOMEN, type: 'یک تیکه' }),
            new Swimsuit({ name: 'مایو سانتانا', price: 85000, stockStatus: StockStatus.AVAILABLE, brand: Brand.SANTANA, gender: Gender.WOMEN, type: 'یک تیکه' }),
            new Swimsuit({ name: 'مایو دامن دار زنانه', price: 420000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.WOMEN, type: 'دامن دار' }),
            new Swimsuit({ name: 'مایو دامن دار سه تیکه دخترانه', price: 127000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.KIDS, type: 'دامن دار' }),
            new Swimsuit({ name: 'مایو پا دار زنانه لارج', price: 270000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.WOMEN, type: 'پا دار' }),
            new Swimsuit({ name: 'مایو مردانه تک خط', price: 185000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.MEN, type: 'تک خط' }),
            new Swimsuit({ name: 'مایو فوالد', price: 290000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.MEN, type: 'تک خط' }),
            new Swimsuit({ name: 'مایو مردانه لانگ', price: 300000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.MEN, type: 'لانگ' }),
            new Swimsuit({ name: 'مایو دخترانه قهرمانی', price: 125000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.WOMEN, type: 'یک تیکه' }),
            new Swimsuit({ name: 'مایو دخترانه تمام چاپ', price: 165000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.WOMEN, type: 'یک تیکه' }),
            new Swimsuit({ name: 'مایو اسلامی (جدید)', price: 395000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.WOMEN, type: 'اسلامی' }),
            new Swimsuit({ name: 'مایو دامن دار زنانه (جدید)', price: 420000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.WOMEN, type: 'دامن دار' }),
            new Swimsuit({ name: 'مایو مردانه تک خط (جدید)', price: 185000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.MEN, type: 'تک خط' }),
            new Swimsuit({ name: 'مایو دخترانه قهرمانی (جدید)', price: 125000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.WOMEN, type: 'یک تیکه' }),
            new Swimsuit({ name: 'مایو دامن دار سه تیکه زنانه', price: 160000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.WOMEN, type: 'دامن دار' }),
            new Swimsuit({ name: 'مایو سه تیکه شلوارک', price: 145000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.UNISEX, type: 'دو تیکه' }),
            new Swimsuit({ name: 'مایو اسلیپ دخترانه', price: 90000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.WOMEN, type: 'یک تیکه' }),
            new Swimsuit({ name: 'مایو پسرانه (۳-۲-۱)', price: 142000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.KIDS, type: 'تک خط' }),
            new Swimsuit({ name: 'مایو دخترانه (۴-۳-۲-۱)', price: 320000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.KIDS, type: 'یک تیکه' }),

            // ----- شلوار و تی شرت (۳۰ عدد) -----
            new Clothing({ name: 'شلوار آدیداس و نایک غواصی', price: 250000, stockStatus: StockStatus.AVAILABLE, brand: Brand.ADIDAS, category: Category.CLOTHING, gender: Gender.UNISEX }),
            new Short({ name: 'شلوارک ایرو', price: 150000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.MEN }),
            new Short({ name: 'شلوارک غواصی', price: 440000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.MEN }),
            new Short({ name: 'شلوارک کشاله دار', price: 400000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.UNISEX }),
            new Short({ name: 'شلوارک ایرو (جدید)', price: 150000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.MEN }),
            new Short({ name: 'شلوارک غواصی (جدید)', price: 440000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.MEN }),
            new Short({ name: 'شلوارک کشاله دار (جدید)', price: 400000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.UNISEX }),
            new Short({ name: 'ست حلقه ای شلوارک مردانه', price: 175000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.MEN }),
            new Shirt({ name: 'تی شرت سه دکمه', price: 170000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.MEN }),
            new Shirt({ name: 'تی شرت ایرو', price: 650000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.UNISEX }),
            new Shirt({ name: 'تی شرت انگشتی', price: 110000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.UNISEX }),
            new Shirt({ name: 'تی شرت هتلی', price: 668000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.UNISEX }),
            new Shirt({ name: 'تی شرت سه دکمه (جدید)', price: 170000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.MEN }),
            new Shirt({ name: 'تی شرت ایرو (جدید)', price: 650000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.UNISEX }),
            new Shirt({ name: 'تی شرت انگشتی (جدید)', price: 110000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.UNISEX }),
            new Shirt({ name: 'تی شرت آستین کوتاه یقه گرد', price: 185000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.UNISEX }),
            new Shirt({ name: 'تی شرت نیم زیب', price: 195000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.UNISEX }),
            new Shirt({ name: 'تی شرت انگشتی (جدید۲)', price: 270000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, gender: Gender.UNISEX }),
            new Clothing({ name: 'کراپ شلوارک زنانه', price: 285000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.CLOTHING, gender: Gender.WOMEN }),
            new Clothing({ name: 'شلوار لگ زنانه', price: 300000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.CLOTHING, gender: Gender.WOMEN }),
            new Clothing({ name: 'شلوار استرج رکابی', price: 88000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.CLOTHING, gender: Gender.WOMEN }),

            // ----- مانتو و پیراهن (۱۵ عدد) -----
            new Clothing({ name: 'مانتو شلوار اسکیس ورزشی', price: 950000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.CLOTHING, gender: Gender.WOMEN }),
            new Clothing({ name: 'پیراهن شورت باشگاهی', price: 290000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.CLOTHING, gender: Gender.MEN }),
            new Clothing({ name: 'پیراهن شورت ورزشی تایلندی', price: 860000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.CLOTHING, gender: Gender.MEN }),
            new Clothing({ name: 'پیراهن شورت باشگاهی ایرانی', price: 170000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.CLOTHING, gender: Gender.MEN }),
            new Clothing({ name: 'پیراهن شورت ژاپن', price: 650000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.CLOTHING, gender: Gender.UNISEX }),
            new Clothing({ name: 'پیراهن شورت تیمی بزرگسال', price: 137000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.CLOTHING, gender: Gender.MEN }),
            new Clothing({ name: 'پیراهن شورت تیمی پسرانه', price: 230000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.CLOTHING, gender: Gender.KIDS }),
            new Clothing({ name: 'پیراهن شورت باشگاهی (جدید)', price: 290000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.CLOTHING, gender: Gender.MEN }),
            new Clothing({ name: 'پیراهن شورت ورزشی تایلندی (جدید)', price: 860000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.CLOTHING, gender: Gender.MEN }),

            // ----- لباس ژیم (۵ عدد) -----
            new Clothing({ name: 'لباس ژیم', price: 200000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.CLOTHING, gender: Gender.UNISEX }),
            new Clothing({ name: 'لباس ژیم دخترانه و پسرانه', price: 165000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.CLOTHING, gender: Gender.KIDS }),
            new Clothing({ name: 'لباس ژیم (جدید)', price: 200000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.CLOTHING, gender: Gender.UNISEX }),
            new Clothing({ name: 'لباس ژیم دخترانه و پسرانه (جدید)', price: 165000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.CLOTHING, gender: Gender.KIDS }),

            // ----- کاپشن و شلوار (۱۰ عدد) -----
            new Clothing({ name: 'کاپشن شلوار درفش', price: 260000, stockStatus: StockStatus.AVAILABLE, brand: Brand.DERAFSH, category: Category.CLOTHING, gender: Gender.UNISEX }),
            new Clothing({ name: 'کاپشن شلوار فیلا', price: 1560000, stockStatus: StockStatus.LIMITED, brand: Brand.FILA, category: Category.CLOTHING, gender: Gender.UNISEX }),
            new Clothing({ name: 'کاپشن شلوار سانتانا', price: 1600000, stockStatus: StockStatus.LIMITED, brand: Brand.SANTANA, category: Category.CLOTHING, gender: Gender.UNISEX }),
            new Clothing({ name: 'کاپشن شلوار سانتانا ماراتن', price: 880000, stockStatus: StockStatus.AVAILABLE, brand: Brand.SANTANA, category: Category.CLOTHING, gender: Gender.UNISEX }),
            new Clothing({ name: 'کاپشن شلوار ایتالیا', price: 610000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.CLOTHING, gender: Gender.UNISEX }),
            new Clothing({ name: 'کاپشن شلوار درفش (جدید)', price: 260000, stockStatus: StockStatus.AVAILABLE, brand: Brand.DERAFSH, category: Category.CLOTHING, gender: Gender.UNISEX }),
            new Clothing({ name: 'کاپشن شلوار فیلا (جدید)', price: 1560000, stockStatus: StockStatus.LIMITED, brand: Brand.FILA, category: Category.CLOTHING, gender: Gender.UNISEX }),
            new Clothing({ name: 'کاپشن شلوار سانتانا (جدید)', price: 1600000, stockStatus: StockStatus.LIMITED, brand: Brand.SANTANA, category: Category.CLOTHING, gender: Gender.UNISEX }),
            new Clothing({ name: 'کاپشن شلوار سانتانا ماراتن (جدید)', price: 880000, stockStatus: StockStatus.AVAILABLE, brand: Brand.SANTANA, category: Category.CLOTHING, gender: Gender.UNISEX }),
            new Clothing({ name: 'کاپشن شلوار ایتالیا (جدید)', price: 610000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.CLOTHING, gender: Gender.UNISEX }),

            // ----- جوراب (۲۰ عدد) -----
            new Socks({ name: 'جوراب ساق بلند تمام کش', price: 140000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, type: 'ساق بلند' }),
            new Socks({ name: 'جوراب والیبال', price: 69000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, type: 'ورزشی' }),
            new Socks({ name: 'جوراب پیلاتس', price: 150000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, type: 'پیلاتس' }),
            new Socks({ name: 'جوراب یوگا', price: 228000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, type: 'یوگا' }),
            new Socks({ name: 'جوراب ساق بلند تمام کش (جدید)', price: 140000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, type: 'ساق بلند' }),
            new Socks({ name: 'جوراب والیبال (جدید)', price: 69000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, type: 'ورزشی' }),
            new Socks({ name: 'جوراب پیلاتس (جدید)', price: 150000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, type: 'پیلاتس' }),
            new Socks({ name: 'جوراب یوگا (جدید)', price: 228000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, type: 'یوگا' }),
            new Socks({ name: 'جوراب استپ دار اعلا', price: 165000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, type: 'ورزشی' }),
            new Socks({ name: 'جوراب استپ دار معمولی', price: 85000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, type: 'ورزشی' }),
            new Socks({ name: 'جوراب تمام کش پسرانه', price: 130000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, type: 'ساق بلند' }),
            new Socks({ name: 'جوراب نفلی', price: 34000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, type: 'ورزشی' }),
            new Socks({ name: 'جوراب استپ دار اعلا (جدید)', price: 165000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, type: 'ورزشی' }),
            new Socks({ name: 'جوراب استپ دار معمولی (جدید)', price: 85000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, type: 'ورزشی' }),

            // ----- سایر پوشاک (۱۰ عدد) -----
            new Clothing({ name: 'گوشی دماغی معمولی', price: 29000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.SWIMMING, gender: Gender.UNISEX }),
            new Clothing({ name: 'عینک شنا کیفی معمولی', price: 48000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.SWIMMING, gender: Gender.UNISEX }),
            new Clothing({ name: 'کلاه شنا پفکی', price: 620000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.SWIMMING, gender: Gender.UNISEX }),
            new Clothing({ name: 'کلاه شنا پارچه ای', price: 620000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.SWIMMING, gender: Gender.UNISEX }),
            new Clothing({ name: 'کلاه شنا سیلیکونی', price: 130000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.SWIMMING, gender: Gender.UNISEX }),
            new Clothing({ name: 'کلاه شنا پفکی ضخیم', price: 140000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.SWIMMING, gender: Gender.UNISEX }),
            new Clothing({ name: 'کلاه شنا استرج ایرانی', price: 13000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.SWIMMING, gender: Gender.UNISEX }),
            new Clothing({ name: 'کلاه شنا پفکی (جدید)', price: 620000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.SWIMMING, gender: Gender.UNISEX }),
            new Clothing({ name: 'کلاه شنا سیلیکونی (جدید)', price: 130000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.SWIMMING, gender: Gender.UNISEX }),
            new Clothing({ name: 'کلاه شنا استرج ایرانی (جدید)', price: 13000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.SWIMMING, gender: Gender.UNISEX }),
        ];

        // ================================================================
        //  دسته‌بندی: تجهیزات بدنسازی (۱۰۰+ محصول)
        // ================================================================
        const fitness = [
            // ----- بارفیکس (۱۵ عدد) -----
            new PullUpBar({ name: 'بارفیکس تک لول', price: 270000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, type: 'تک لول' }),
            new PullUpBar({ name: 'بارفیکس دو لول', price: 360000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, type: 'دو لول' }),
            new PullUpBar({ name: 'بارفیکس سه لول', price: 650000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, type: 'سه لول' }),
            new PullUpBar({ name: 'بارفیکس تن زیپ', price: 1275000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, type: 'تن زیپ' }),
            new PullUpBar({ name: 'بارفیکس دو لول معمولی', price: 150000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, type: 'دو لول' }),
            new PullUpBar({ name: 'بارفیکس تک لول (جدید)', price: 270000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, type: 'تک لول' }),
            new PullUpBar({ name: 'بارفیکس سه لول (جدید)', price: 650000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, type: 'سه لول' }),
            new PullUpBar({ name: 'بارفیکس تن زیپ (جدید)', price: 1275000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, type: 'تن زیپ' }),
            new PullUpBar({ name: 'بارفیکس چهار لول', price: 780000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, type: 'چهار لول' }),
            new PullUpBar({ name: 'بارفیکس پنج لول', price: 890000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, type: 'پنج لول' }),

            // ----- کش (۴۰ عدد) -----
            new ResistanceBand({ name: 'کش پاور باند ۱۳ میل', price: 170000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, resistance: 'سنگین', type: 'متری', length: 13 }),
            new ResistanceBand({ name: 'کش پاور باند ۲۲ میل مشکی', price: 290000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, resistance: 'سنگین', type: 'متری', length: 22 }),
            new ResistanceBand({ name: 'کش پاور ۴۵', price: 570000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, resistance: 'سنگین', type: 'متری', length: 45 }),
            new ResistanceBand({ name: 'کش پاور متری', price: 350000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, resistance: 'متوسط', type: 'متری', length: 200 }),
            new ResistanceBand({ name: 'کش لوله ای', price: 240000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, resistance: 'متوسط', type: 'لوله‌ای', length: 200 }),
            new ResistanceBand({ name: 'کش لوپ پارچه ای', price: 90000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, resistance: 'سبک', type: 'لوپ', length: 50 }),
            new ResistanceBand({ name: 'کش بدنسازی همراه قوی', price: 112000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, resistance: 'سنگین', type: 'لوپ', length: 60 }),
            new ResistanceBand({ name: 'کش پیلاتس', price: 190000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, resistance: 'متوسط', type: 'لوپ', length: 50 }),
            new ResistanceBand({ name: 'کش پاور ۶۳', price: 700000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, resistance: 'سنگین', type: 'متری', length: 63 }),
            new ResistanceBand({ name: 'کش مو باریک', price: 5500, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, resistance: 'سبک', type: 'لوپ', length: 10 }),
            new ResistanceBand({ name: 'کش مو پهن', price: 8400, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, resistance: 'سبک', type: 'لوپ', length: 10 }),
            new ResistanceBand({ name: 'کش لوپ پارچه ای قرمز', price: 63000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, resistance: 'سبک', type: 'لوپ', length: 50 }),
            new ResistanceBand({ name: 'کش بدنسازی همراه با نوار', price: 85000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, resistance: 'متوسط', type: 'لوپ', length: 60 }),
            new ResistanceBand({ name: 'کش بدنسازی همراه صادراتی', price: 110000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, resistance: 'متوسط', type: 'لوپ', length: 60 }),
            new ResistanceBand({ name: 'کش بدنسازی همراه آقایان', price: 95000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, resistance: 'متوسط', type: 'لوپ', length: 60 }),
            new ResistanceBand({ name: 'کش پیلاتس ترمز دار', price: 175000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, resistance: 'متوسط', type: 'لوپ', length: 50 }),
            new ResistanceBand({ name: 'کش پا تکواندو', price: 70000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, resistance: 'سبک', type: 'لوپ', length: 50 }),
            new ResistanceBand({ name: 'کش متری', price: 240000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, resistance: 'متوسط', type: 'متری', length: 200 }),
            new ResistanceBand({ name: 'کش مینی لوپ رنگی و مشکی', price: 21000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, resistance: 'سبک', type: 'لوپ', length: 30 }),
            new ResistanceBand({ name: 'کش پاور بنفش ۳۲۴', price: 15000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, resistance: 'سبک', type: 'لوپ', length: 20 }),
            new ResistanceBand({ name: 'کش تراباند سبز', price: 300000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, resistance: 'سنگین', type: 'لوپ', length: 60 }),
            new ResistanceBand({ name: 'کش بدنسازی با نوار (جدید)', price: 230000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, resistance: 'متوسط', type: 'لوپ', length: 60 }),
            new ResistanceBand({ name: 'کش پاور باند ۱۰ میل', price: 120000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, resistance: 'متوسط', type: 'متری', length: 10 }),
            new ResistanceBand({ name: 'کش پاور باند ۱۵ میل', price: 200000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, resistance: 'سنگین', type: 'متری', length: 15 }),
            new ResistanceBand({ name: 'کش پاور باند ۲۰ میل', price: 260000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, resistance: 'سنگین', type: 'متری', length: 20 }),
            new ResistanceBand({ name: 'کش پاور باند ۳۰ میل', price: 350000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, resistance: 'سنگین', type: 'متری', length: 30 }),
            new ResistanceBand({ name: 'کش پاور باند ۴۰ میل', price: 450000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, resistance: 'سنگین', type: 'متری', length: 40 }),

            // ----- مت یوگا (۲۰ عدد) -----
            new YogaMat({ name: 'مت یوگا ۶ میل ایرانی', price: 224000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, thickness: 6, length: 183, width: 61 }),
            new YogaMat({ name: 'مت یوگا حوله ای', price: 440000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, thickness: 0.5, length: 183, width: 61, type: 'حوله‌ای' }),
            new YogaMat({ name: 'مت تاشو الکس', price: 1400000, stockStatus: StockStatus.LIMITED, brand: Brand.ALEX, thickness: 1.5, length: 183, width: 61, type: 'تاشو' }),
            new YogaMat({ name: 'مت الکس', price: 1150000, stockStatus: StockStatus.AVAILABLE, brand: Brand.ALEX, thickness: 2, length: 183, width: 61 }),
            new YogaMat({ name: 'مت تا شو', price: 426000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, thickness: 1, length: 183, width: 61, type: 'تاشو' }),
            new YogaMat({ name: 'مت حوله ای', price: 950000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, thickness: 0.5, length: 183, width: 61, type: 'حوله‌ای' }),
            new YogaMat({ name: 'مت خارجی الکس', price: 55000, stockStatus: StockStatus.AVAILABLE, brand: Brand.ALEX, thickness: 1, length: 183, width: 61 }),
            new YogaMat({ name: 'کاور مت', price: 18000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, thickness: 0.1, length: 183, width: 61, type: 'کاور' }),
            new YogaMat({ name: 'مت یوگا ۶ میل ایرانی (جدید)', price: 224000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, thickness: 6, length: 183, width: 61 }),
            new YogaMat({ name: 'مت یوگا ۸ میل', price: 280000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, thickness: 8, length: 183, width: 61 }),
            new YogaMat({ name: 'مت یوگا ۱۰ میل', price: 350000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, thickness: 10, length: 183, width: 61 }),
            new YogaMat({ name: 'مت یوگا ۱۲ میل', price: 400000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, thickness: 12, length: 183, width: 61 }),
            new YogaMat({ name: 'مت یوگا حوله ای (جدید)', price: 440000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, thickness: 0.5, length: 183, width: 61, type: 'حوله‌ای' }),
            new YogaMat({ name: 'مت تاشو الکس (جدید)', price: 1400000, stockStatus: StockStatus.LIMITED, brand: Brand.ALEX, thickness: 1.5, length: 183, width: 61, type: 'تاشو' }),
            new YogaMat({ name: 'مت الکس (جدید)', price: 1150000, stockStatus: StockStatus.AVAILABLE, brand: Brand.ALEX, thickness: 2, length: 183, width: 61 }),
            new YogaMat({ name: 'مت تا شو (جدید)', price: 426000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, thickness: 1, length: 183, width: 61, type: 'تاشو' }),

            // ----- هالتر و میله (۱۵ عدد) -----
            new Barbell({ name: 'میله هالتر ۱۲۰ سانت', price: 300000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, length: 120, weight: 10 }),
            new Barbell({ name: 'میله هالتر ۱۵۰ سانت', price: 340000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, length: 150, weight: 12 }),
            new Barbell({ name: 'میله ایرانی ۶ متر', price: 247000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, length: 600, weight: 8 }),
            new Barbell({ name: 'میله ایرانی ۸ متر', price: 284000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, length: 800, weight: 10 }),
            new Barbell({ name: 'میله خارجی تی پی ۶ متر', price: 400000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IMPORTED, length: 600, weight: 9 }),
            new Barbell({ name: 'میله کاور دار ۶ متر یوگا TPE', price: 1300000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, length: 600, weight: 6 }),
            new Barbell({ name: 'میله هالتر ۱۸۰ سانت', price: 400000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, length: 180, weight: 14 }),
            new Barbell({ name: 'میله هالتر ۲۰۰ سانت', price: 450000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, length: 200, weight: 16 }),
            new Barbell({ name: 'میله هالتر المپیک', price: 800000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, length: 220, weight: 20, type: 'المپیک' }),
            new Barbell({ name: 'میله هالتر ۱۲۰ سانت (جدید)', price: 300000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, length: 120, weight: 10 }),
            new Barbell({ name: 'میله هالتر ۱۵۰ سانت (جدید)', price: 340000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, length: 150, weight: 12 }),

            // ----- تجهیزات دیگر (۳۰ عدد) -----
            new FitnessEquipment({ name: 'تردمیل خانگی', price: 18500000, stockStatus: StockStatus.AVAILABLE, brand: Brand.SNOWA, category: Category.FITNESS, material: 'فولاد', weight: 80 }),
            new FitnessEquipment({ name: 'دوچرخه ثابت', price: 1500000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.FITNESS, material: 'فولاد', weight: 25 }),
            new FitnessEquipment({ name: 'رینگ پیلاتس ایرانی', price: 400000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.FITNESS, material: 'پلاستیک', weight: 1, isPortable: true }),
            new FitnessEquipment({ name: 'رینگ پیلاتس خارجی', price: 550000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IMPORTED, category: Category.FITNESS, material: 'پلاستیک', weight: 1, isPortable: true }),
            new FitnessEquipment({ name: 'پله چابکی ۳ متری ژله ای', price: 221000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.FITNESS, material: 'پلاستیک', weight: 2, isPortable: true }),
            new FitnessEquipment({ name: 'پله چابکی ۴ متری', price: 266000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.FITNESS, material: 'پلاستیک', weight: 2.5, isPortable: true }),
            new FitnessEquipment({ name: 'پله چابکی ۵ متری', price: 311000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.FITNESS, material: 'پلاستیک', weight: 3, isPortable: true }),
            new FitnessEquipment({ name: 'پله چابکی متری دلفینی', price: 120000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.FITNESS, material: 'پلاستیک', weight: 1, isPortable: true }),
            new FitnessEquipment({ name: 'چرخونک تن ریپ', price: 175000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.FITNESS, material: 'فولاد', weight: 3, isPortable: true }),
            new FitnessEquipment({ name: 'چتر مقاومتی', price: 295000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.FITNESS, material: 'پارچه', weight: 0.5, isPortable: true }),
            new FitnessEquipment({ name: 'چتر مقاومتی (جدید)', price: 547000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.FITNESS, material: 'پارچه', weight: 0.5, isPortable: true }),
            new FitnessEquipment({ name: 'دیکس تعادل', price: 280000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.FITNESS, material: 'پلاستیک', weight: 1, isPortable: true }),
            new FitnessEquipment({ name: 'فوم رول ۴۵ سانتی خارجی', price: 950000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IMPORTED, category: Category.FITNESS, material: 'فوم', weight: 0.8, isPortable: true }),
            new FitnessEquipment({ name: 'فوم رول ۳۵ سانتی خارجی', price: 700000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IMPORTED, category: Category.FITNESS, material: 'فوم', weight: 0.6, isPortable: true }),
            new FitnessEquipment({ name: 'وزنه پا شنی ۱ کیلویی', price: 67000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.FITNESS, material: 'پارچه', weight: 1, isPortable: true }),
            new FitnessEquipment({ name: 'وزنه پا شنی ۲ کیلویی', price: 75000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.FITNESS, material: 'پارچه', weight: 2, isPortable: true }),
            new FitnessEquipment({ name: 'وزنه پا شنی ۱ کیلویی (جدید)', price: 67000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.FITNESS, material: 'پارچه', weight: 1, isPortable: true }),
            new FitnessEquipment({ name: 'وزنه دمبل و هالتر', price: 45500, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.FITNESS, material: 'چدن', weight: 1, isPortable: true }),
            new FitnessEquipment({ name: 'فوم رول ۳۰ سانتی', price: 500000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.FITNESS, material: 'فوم', weight: 0.5, isPortable: true }),
            new FitnessEquipment({ name: 'فوم رول ۶۰ سانتی', price: 1200000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IMPORTED, category: Category.FITNESS, material: 'فوم', weight: 1, isPortable: true }),
            new FitnessEquipment({ name: 'تخته تعادل (جدید)', price: 280000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.FITNESS, material: 'پلاستیک', weight: 1, isPortable: true }),
            new FitnessEquipment({ name: 'تخته انعطاف', price: 500000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.FITNESS, material: 'چوب', weight: 2, isPortable: true }),
            new FitnessEquipment({ name: 'تخته مربیگری', price: 300000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.FITNESS, material: 'پلاستیک', weight: 1, isPortable: true }),
        ];

        // ================================================================
//  دسته‌بندی: لوازم جانبی
// ================================================================
        const accessories = [
            // ----- دستکش‌ها (۱۵ عدد) -----
            { name: 'دستکش گلری پسرانه', price: 117000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.GLOVES },
            { name: 'دستکش گلری مردانه', price: 280000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.GLOVES },
            { name: 'دستکش گلری نوجوانان', price: 260000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.GLOVES },
            { name: 'دستکش گلری پسرانه اعلا', price: 175000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.GLOVES },
            { name: 'دستکش گلری پسرانه کف چینی', price: 185000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.GLOVES },
            { name: 'دستکش گلری جوانان نایک', price: 160000, stockStatus: StockStatus.AVAILABLE, brand: Brand.NAIK, category: Category.GLOVES },
            { name: 'دستکش بوکس فوم اعلا', price: 990000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.GLOVES },
            { name: 'دستکش کاراته', price: 150000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.GLOVES },
            { name: 'دستکش تکواندو', price: 150000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.GLOVES },
            { name: 'دستکش کونگفو', price: 150000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.GLOVES },
            { name: 'دستکش بدنسازی نیمه انگشتی چرمی', price: 125000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.GLOVES },
            { name: 'دستکش بافت', price: 75000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.GLOVES },
            { name: 'دستکش زمستانی بافت', price: 71000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.GLOVES },
            { name: 'دستکش بوکس چرم', price: 2106000, stockStatus: StockStatus.LIMITED, brand: Brand.IMPORTED, category: Category.GLOVES },

            // ----- بندها (۳۵ عدد) -----
            { name: 'زانو بند و آرنج بند شش تیکه', price: 140000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.BANDS },
            { name: 'زانو بند و ساق بند کبریتی', price: 36000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.BANDS },
            { name: 'زانو بند طبی ۷۰۸', price: 221000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.BANDS },
            { name: 'زانو بند اسکات گوریل', price: 266000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.BANDS },
            { name: 'زانو بند ایرانی', price: 175000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.BANDS },
            { name: 'زانو بند فرهاد', price: 79000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.BANDS },
            { name: 'زانو بند والیبال ال پی', price: 150000, stockStatus: StockStatus.AVAILABLE, brand: Brand.LP, category: Category.BANDS },
            { name: 'زانو بند ال پی بدنسازی ۱۷۰ سانتی', price: 185000, stockStatus: StockStatus.AVAILABLE, brand: Brand.LP, category: Category.BANDS },
            { name: 'مچ بند ال پی ساندیسی', price: 50000, stockStatus: StockStatus.AVAILABLE, brand: Brand.LP, category: Category.BANDS },
            { name: 'مچ بند ال پی اعلا', price: 34000, stockStatus: StockStatus.AVAILABLE, brand: Brand.LP, category: Category.BANDS },
            { name: 'مچ بند حوله ای باشگاهی', price: 52000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.BANDS },
            { name: 'آرنج بند طبی', price: 176000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.BANDS },
            { name: 'ساق بند و رویایی لاک پشتی', price: 560000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.BANDS },
            { name: 'ساق و رویایی سر هم', price: 123000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.BANDS },
            { name: 'ساق دست نخ اعلا', price: 110000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.BANDS },
            { name: 'ساق دست خارجی', price: 60000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IMPORTED, category: Category.BANDS },
            { name: 'ساق پا', price: 48000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.BANDS },
            { name: 'ساعدبند و ساق بند فوم رزمی', price: 150000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.BANDS },
            { name: 'بند لیفت قلاب دار', price: 230000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.BANDS },
            { name: 'بند لیفت خارجی', price: 223000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IMPORTED, category: Category.BANDS },
            { name: 'بند یوگا', price: 65000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.BANDS },
            { name: 'بند یوگا ۳ متری', price: 65000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.BANDS },
            { name: 'کمربند رزمی', price: 75000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.BANDS },
            { name: 'کمربند ۱۵ سانت ابری', price: 230000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.BANDS },
            { name: 'کمربند بدنسازی ۱۵ سانت پاور', price: 370000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.BANDS },
            { name: 'کمربند رویه چرم ۱۵ سانت تک لا', price: 510000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.BANDS },
            { name: 'کمربند بدنسازی فومی', price: 150000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.BANDS },
            { name: 'کمربند بدنسازی کپسولی فوم', price: 140000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.BANDS },
            { name: 'شکم بند تی اس', price: 160000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.BANDS },
            { name: 'قوز بند', price: 275000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.BANDS },
            { name: 'قلب بند نفلی طرح خارجی', price: 72000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IMPORTED, category: Category.BANDS },
            { name: 'قلب بند طرح خارجی جوانان', price: 95000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IMPORTED, category: Category.BANDS },

            // ----- سایر لوازم جانبی (۲۰ عدد) -----
            { name: 'مانع فوتبال ۱۸ سانتی', price: 9500, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.ACCESSORIES },
            { name: 'مانع فوتبال ۳۰ سانتی', price: 26500, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.ACCESSORIES },
            { name: 'مانع کنز', price: 23000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.ACCESSORIES },
            { name: 'مانع اسکیتی', price: 3100, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.ACCESSORIES },
            { name: 'مانع مثلثی', price: 327000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.ACCESSORIES },
            { name: 'چیپ کنز', price: 72000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.ACCESSORIES },
            { name: 'قلم بند فوتبالی مردانه ساده', price: 12000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.ACCESSORIES },
            { name: 'قلم بند نایک مردانه طرح خارجی', price: 105000, stockStatus: StockStatus.AVAILABLE, brand: Brand.NIKE, category: Category.ACCESSORIES },
            { name: 'قلم بند آف ۵۰ ساده', price: 9000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.ACCESSORIES },
            { name: 'قلم بند پسرانه موبایلی', price: 55000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.ACCESSORIES },
            { name: 'قلم بند مینی', price: 57000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.ACCESSORIES },
            { name: 'دست بند سیلیکونی', price: 30000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.ACCESSORIES },
            { name: 'بازوبند کاپیتانی طلقی', price: 47000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.ACCESSORIES },
            { name: 'بازوبند کاپیتانی وکیوم دار', price: 33000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.ACCESSORIES },
            { name: 'بازوبند شنا', price: 300000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.ACCESSORIES },
            { name: 'محافظ میله والیبال', price: 85000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.ACCESSORIES },
            { name: 'سوت فوکس', price: 89000, stockStatus: StockStatus.AVAILABLE, brand: Brand.FOX, category: Category.ACCESSORIES },
            { name: 'سوت فوکس حرفه ای', price: 90000, stockStatus: StockStatus.AVAILABLE, brand: Brand.FOX, category: Category.ACCESSORIES },
            { name: 'سوت فوکس ۴۰ انگشتی', price: 69000, stockStatus: StockStatus.AVAILABLE, brand: Brand.FOX, category: Category.ACCESSORIES },
            { name: 'سوت خارجی نایک', price: 295000, stockStatus: StockStatus.AVAILABLE, brand: Brand.NIKE, category: Category.ACCESSORIES },
            { name: 'کرنومتر پرو', price: 90000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.ACCESSORIES },
            { name: 'کرنومتر فلوت', price: 200000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.ACCESSORIES },
            { name: 'ترازوی دیجیتال', price: 480000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.ACCESSORIES },
            { name: 'ترازوی دیجیتال (جدید)', price: 295000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.ACCESSORIES },
            { name: 'شارژر تاگ', price: 23000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.ACCESSORIES },
            { name: 'تخته تعادل', price: 280000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.ACCESSORIES },
            { name: 'تخته انعطاف', price: 500000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.ACCESSORIES },
            { name: 'تخته مربیگری', price: 300000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.ACCESSORIES },
        ];

        // ================================================================
//  دسته‌بندی: تور و تجهیزات زمین
// ================================================================
        const nets = [
            { name: 'تور گیره انبری', price: 185000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.NETS },
            { name: 'تور گیره پیچی', price: 972000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.NETS },
            { name: 'تور هندبال ابریشمی', price: 1300000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.NETS },
            { name: 'تور والیبال ابریشمی', price: 650000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.NETS },
            { name: 'تور والیبال گلدکاپ', price: 580000, stockStatus: StockStatus.AVAILABLE, brand: Brand.GOLD_CUP, category: Category.NETS },
            { name: 'تور والیبال معمولی', price: 513000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.NETS },
            { name: 'تور بدمینتون ابریشمی', price: 778000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.NETS },
            { name: 'تور بدمینتون اعلا', price: 939000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.NETS },
            { name: 'تور فوتبال ابریشمی', price: 2000000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.NETS },
            { name: 'تور فوتبال نخ ۹۰۰', price: 993000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.NETS },
            { name: 'تور فوتبال نخ ۴۱۰', price: 410000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.NETS },
            { name: 'تور فوتسال نخ ۳۰۰۰', price: 1896000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.NETS },
            { name: 'تور فوتسال اعلا', price: 3800000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.NETS },
            { name: 'تور فوتبال نخ ۳۰۰۰ (جدید)', price: 4040000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.NETS },
            { name: 'تور فوتبال نخ ۹۰۰ (جدید)', price: 2217000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.NETS },
            { name: 'تور بسکتبال مارشال', price: 200000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.NETS },
            { name: 'تور بدمینتون ۸۰۰۰', price: 1741000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.NETS },
            { name: 'تور ۲*۲', price: 400000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.NETS },
            { name: 'تور ۳*۴', price: 960000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.NETS },
            { name: 'تور تزیینی ۳#', price: 720000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.NETS },
            { name: 'تور حمل توپ', price: 100000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.NETS },
            { name: 'تور باقی متری', price: 80000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.NETS },
            { name: 'تور گل کوچک', price: 95000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.NETS },
            { name: 'تور پینگ پنگ تکی', price: 162000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.NETS },
            { name: 'میله والیبال تلسکوپی', price: 2200000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.NETS },
            { name: 'پایه بدمینتون', price: 1500000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.NETS },
        ];

        // ================================================================
//  دسته‌بندی: راکت و توپ‌های کوچک
// ================================================================
        const rackets = [
            { name: 'راکت پینگ پنگ گلدکاپ خارجی', price: 125000, stockStatus: StockStatus.AVAILABLE, brand: Brand.GOLD_CUP, category: Category.RACKET },
            { name: 'راکت پینگ پنگ جفتی گلد گاپ', price: 160000, stockStatus: StockStatus.AVAILABLE, brand: Brand.GOLD_CUP, category: Category.RACKET },
            { name: 'راکت بدمینتون فوکسی', price: 450000, stockStatus: StockStatus.AVAILABLE, brand: Brand.FOX, category: Category.RACKET },
            { name: 'راکت بدمینتون یونیکس جفتی', price: 230000, stockStatus: StockStatus.AVAILABLE, brand: Brand.YONEX, category: Category.RACKET },
            { name: 'راکت تنیس', price: 200000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.RACKET },
            { name: 'راکت گلد کاپ کدکاپ', price: 90000, stockStatus: StockStatus.AVAILABLE, brand: Brand.GOLD_CUP, category: Category.RACKET },
            { name: 'راکت گلد کاپ ایرانی', price: 220000, stockStatus: StockStatus.AVAILABLE, brand: Brand.GOLD_CUP, category: Category.RACKET },
            { name: 'راکت فرانشیب ۷ ستاره', price: 210000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.RACKET },
            { name: 'توپ پینگ پنگ ۷ ستاره', price: 30000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.RACKET },
            { name: 'توپ تنیس ۳ تایی', price: 88000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.RACKET },
            { name: 'توپ تنیس طلقی ۳ تایی', price: 190000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.RACKET },
            { name: 'توپ تنیس خاکی', price: 167000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.RACKET },
            { name: 'توپ تنیس خاکی معمولی', price: 106000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.RACKET },
            { name: 'توپ بدمینتون یونیکس', price: 325000, stockStatus: StockStatus.AVAILABLE, brand: Brand.YONEX, category: Category.RACKET },
            { name: 'توپ بدمینتون ۳ تایی', price: 98000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.RACKET },
        ];

        // ================================================================
//  دسته‌بندی: متفرقه
// ================================================================
        const others = [
            // ----- مدال و جام (۱۰ عدد) -----
            { name: 'مدال همگانی', price: 150000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'مدال پرچمی', price: 150000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'مدال معمولی', price: 150000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'مدال خارجی', price: 24000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IMPORTED, category: Category.OTHER },
            { name: 'جام ورزشی خارجی', price: 6000000, stockStatus: StockStatus.LIMITED, brand: Brand.IMPORTED, category: Category.OTHER },
            { name: 'جام ورزشی ایرانی', price: 3500000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'جام ورزشی خارجی (جدید)', price: 2200000, stockStatus: StockStatus.LIMITED, brand: Brand.IMPORTED, category: Category.OTHER },
            { name: 'تندیس توپ طلا', price: 695000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'پرچم باشگاهی', price: 59000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },

            // ----- بطری و قمقمه (۱۵ عدد) -----
            { name: 'بطری آب ارتشی', price: 100000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'بطری آب پورنگ خارجی', price: 100000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IMPORTED, category: Category.OTHER },
            { name: 'بطری تاشو خارجی', price: 143000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IMPORTED, category: Category.OTHER },
            { name: 'بطری آب ورزشی', price: 21000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'بطری نارنجکی', price: 110000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'بطری خارجی', price: 282000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IMPORTED, category: Category.OTHER },
            { name: 'بطری ۱۶۱۰', price: 185000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'بطری سوپاپ دار مشکی', price: 55000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'بطری اسپری شو', price: 220000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'قمقمه شنا ۶ تایی', price: 120000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'قمقمه شنا ۸ تایی', price: 160000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },

            // ----- دارت (۱۰ عدد) -----
            { name: 'تیر دارت معمولی ۶ تایی', price: 150000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'تیر دارت سه تایی', price: 79000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'تیر دارت اصلی', price: 250000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'تیر دارت آهن ربایی ۳ تایی', price: 63000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'دارت مغناطیسی', price: 420000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'دارت سوزنی ۱۸۰۱۲', price: 748000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'دارت سوزنی کد ۱۸۰۱۲', price: 730000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'دارت سوزنی کد ۱۸۰۱۱', price: 2691000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },

            // ----- سایر متفرقه (۵۰ عدد) -----
            { name: 'نوار بانداز', price: 70000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'نوار بانداز (جدید)', price: 45000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'چسب گنزو', price: 89000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'چسب تیپ', price: 53000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'ماساژور', price: 59000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'شوزبک', price: 75000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'شوزبک (جدید)', price: 28000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'قاشقک', price: 150000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'آجر یوگا', price: 34000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'کشاله ساده', price: 205000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'حوله ورزشی', price: 120000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'دستمال سر حوله ای خارجی', price: 52000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IMPORTED, category: Category.OTHER },
            { name: 'اسکارف تمام فوتر', price: 59000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'اسکارف نیم فوتر', price: 65000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'روغن تردمیل', price: 94000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'فنر مچ تنظیمی', price: 95000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'فنر مچ تنظیمی جعبه ای', price: 150000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'مهره دسته دمبل', price: 18000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'دسته دمبل', price: 250000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'بوم رنگ خارجی', price: 39000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IMPORTED, category: Category.OTHER },
            { name: 'سوزن توپ', price: 1600, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'اسنوکر', price: 700000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'استپ', price: 564000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'میله شنا سوئدی', price: 824000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'بوسوبال', price: 3900000, stockStatus: StockStatus.LIMITED, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'اسکوتر چرخ بزرگ', price: 3400000, stockStatus: StockStatus.LIMITED, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'کاور مت', price: 18000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'ساچمه', price: 74000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'میت ساعد دار', price: 115000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'میت معمولی', price: 16000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'بلیرز تنفسی یک طرفه', price: 150000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'بلیرز تنفسی دو طرفه', price: 200000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'کاله بوکس نقاب دار', price: 200000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'قابلو تعویض فوتبال', price: 850000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'پرچم کمک داوری', price: 220000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'پرچم داوری (جدید)', price: 480000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'کارت داوری', price: 75000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'کارت داوری خارجی', price: 40000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IMPORTED, category: Category.OTHER },
            { name: 'فلاکس سه کاره', price: 210000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'نیم تنه تیک فوتبالی', price: 130000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.OTHER },
            { name: 'تخته شنا', price: 70000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.SWIMMING },
            { name: 'تخته شنا (جدید)', price: 42000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.SWIMMING },
            { name: 'نودل شنا لوله ای', price: 70000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.SWIMMING },
            { name: 'نودل شنا فومی', price: 70000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.SWIMMING },
            { name: 'جلیقه شنا اسفنجی', price: 160000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.SWIMMING },
            { name: 'عینک شنا کیفی اسپیدو', price: 620000, stockStatus: StockStatus.AVAILABLE, brand: Brand.SPEEDO, category: Category.SWIMMING },
            { name: 'عینک شنا کیفی', price: 135000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.SWIMMING },
            { name: 'عینک شنا جعبه ای', price: 185000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.SWIMMING },
            { name: 'عینک شنا فونیکس', price: 100000, stockStatus: StockStatus.AVAILABLE, brand: Brand.IRANIAN, category: Category.SWIMMING },
            { name: 'عینک شنا یاکاواما', price: 320000, stockStatus: StockStatus.AVAILABLE, brand: Brand.YAKAWAMA, category: Category.SWIMMING },
            { name: 'عینک شنا فوکس غواصی', price: 288000, stockStatus: StockStatus.AVAILABLE, brand: Brand.FOX, category: Category.SWIMMING },
        ];

        const allProducts = [
            ...dumbbells,
            ...balls,
            ...shoes,
            ...clothing,
            ...fitness,
            ...accessories,
            ...nets,
            ...rackets,
            ...others
        ];

        // ================================================================
        //  جمع‌آوری همه محصولات
        // ================================================================
        this.products = allProducts.map(p => {
            const status = p.stockStatus || StockStatus.AVAILABLE;
            const brand = p.brand || Brand.IRANIAN;

            // ===== اگر خودش کلاس Product هست =====
            if (p instanceof Product) {
                return p;
            }

            // ===== اگر object ساده است =====
            const category = p.category || Category.OTHER;

            // دسته‌بندی‌های خاص
            if (category === Category.FOOTBALL_BALL ||
                category === Category.BASKETBALL_BALL ||
                category === Category.VOLLEYBALL_BALL ||
                category === Category.HANDBALL_BALL) {
                return new FootballBall({
                    name: p.name,
                    price: p.price,
                    stockStatus: status,
                    brand: brand,
                    category: category
                });
            } else if (category === Category.FOOTBALL_SHOE ||
                category === Category.VOLLEYBALL_SHOE ||
                category === Category.WRESTLING_SHOE ||
                category === Category.SPORTS_SHOE) {
                return new FootballShoe({
                    name: p.name,
                    price: p.price,
                    stockStatus: status,
                    brand: brand,
                    category: category
                });
            } else {
                // برای سایر محصولات از Product پایه استفاده می‌کنیم
                return new Product({
                    name: p.name,
                    price: p.price,
                    stockStatus: status,
                    brand: brand,
                    category: category,
                    description: p.description || `محصول ${p.name}`
                });
            }
        });


        // ================================================================
        //  سازماندهی بر اساس دسته‌بندی
        // ================================================================
        this._organizeByCategory();

        console.log(`✅ ${this.products.length} محصول بارگذاری شد!`);
    }

    _organizeByCategory() {
        this.categories = {};

        this.products.forEach(product => {
            // چک ۱: product وجود دارد؟
            if (!product) {
                console.warn('⚠️ محصول undefined است!');
                return;
            }

            // چک ۲: product.category وجود دارد؟
            if (!product.category) {
                console.warn('⚠️ محصول بدون دسته‌بندی:', product.name);
                // اضافه کردن به دسته "سایر"
                const key = 'other';
                if (!this.categories[key]) {
                    this.categories[key] = {
                        name: 'سایر محصولات',
                        emoji: '📦',
                        products: []
                    };
                }
                this.categories[key].products.push(product);
                return;
            }

            // چک ۳: متد getCategoryName وجود دارد؟
            if (typeof product.getCategoryName !== 'function') {
                console.warn('⚠️ محصول متد getCategoryName را ندارد:', product.name, product);
                // استفاده از category به صورت مستقیم
                const key = product.category.value || 'other';
                if (!this.categories[key]) {
                    this.categories[key] = {
                        name: product.category.label || 'سایر',
                        emoji: product.category.emoji || '📦',
                        products: []
                    };
                }
                this.categories[key].products.push(product);
                return;
            }

            // حالت عادی - همه چیز درست است
            const key = product.category.value;
            if (!this.categories[key]) {
                this.categories[key] = {
                    name: product.getCategoryName(),
                    emoji: product.getCategoryEmoji(),
                    products: []
                };
            }
            this.categories[key].products.push(product);
        });

        console.log('📂 دسته‌بندی‌ها:', Object.keys(this.categories));
    }

    getAllProducts() {
        return this.products;
    }

    getCategories() {
        return Object.values(this.categories);
    }

    getProductsByCategory(categoryValue) {
        return this.categories[categoryValue]?.products || [];
    }

    addProduct(product) {
        this.products.push(product);
        this._organizeByCategory();
    }
}