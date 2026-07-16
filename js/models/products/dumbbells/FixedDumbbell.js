/**
 * کلاس FixedDumbbell - دمبل فشرده (ثابت)
 */
class FixedDumbbell extends Dumbbell {
    constructor({
                    name,
                    price,
                    stockStatus = StockStatus.AVAILABLE,
                    image = null,
                    description = '',
                    brand = Brand.BODY_CRAFT,
                    colors = [],
                    weight,
                    unit = 'جفت',
                    material = 'چدن',
                    handleType = 'ضدلغزش',
                    hasRubberCoating = true,
                    color = 'مشکی'
                }) {
        super({
            name,
            price,
            stockStatus,
            image,
            description,
            brand,
            colors,
            weight,
            unit,
            material,
            handleType
        });

        this.hasRubberCoating = hasRubberCoating;
        this.color = color;
    }

    isRubberCoated() {
        return this.hasRubberCoating ? 'روکش لاستیکی دارد' : 'بدون روکش';
    }
}