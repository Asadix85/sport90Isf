/**
 * Socks - جوراب ورزشی
 */
class Socks extends Clothing {
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
                    material = 'نخ',
                    season = 'چهارفصل',
                    type = 'ورزشی',        // ورزشی، یوگا، پیلاتس، ساق بلند
                    height = 'متوسط',     // کوتاه، متوسط، بلند
                    hasPadding = true,
                    color = 'سفید'
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

        this.type = type;
        this.height = height;
        this.hasPadding = hasPadding;
        this.color = color;
    }

    getTypeLabel() {
        const labels = {
            'sport': 'ورزشی',
            'yoga': 'یوگا',
            'pilates': 'پیلاتس',
            'long': 'ساق بلند'
        };
        return labels[this.type] || this.type;
    }
}