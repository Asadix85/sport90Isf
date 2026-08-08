/**
 * Ball - کلاس پایه توپ‌ها
 * ارث‌بری از کلاس Product
 */
import { Product } from '../../abstract/Product.js';
import { BallMaterial, Category } from '../../../enums/Enums.js';

export class Ball extends Product {
    constructor({
                    name,
                    price,
                    stockStatus = undefined,
                    image = null,
                    description = '',
                    category = Category.FOOTBALL_BALL,
                    brand = undefined,
                    colors = [],
                    size,
                    material = BallMaterial.PU,
                    sport = 'فوتبال',
                    weight = 450,
                    circumference = 70
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
        this.material = material;
        this.sport = sport;
        this.weight = weight;
        this.circumference = circumference;
    }

    getMaterialName() {
        return this.material.label || this.material;
    }

    getWeightLabel() {
        return `${this.weight} گرم`;
    }

    getCircumferenceLabel() {
        return `${this.circumference} سانتی‌متر`;
    }
}
