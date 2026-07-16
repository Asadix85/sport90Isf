/**
 * کلاس Band - بند و زانوبندها
 */
class Band extends Accessory {
    constructor({
                    name,
                    price,
                    stockStatus = StockStatus.AVAILABLE,
                    image = null,
                    description = '',
                    brand = Brand.LP,
                    colors = [],
                    material = 'نئوپرن',
                    isWearable = true,
                    size = 'متوسط',
                    bodyPart = 'زانو',    // زانو، مچ، آرنج، ساق
                    hasAdjustment = true,
                    compression = 'متوسط'
                }) {
        super({
            name,
            price,
            stockStatus,
            image,
            description,
            category: Category.BANDS,
            brand,
            colors,
            material,
            isWearable,
            size
        });

        this.bodyPart = bodyPart;
        this.hasAdjustment = hasAdjustment;
        this.compression = compression;
    }
}