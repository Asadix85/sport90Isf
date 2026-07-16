/**
 * PullUpBar - بارفیکس
 */
class PullUpBar extends FitnessEquipment {
    constructor({
                    name,
                    price,
                    stockStatus = StockStatus.AVAILABLE,
                    image = null,
                    description = '',
                    brand = Brand.IRANIAN,
                    colors = [],
                    material = 'فولاد',
                    weight = 8,           // وزن به کیلوگرم
                    isPortable = false,
                    type = 'تک لول',     // تک لول، دو لول، سه لول، تن زیپ
                    maxWeight = 120,     // حداکثر وزن تحمل
                    installType = 'دیواری' // دیواری، درگاهی، ایستاده
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
            weight,
            isPortable
        });

        this.type = type;
        this.maxWeight = maxWeight;
        this.installType = installType;
    }

    getTypeLabel() {
        return this.type;
    }
}