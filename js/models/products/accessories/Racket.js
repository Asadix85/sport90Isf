import { Accessory } from './Accessory.js';
import { Category, Brand } from '../../../enums/Enums.js';

export class Racket extends Accessory {
    constructor({
                    name,
                    price,
                    stockStatus = undefined,
                    image = null,
                    description = '',
                    brand = Brand.YONEX,
                    colors = [],
                    material = 'کربن',
                    racketType = 'بادمینتون'
                }) {
        super({
            name,
            price,
            stockStatus,
            image,
            description,
            category: Category.RACKET,
            brand,
            colors,
            material
        });

        this.racketType = racketType;
    }
}
