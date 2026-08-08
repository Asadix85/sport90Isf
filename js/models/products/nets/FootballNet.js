import { Net } from './Net.js';
import { Category, Brand } from '../../../enums/Enums.js';

export class FootballNet extends Net {
    constructor({
                    name,
                    price,
                    stockStatus = undefined,
                    image = null,
                    description = '',
                    brand = Brand.MOLTEN,
                    colors = [],
                    material = 'نخ محکم',
                    dimensions = '7.32 x 2.44 متر'
                }) {
        super({
            name,
            price,
            stockStatus,
            image,
            description,
            category: Category.NETS,
            brand,
            colors,
            material,
            dimensions
        });
    }
}
