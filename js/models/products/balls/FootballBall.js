/**
 * کلاس FootballBall - توپ فوتبال
 */
class FootballBall extends Ball {
    constructor({ 
        name, 
        price, 
        stockStatus = StockStatus.AVAILABLE, 
        image = null, 
        description = '',
        brand = Brand.ADIDAS, 
        colors = [],
        size = 5,
        material = BallMaterial.PU,
        type = FootballType.MATCH,
        weight = 450,
        category = Category.FOOTBALL_BALL
    }) {
        super({ 
            name, 
            price, 
            stockStatus, 
            image, 
            description,
            category,
            brand, 
            colors,
            size, 
            material,
            sport: 'فوتبال',
            weight
        });
        
        this.type = type;
    }
    
    getTypeName() {
        return this.type.label || this.type;
    }
    
    toString() {
        return `${this.getCategoryEmoji()} ${this.name} (${this.getTypeName()}) - ${this.getFormattedPrice()} تومان`;
    }
}