/**
 * کلاس ResistanceBand - کش بدنسازی
 */
class ResistanceBand extends FitnessEquipment {
    constructor({
                    name,
                    price,
                    stockStatus = StockStatus.AVAILABLE,
                    image = null,
                    description = '',
                    brand = Brand.IRANIAN,
                    colors = [],
                    material = 'لاستیک طبیعی',
                    weight = 0.5,
                    isPortable = true,
                    resistance = 'متوسط',   // سبک، متوسط، سنگین
                    length = 200,           // سانتی‌متر
                    type = 'لوپ'            // لوپ، متری، ترمزی
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

        this.resistance = resistance;
        this.length = length;
        this.type = type;
    }

    getResistanceLabel() {
        const labels = {
            'light': 'سبک',
            'medium': 'متوسط',
            'heavy': 'سنگین'
        };
        return labels[this.resistance] || this.resistance;
    }
}