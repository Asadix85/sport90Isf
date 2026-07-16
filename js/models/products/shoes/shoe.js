/**
 * کلاس Shoe - پایه همه کفش‌ها
 */
class Shoe extends Product {
    constructor({
                    name,
                    price,
                    stockStatus = StockStatus.AVAILABLE,
                    image = null,
                    description = '',
                    category,
                    brand = Brand.NIKE,
                    colors = [],
                    size = ShoeSize.SIZE_42,
                    gender = Gender.MEN,
                    color = 'سفید',
                    material = 'چرم'
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
        this.color = color;
        this.material = material;
    }

    getSizeLabel() {
        return `${this.size}`;
    }

    getGenderLabel() {
        return this.gender.label || this.gender;
    }

    getGenderEmoji() {
        return this.gender.emoji || '👤';
    }
}