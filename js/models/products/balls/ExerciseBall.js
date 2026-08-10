
class ExerciseBall extends Ball {
    constructor({
                    name,
                    price,
                    stockStatus = undefined,
                    image = null,
                    description = '',
                    brand = window.Brand.OTHER,
                    colors = [],
                    size = 65,
                    material = undefined,
                    weight = 1000,
                    circumference = 200
                }) {
        super({
            name,
            price,
            stockStatus,
            image,
            description,
            category: Category.EXERCISE_BALL,
            brand,
            colors,
            size,
            material,
            sport: 'بدنسازی',
            weight,
            circumference
        });
    }
}

window.ExerciseBall = ExerciseBall;
