import { Dumbbell } from './Dumbbell.js';
import { Category, Brand } from '../../../enums/Enums.js';

export class FixedDumbbell extends Dumbbell {
    constructor({
                    name,
                    price,
                    stockStatus = undefined,
                    image = null,
                    description = '',
                    brand = Brand.BODY_CRAFT,
                    colors = [],
                    weight = 10,
                    material = 'آهن روکش‌دار'
                }) {
        super({
            name,
            price,
            stockStatus,
            image,
            description,
            category: Category.DUMBBELL,
            brand,
            colors,
            weight,
            material
        });
    }
}
