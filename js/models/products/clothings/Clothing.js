/**
 * کلاس Clothing - پایه همه پوشاک
 */
class Clothing extends Product {
    constructor({
                    name,
                    price,
                    stockStatus = StockStatus.AVAILABLE,
                    image = null,
                    description = '',
                    category,
                    brand = Brand.IRANIAN,
                    colors = [],
                    size = ClothingSize.M,
                    gender = Gender.UNISEX,
                    material = 'پلی استر',
                    season = 'تابستانه'
                }) {
        super({
            name,
            price,
            stockStatus,
            image,
            description,
            category,
            brand,
            colors
        });

        this.size = size;
        this.gender = gender;
        this.material = material;
        this.season = season;
    }

    getSizeLabel() {
        return this.size.label || this.size;
    }

    getGenderLabel() {
        return this.gender.label || this.gender;
    }
}