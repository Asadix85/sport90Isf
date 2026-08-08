import { Accessory } from './Accessory.js';
import { Category, Brand } from '../../../enums/Enums.js';

export class Band extends Accessory {
    constructor({
                    name,
                    price,
                    stockStatus = undefined,
                    image = null,
                    description = '',
                    brand = Brand.BODY_CRAFT,
                    colors = [],
                    material = 'پارچه‌ای',
                    bandType = 'زانوبند'
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
            material
        });

        this.bandType = bandType;
    }
}
