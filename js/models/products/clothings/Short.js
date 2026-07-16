/**
 * Short - شلوارک ورزشی
 */
class Short extends Clothing {
    constructor({
                    name,
                    price,
                    stockStatus = StockStatus.AVAILABLE,
                    image = null,
                    description = '',
                    brand = Brand.IRANIAN,
                    colors = [],
                    size = ClothingSize.M,
                    gender = Gender.UNISEX,
                    material = 'پلی استر',
                    season = 'تابستانه',
                    length = 'متوسط',      // کوتاه، متوسط، بلند
                    hasPocket = true,
                    hasElastic = true,
                    color = 'مشکی'
                }) {
        super({
            name,
            price,
            stockStatus,
            image,
            description,
            category: Category.CLOTHING,
            brand,
            colors,
            size,
            gender,
            material,
            season
        });

        this.length = length;
        this.hasPocket = hasPocket;
        this.hasElastic = hasElastic;
        this.color = color;
    }

    getLengthLabel() {
        const labels = {
            'short': 'کوتاه',
            'medium': 'متوسط',
            'long': 'بلند'
        };
        return labels[this.length] || this.length;
    }
}