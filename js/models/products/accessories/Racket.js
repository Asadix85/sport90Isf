/**
 * Racket - راکت (پایه راکت‌ها)
 * ارث‌بری از کلاس Accessory
 */
class Racket extends Accessory {
    constructor({
                    name,
                    price,
                    stockStatus = StockStatus.AVAILABLE,
                    image = null,
                    description = '',
                    brand = Brand.YONEX,
                    colors = [],
                    material = 'کامپوزیت',
                    isWearable = false,
                    size = 'یک سایز',
                    type = 'بدمینتون',    // بدمینتون، تنیس، پینگ پنگ، اسکواش
                    weight = 85,           // وزن به گرم
                    balance = 'متوسط',     // سر سنگین، متعادل، دسته سنگین
                    gripSize = 'G4',       // سایز دسته (G1-G5)
                    stringTension = 22,    // کشش تار (پوند)
                    category = Category.RACKET,
                    isPair = false         // آیا جفتی است؟
                }) {
        super({
            name,
            price,
            stockStatus,
            image,
            description,
            category,
            brand,
            colors,
            material,
            isWearable,
            size
        });

        this.type = type;
        this.weight = weight;
        this.balance = balance;
        this.gripSize = gripSize;
        this.stringTension = stringTension;
        this.isPair = isPair;
    }

    /**
     * دریافت برچسب نوع راکت
     */
    getTypeLabel() {
        const labels = {
            'badminton': 'بدمینتون',
            'tennis': 'تنیس',
            'pingpong': 'پینگ پنگ',
            'squash': 'اسکواش'
        };
        return labels[this.type] || this.type;
    }

    /**
     * دریافت برچسب تعادل راکت
     */
    getBalanceLabel() {
        const labels = {
            'head_heavy': 'سر سنگین',
            'balanced': 'متعادل',
            'head_light': 'دسته سنگین'
        };
        return labels[this.balance] || this.balance;
    }

    /**
     * دریافت برچسب سایز دسته
     */
    getGripLabel() {
        return `سایز دسته ${this.gripSize}`;
    }

    /**
     * دریافت وزن راکت
     */
    getWeightLabel() {
        return `${this.weight} گرم`;
    }

    /**
     * آیا راکت جفتی است؟
     */
    getPairLabel() {
        return this.isPair ? 'جفتی' : 'تکی';
    }

    /**
     * بازنویسی متد toString
     */
    toString() {
        return `${this.getCategoryEmoji()} ${this.name} (${this.getTypeLabel()}) - ${this.getFormattedPrice()} تومان`;
    }
}