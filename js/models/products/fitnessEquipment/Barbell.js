/**
 * Barbell - هالتر
 */
class Barbell extends FitnessEquipment {
    constructor({
                    name,
                    price,
                    stockStatus = StockStatus.AVAILABLE,
                    image = null,
                    description = '',
                    brand = Brand.IRANIAN,
                    colors = [],
                    material = 'فولاد',
                    weight = 10,          // وزن به کیلوگرم
                    isPortable = false,
                    length = 120,         // طول به سانتی‌متر
                    diameter = 28,        // قطر به میلی‌متر
                    maxWeight = 150,      // حداکثر وزن تحمل
                    hasKnurling = true,   // دارای شیار
                    type = 'استاندارد'   // استاندارد، المپیک
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

        this.length = length;
        this.diameter = diameter;
        this.maxWeight = maxWeight;
        this.hasKnurling = hasKnurling;
        this.type = type;
    }

    getLengthLabel() {
        return `${this.length} سانتی‌متر`;
    }

    getTypeLabel() {
        const labels = {
            'standard': 'استاندارد',
            'olympic': 'المپیک'
        };
        return labels[this.type] || this.type;
    }
}