import { Product } from '../../abstract/Product.js';
import { Category, ClothingSize, Gender } from '../../../enums/Enums.js';

export class Clothing extends Product {
    constructor({
                    name,
                    price,
                    stockStatus = undefined,
                    image = null,
                    description = '',
                    category = Category.CLOTHING,
                    brand = undefined,
                    colors = [],
                    size = ClothingSize.M,
                    gender = Gender.UNISEX,
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
