import { Clothing } from './Clothing.js';
import { Category, Brand, ClothingSize } from '../../../enums/Enums.js';

export class MartialArtsUniform extends Clothing {
    constructor({
                    name,
                    price,
                    stockStatus = undefined,
                    image = null,
                    description = '',
                    brand = Brand.ADIDAS,
                    colors = [],
                    size = ClothingSize.L,
                    gender = undefined,
                    material = 'کتان',
                    martialArt = 'کاراته'
                }) {
        super({
            name,
            price,
            stockStatus,
            image,
            description,
            category: Category.MARTIAL_ARTS,
            brand,
            colors,
            size,
            gender,
            material
        });

        this.martialArt = martialArt;
    }
}
