/**
 * YogaMat - مت یوگا
 */
class YogaMat extends FitnessEquipment {
    constructor({
                    name,
                    price,
                    stockStatus = StockStatus.AVAILABLE,
                    image = null,
                    description = '',
                    brand = Brand.IRANIAN,
                    colors = [],
                    material = 'PVC',
                    weight = 1.5,
                    isPortable = true,
                    thickness = 6,        // ضخامت به میلی‌متر
                    length = 183,         // طول به سانتی‌متر
                    width = 61,           // عرض به سانتی‌متر
                    type = 'معمولی',     // معمولی، حوله‌ای، تاشو
                    color = 'آبی'
                }) {
        super({
            name,
            price,
            stockStatus,
            image,
            description,
            category: Category.FITNESS,
            brand,
            colors,
            material,
            weight,
            isPortable
        });

        this.thickness = thickness;
        this.length = length;
        this.width = width;
        this.type = type;
        this.color = color;
    }

    getThicknessLabel() {
        return `${this.thickness} میلی‌متر`;
    }

    getSizeLabel() {
        return `${this.length} × ${this.width} سانتی‌متر`;
    }

    getTypeLabel() {
        const labels = {
            'normal': 'معمولی',
            'towel': 'حوله‌ای',
            'foldable': 'تاشو'
        };
        return labels[this.type] || this.type;
    }
}