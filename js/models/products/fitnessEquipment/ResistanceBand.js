import { FitnessEquipment } from './FitnessEquipment.js';
import { Category, Brand } from '../../../enums/Enums.js';

export class ResistanceBand extends FitnessEquipment {
    constructor({
                    name,
                    price,
                    stockStatus = undefined,
                    image = null,
                    description = '',
                    brand = Brand.BODY_CRAFT,
                    colors = [],
                    weight = undefined,
                    material = 'لاستیک',
                    resistanceLevel = 'متوسط'
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
            weight,
            material
        });

        this.resistanceLevel = resistanceLevel;
    }
}
