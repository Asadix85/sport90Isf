# راهنمای اضافه کردن عکس محصولات

## وضعیت فعلی ✅

عکس‌های placeholder به صورت SVG در پوشه `images/` ایجاد شده‌اند:

- `images/product-1.svg` - برای دمبل‌ها
- `images/product-2.svg` - برای دمبل بانوان  
- `images/product-3.svg` - برای توپ فوتبال
- `images/product-4.svg` - برای توپ بسکتبال
- `images/product-5.svg` - برای توپ والیبال و هندبال
- `images/product-6.svg` - برای توپ بدنسازی و مدیسین بال
- `images/product-7.svg` - برای کفش‌ها
- `images/product-8.svg` - برای لباس‌ها
- `images/placeholder.svg` - عکس پیش‌فرض

## نحوه استفاده از عکس‌های واقعی

### روش ۱: آپلود عکس‌های جدید

1. عکس‌های خود را با فرمت‌های `.jpg`، `.png` یا `.webp` آماده کنید
2. آن‌ها را در پوشه `images/` قرار دهید
3. نام‌گذاری پیشنهادی: `product-{id}.jpg` (مثلاً `product-1.jpg`)

### روش ۲: بروزرسانی DataService.js

برای هر محصول، فیلد `image` را به مسیر عکس واقعی تغییر دهید:

```javascript
new FixedDumbbell({ 
    name: 'دمبل فشرده ۱ کیلویی', 
    price: 258000, 
    stockStatus: StockStatus.AVAILABLE, 
    weight: 1, 
    unit: 'جفت', 
    image: 'images/dumbbell-1kg.jpg' // ← تغییر اینجا
}),
```

### روش ۳: استفاده از URL خارجی

می‌توانید از URL‌های خارجی هم استفاده کنید:

```javascript
new FootballBall({ 
    name: 'توپ فوتبال بتا', 
    price: 190000, 
    image: 'https://example.com/images/ball-beta.jpg'
}),
```

## بهترین روش‌ها

### ۱. بهینه‌سازی عکس‌ها
- قبل از آپلود، عکس‌ها را فشرده کنید
- از فرمت WebP برای حجم کمتر استفاده کنید
- سایز مناسب: 400x300 پیکسل برای کارت محصول

### ۲. نام‌گذاری منظم
```
images/
├── dumbbells/
│   ├── dumbbell-1kg.jpg
│   └── dumbbell-2kg.jpg
├── balls/
│   ├── football-beta.jpg
│   └── basketball-fox.jpg
└── shoes/
    ├── football-shoe-nike.jpg
    └── volleyball-shoe-adidas.jpg
```

### ۳. fallback برای عکس‌های گم شده
کد به طور خودکار از `images/placeholder.svg` استفاده می‌کند اگر عکس پیدا نشود.

## تست عکس‌ها

بعد از اضافه کردن عکس‌ها، سایت را باز کنید و بررسی کنید:
1. عکس‌ها درست لود می‌شوند
2. سایز عکس‌ها مناسب است
3. در صورت نبود عکس، placeholder نمایش داده می‌شود

## تبدیل SVG به PNG (اختیاری)

اگر می‌خواهید SVGها را به PNG تبدیل کنید:

```bash
# نصب sharp
npm install sharp

# اسکریپت تبدیل
node -e "
const sharp = require('sharp');
['1','2','3','4','5','6','7','8'].forEach(i => {
  sharp(\`images/product-\${i}.svg\`)
    .png()
    .toFile(\`images/product-\${i}.png\`);
});
"
```
