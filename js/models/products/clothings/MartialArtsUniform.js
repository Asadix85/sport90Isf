/**
 * MartialArtsUniform - لباس رزمی (کاراته، تکواندو، بوکس)
 */
class MartialArtsUniform extends Clothing {
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
                    type = 'کاراته',      // کاراته، تکواندو، بوکس، جودو
                    hasBelt = true,
                    hasPants = true,
                    color = 'سفید'
                }) {
        super({
            name,
            price,
            stockStatus,
            image,
            description,
            category: Category.MARTIAL_ARTS,
            brand,
            colors,
            size,
            gender,
            material,
            season
        });

        this.type = type;
        this.hasBelt = hasBelt;
        this.hasPants = hasPants;
        this.color = color;
    }

    getTypeLabel() {
        const labels = {
            'karate': 'کاراته',
            'taekwondo': 'تکواندو',
            'boxing': 'بوکس',
            'judo': 'جودو'
        };
        return labels[this.type] || this.type;
    }
}