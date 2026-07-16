/**
 * WrestlingShoe - کفش کشتی
 */
class WrestlingShoe extends Shoe {
    constructor({
                    name,
                    price,
                    stockStatus = StockStatus.AVAILABLE,
                    image = null,
                    description = '',
                    brand = Brand.ASICS,
                    colors = [],
                    size = ShoeSize.SIZE_42,
                    gender = Gender.MEN,
                    color = 'قرمز-آبی',
                    material = 'چرم',
                    sole = 'غیرلغزش',
                    ankleSupport = 'متوسط', // کم، متوسط، زیاد
                    weight = 300           // وزن به گرم
                }) {
        super({
            name,
            price,
            stockStatus,
            image,
            description,
            category: Category.WRESTLING_SHOE,
            brand,
            colors,
            size,
            gender,
            color,
            material
        });

        this.sole = sole;
        this.ankleSupport = ankleSupport;
        this.weight = weight;
    }

    getAnkleSupportLabel() {
        const labels = {
            'low': 'کم',
            'medium': 'متوسط',
            'high': 'زیاد'
        };
        return labels[this.ankleSupport] || this.ankleSupport;
    }
}