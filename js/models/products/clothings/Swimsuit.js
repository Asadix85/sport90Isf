/**
 * کلاس Swimsuit - مایو و لباس شنا
 */
class Swimsuit extends Clothing {
    constructor({
                    name,
                    price,
                    stockStatus = StockStatus.AVAILABLE,
                    image = null,
                    description = '',
                    brand = Brand.IRANIAN,
                    colors = [],
                    size = ClothingSize.M,
                    gender = Gender.WOMEN,
                    material = 'لیکرا',
                    season = 'تابستانه',
                    type = 'یک تیکه',    // یک تیکه، دو تیکه، دامن دار
                    hasUPF = false
                }) {
        super({
            name,
            price,
            stockStatus,
            image,
            description,
            category: Category.SWIMMING,
            brand,
            colors,
            size,
            gender,
            material,
            season
        });

        this.type = type;
        this.hasUPF = hasUPF;
    }
}