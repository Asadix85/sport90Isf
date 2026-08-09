/**
 * ProductFactory.js - کارخانه ساخت محصولات
 * ایجاد نمونه‌های مناسب از کلاس‌های محصول بر اساس نوع
 */

import { ProductType, Category, SubCategory } from '../enums/Enums.js';

// ایمپورت کلاس‌های محصول
import { FootballBall } from '../models/products/balls/FootballBall.js';
import { BasketballBall } from '../models/products/balls/BasketballBall.js';
import { VolleyballBall } from '../models/products/balls/VolleyballBall.js';
import { ExerciseBall } from '../models/products/balls/ExerciseBall.js';
import { MedicineBall } from '../models/products/balls/MedicineBall.js';

import { FootballShoe } from '../models/products/shoes/FootballShoe.js';
import { VolleyballShoe } from '../models/products/shoes/VolleyballShoe.js';
import { WrestlingShoe } from '../models/products/shoes/WrestlingShoe.js';
import { SportsShoe } from '../models/products/shoes/SportsShoe.js';

import { Shirt } from '../models/products/clothings/Shirt.js';
import { Short } from '../models/products/clothings/Short.js';
import { Socks } from '../models/products/clothings/Socks.js';
import { Swimsuit } from '../models/products/clothings/Swimsuit.js';
import { MartialArtsUniform } from '../models/products/clothings/MartialArtsUniform.js';

import { Barbell } from '../models/products/fitnessEquipment/Barbell.js';
import { PullUpBar } from '../models/products/fitnessEquipment/PullUpBar.js';
import { ResistanceBand } from '../models/products/fitnessEquipment/ResistanceBand.js';
import { YogaMat } from '../models/products/fitnessEquipment/YogaMat.js';

import { Glove } from '../models/products/accessories/Glove.js';
import { Band } from '../models/products/accessories/Band.js';
import { Racket } from '../models/products/accessories/Racket.js';

import { FootballNet } from '../models/products/nets/FootballNet.js';

import { FixedDumbbell } from '../models/products/dumbbells/FixedDumbbell.js';

/**
 * کارخانه ساخت محصولات
 */
class ProductFactory {
    /**
     * ساخت محصول بر اساس نوع
     * @param {ProductType} type - نوع محصول
     * @param {Object} data - داده‌های محصول
     * @returns {Product} نمونه محصول
     */
    static createProduct(type, data) {
        const productClasses = {
            // توپ‌ها
            [ProductType.FOOTBALL_BALL]: FootballBall,
            [ProductType.BASKETBALL_BALL]: BasketballBall,
            [ProductType.VOLLEYBALL_BALL]: VolleyballBall,
            [ProductType.EXERCISE_BALL]: ExerciseBall,
            [ProductType.MEDICINE_BALL]: MedicineBall,
            
            // کفش‌ها
            [ProductType.FOOTBALL_SHOE]: FootballShoe,
            [ProductType.VOLLEYBALL_SHOE]: VolleyballShoe,
            [ProductType.WRESTLING_SHOE]: WrestlingShoe,
            [ProductType.SPORTS_SHOE]: SportsShoe,
            
            // لباس‌ها
            [ProductType.SHIRT]: Shirt,
            [ProductType.SHORT]: Short,
            [ProductType.SOCKS]: Socks,
            [ProductType.SWIMSUIT]: Swimsuit,
            [ProductType.MARTIAL_ARTS_UNIFORM]: MartialArtsUniform,
            
            // تجهیزات بدنسازی
            [ProductType.BARBELL]: Barbell,
            [ProductType.PULL_UP_BAR]: PullUpBar,
            [ProductType.RESISTANCE_BAND]: ResistanceBand,
            [ProductType.YOGA_MAT]: YogaMat,
            
            // اکسسوری
            [ProductType.GLOVE]: Glove,
            [ProductType.BAND]: Band,
            [ProductType.RACKET]: Racket,
            
            // تور
            [ProductType.FOOTBALL_NET]: FootballNet,
            
            // دمبل
            [ProductType.FIXED_DUMBBELL]: FixedDumbbell
        };

        const ProductClass = productClasses[type];
        
        if (!ProductClass) {
            console.warn(`⚠️ کلاس محصول برای نوع ${type} یافت نشد`);
            return null;
        }

        try {
            return new ProductClass(data);
        } catch (error) {
            console.error(`❌ خطا در ساخت محصول از نوع ${type}:`, error);
            return null;
        }
    }

    /**
     * ساخت لیست محصولات از داده‌های خام
     * @param {Array} productsData - آرایه داده‌های محصولات
     * @returns {Array} آرایه نمونه‌های محصول
     */
    static createProductList(productsData) {
        if (!Array.isArray(productsData)) {
            console.error('❌ داده‌های محصولات باید آرایه باشد');
            return [];
        }

        return productsData
            .map(productData => {
                const type = productData.type || productData.productType;
                if (!type) {
                    console.warn('⚠️ نوع محصول مشخص نشده:', productData);
                    return null;
                }
                return this.createProduct(type, productData);
            })
            .filter(product => product !== null);
    }
}

// No additional export needed - class is already exported
