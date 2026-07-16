/**
 * Shirt - تی شرت ورزشی
 */
class Shirt extends Clothing {
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
                    sleeveLength = 'کوتاه',  // کوتاه، بلند، بدون آستین
                    neckType = 'گرد',        // گرد، هفت، زیپ‌دار
                    isCompression = false,
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

        this.sleeveLength = sleeveLength;
        this.neckType = neckType;
        this.isCompression = isCompression;
        this.color = color;
    }

    getSleeveLabel() {
        const labels = {
            'short': 'آستین کوتاه',
            'long': 'آستین بلند',
            'sleeveless': 'بدون آستین'
        };
        return labels[this.sleeveLength] || this.sleeveLength;
    }
}