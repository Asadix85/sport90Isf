

class Clothing extends Product {
    constructor({
                    name,
                    price,
                    stockStatus = undefined,
                    image = null,
                    description = '',
                    category = window.Category.CLOTHING,
                    brand = undefined,
                    colors = [],
                    size = window.ClothingSize.M,
                    gender = window.Gender.UNISEX,
                    material = 'پلی‌استر'
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
    }

    getSizeLabel() {
        return this.size.label || this.size;
    }

    getGenderLabel() {
        return this.gender.label || this.gender;
    }
}

window.Clothing = Clothing;
