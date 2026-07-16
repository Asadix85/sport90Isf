/**
 * SportsShoe - کفش ورزشی عمومی
 */
class SportsShoe extends Shoe {
    constructor({
                    name,
                    price,
                    stockStatus = StockStatus.AVAILABLE,
                    image = null,
                    description = '',
                    brand = Brand.IRANIAN,
                    colors = [],
                    size = ShoeSize.SIZE_42,
                    gender = Gender.UNISEX,
                    color = 'سفید',
                    material = 'مش',
                    sole = 'راست',
                    activity = 'عمومی'  // پیاده‌روی، دویدن، سالنی
                }) {
        super({
            name,
            price,
            stockStatus,
            image,
            description,
            category: Category.SPORTS_SHOE,
            brand,
            colors,
            size,
            gender,
            color,
            material
        });

        this.sole = sole;
        this.activity = activity;
    }

    getActivityLabel() {
        const labels = {
            'walking': 'پیاده‌روی',
            'running': 'دویدن',
            'indoor': 'سالنی',
            'general': 'عمومی'
        };
        return labels[this.activity] || this.activity;
    }
}