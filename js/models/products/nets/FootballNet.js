/**
 * کلاس FootballNet - تور فوتبال
 */
class FootballNet extends Net {
    constructor({
                    name,
                    price,
                    stockStatus = StockStatus.AVAILABLE,
                    image = null,
                    description = '',
                    brand = Brand.IRANIAN,
                    colors = [],
                    material = 'نخ',
                    size = 'استاندارد',
                    isPortable = false,
                    goalSize = '۷×۲.۴',   // متر
                    meshSize = '۱۰×۱۰',   // سانتی‌متر
                    type = 'حرفه‌ای'
                }) {
        super({
            name,
            price,
            stockStatus,
            image,
            description,
            brand,
            colors,
            material,
            size,
            isPortable
        });

        this.goalSize = goalSize;
        this.meshSize = meshSize;
        this.type = type;
    }
}