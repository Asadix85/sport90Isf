/**
 * کلاس FootballShoe - کفش فوتبال
 */
class FootballShoe extends Product {
    constructor({ 
        name, 
        price, 
        stockStatus = StockStatus.AVAILABLE, 
        image = null, 
        description = '',
        brand = Brand.NIKE, 
        colors = [],
        size = ShoeSize.SIZE_42,
        gender = Gender.MEN,
        terrain = Terrain.ARTIFICIAL,
        studs = 'قفلی',
        sole = 'AG',
        category = Category.FOOTBALL_SHOE
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
        this.terrain = terrain;
        this.studs = studs;
        this.sole = sole;
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
    
    getTerrainLabel() {
        return this.terrain.label || this.terrain;
    }
}