# راهنمای مدیریت محصولات سایت Sport 90

از حالا به بعد، **دیگه لازم نیست وارد کد بشید**. تمام ۵۴۳ محصول سایت تو یه فایل ساده به اسم
`data/products.json` نگه‌داری میشن. برای اضافه‌کردن، ادیت یا حذف محصول، فقط همین فایل رو تغییر بدید.

---

## ⚡ سریع‌ترین کار: عوض کردن قیمت یک محصول

1. فایل `data/products.json` رو با هر ادیتور متنی (حتی Notepad) یا با اکسل باز کنید.
2. اسم محصول مورد نظر رو پیدا کنید (`Ctrl+F`).
3. عدد جلوی `"price"` رو عوض کنید.
4. ذخیره کنید.
5. فایل رو روی گیت‌هاب آپلود/کامیت کنید (یا از طریق GitHub Desktop / وب‌سایت گیت‌هاب).

مثال، برای عوض کردن قیمت از ۶۰۰٬۰۰۰ به ۷۵۰٬۰۰۰:

```diff
  {
    "id": "P0001",
    "type": "fixed_dumbbell",
    "name": "دمبل فشرده ۱ کیلویی",
-   "price": 600000,
+   "price": 750000,
    "stockStatus": "available",
    ...
  }
```

همین! سایت خودش موقع لود شدن این فایل رو می‌خونه و تغییرات رو نشون میده.

---

## 🧩 دو راه برای ادیت‌کردن

### راه ۱: مستقیم با ادیتور متنی / VS Code (برای تغییرات کوچیک، سریع‌ترین راه)
فایل `data/products.json` رو باز کنید و مستقیم عدد/متنش رو عوض کنید.

### راه ۲: با Excel (برای تغییرات زیاد یا اضافه‌کردن چند محصول با هم، راحت‌تر)
1. فایل `data/products.xlsx` رو با Excel یا Google Sheets باز کنید (همه‌ی ۵۴۳ محصول اونجاست، هر ردیف = یک محصول).
2. هرچقدر خواستید ویرایش کنید (قیمت‌ها، موجودی، اضافه‌کردن ردیف جدید برای محصول جدید و...).
3. فایل رو Save کنید (به فرمت xlsx).
4. فایل `tools/excel-json-converter.html` رو با مرورگر باز کنید (فقط دوبار کلیک، نیاز به سرور نداره).
5. فایل xlsx رو توش drag & drop کنید → دکمه «دانلود products.json» رو بزنید.
6. فایل دانلودشده رو جایگزین `data/products.json` قبلی کنید و کامیت/آپلود کنید.

> 💡 این ابزار کاملاً آفلاین و توی همون مرورگر خودتون کار می‌کنه؛ هیچ داده‌ای جایی ارسال نمیشه.

---

## ➕ اضافه‌کردن یک محصول کاملاً جدید

یک آبجکت جدید به آرایه‌ی `data/products.json` اضافه کنید (یا یک ردیف جدید تو اکسل). حداقل فیلدهای
لازم: `id`، `type`، `name`، `price`. بقیه اختیاریه.

```json
{
  "id": "P0544",
  "type": "football_ball",
  "name": "توپ فوتبال جدید من",
  "price": 350000,
  "stockStatus": "available",
  "image": "images/product-3.svg",
  "description": "توضیح دلخواه",
  "brand": "molten",
  "colors": ["white", "black"],
  "size": 5,
  "weight": 420,
  "circumference": 69,
  "footballType": "match"
}
```

**نکته مهم درباره `id`:** هر محصول باید یه `id` منحصربه‌فرد داشته باشه (تکراری نباشه). برای محصول
جدید کافیه یه شماره‌ی بعدی بسازید (مثلاً بعد از `P0543` بشه `P0544`).

---

## 📋 فیلدهای هر محصول

| فیلد | اجباری؟ | توضیح |
|---|---|---|
| `id` | ✅ | شناسه یکتا (رشته دلخواه، تکراری نباشه) |
| `type` | ✅ | نوع محصول — لیست کامل پایین همین صفحه |
| `name` | ✅ | اسم محصول |
| `price` | ✅ | قیمت به تومان (فقط عدد) |
| `stockStatus` | ❌ | یکی از: `available`, `out_of_stock`, `pre_order`, `limited` (پیش‌فرض: `available`) |
| `image` | ❌ | مسیر عکس، مثلاً `images/product-3.svg` |
| `description` | ❌ | توضیحات محصول |
| `brand` | ❌ | یکی از لیست برندها (پایین) |
| `colors` | ❌ | آرایه‌ای از رنگ‌ها، مثلاً `["red","black"]` (تو اکسل: `red,black`) |

بسته به `type`، فیلدهای اضافه‌تری هم قابل استفاده‌ست (مثل `weight`, `size`, `gender`, `shoeSize`,
`terrain` و...) — جدول کامل پایین‌تره.

---

## 🎯 لیست کامل `type`های معتبر

| type | کلاس داخلی | فیلدهای اضافه‌ی قابل استفاده |
|---|---|---|
| `fixed_dumbbell` | دمبل | `weight`, `material` |
| `football_ball` | توپ فوتبال | `size`, `material`, `weight`, `circumference`, `footballType` |
| `basketball_ball` | توپ بسکتبال | `size`, `material`, `weight`, `circumference` |
| `volleyball_ball` | توپ والیبال | `size`, `material`, `weight`, `circumference` |
| `handball_ball` | توپ هندبال | `size`, `material`, `weight`, `circumference` |
| `exercise_ball` | توپ بدنسازی | `size`, `material`, `weight`, `circumference` |
| `medicine_ball` | مدیسن بال | `size`, `material`, `weight`, `circumference` |
| `ping_pong` | توپ پینگ‌پنگ | `size`, `material`, `weight`, `circumference` |
| `tennis_ball` | توپ تنیس | `size`, `material`, `weight`, `circumference` |
| `decorative` | توپ تزیینی | `size`, `material`, `weight`, `circumference` |
| `football_shoe` | کفش فوتبال | `shoeSize` (۳۶ تا ۴۸), `terrain`, `studType` |
| `volleyball_shoe` | کفش والیبال | `shoeSize` |
| `wrestling_shoe` | کفش کشتی | `shoeSize` |
| `sports_shoe` | کفش ورزشی عمومی | `shoeSize` |
| `shirt` | پیراهن | `size`, `gender`, `material`, `sleeveLength` |
| `short` | شورت ورزشی | `size`, `gender`, `material` |
| `socks` | جوراب | `size`, `gender`, `material`, `length` |
| `swimsuit` | لباس شنا | `size`, `gender`, `material` |
| `martial_arts_uniform` | لباس رزمی | `size`, `gender`, `material`, `martialArt` |
| `clothing_other` | پوشاک عمومی | `size`, `gender`, `material` |
| `swimming_other` | لوازم شنا (پوشاک) | `size`, `gender`, `material` |
| `swimming_accessory` | لوازم جانبی شنا | — |
| `barbell` | هالتر | `weight`, `material` |
| `pull_up_bar` | میله بارفیکس | `material`, `maxWeight` |
| `resistance_band` | کش مقاومتی | `material`, `resistanceLevel` |
| `yoga_mat` | مت یوگا | `weight`, `material`, `thickness` |
| `fitness_other` | تجهیزات بدنسازی عمومی | `weight`, `material` |
| `glove` | دستکش | — |
| `band` | زانوبند/بند | — |
| `racket` | راکت | — |
| `accessory` | لوازم جانبی عمومی | — |
| `net` | تور | — |
| `football_net` | تور فوتبال (اختصاصی) | — |
| `other` | سایر محصولات | — |

> اگه یه محصول کاملاً جدید و خاص می‌خواید که تو این لیست نیست، بهترین گزینه اینه که نزدیک‌ترین
> `type` موجود رو براش انتخاب کنید (مثلاً برای یه وسیله‌ی بدنسازی جدید از `fitness_other` استفاده کنید).

---

## 🎨 مقادیر معتبر برای فیلدهای خاص

**`brand`** یکی از این مقادیر:
`adidas`, `nike`, `puma`, `asics`, `fila`, `speedo`, `yonex`, `spalding`, `molten`, `mikasa`,
`gold_cup`, `fox`, `gampo`, `prima`, `magista`, `yakawama`, `body_craft`, `beta`, `yas`, `santana`,
`alex`, `lp`, `other`

**`colors`** (آرایه‌ای از این مقادیر):
`white`, `black`, `red`, `blue`, `green`, `yellow`, `orange`, `purple`, `pink`, `gray`

**`gender`** (برای پوشاک):
`men`, `women`, `unisex`, `kids`

**`size`** (برای پوشاک؛ برای توپ‌ها یه عدد ساده مثل `5` هست، نه از این لیست):
`XS`, `S`, `M`, `L`, `XL`, `XXL`, `XXXL`, `KIDS_S`, `KIDS_M`, `KIDS_L`

**`material`** (برای توپ‌ها):
`leather`, `pu`, `pvc`, `rubber`, `composite`
(برای دمبل/تجهیزات بدنسازی/تور، می‌تونید هر متن دلخواهی هم بذارید، مثلاً `"آهن روکش‌دار"`)

**`terrain`** (برای کفش فوتبال):
`natural`, `artificial`, `indoor`, `outdoor`

**`footballType`** (برای توپ فوتبال):
`training`, `match`, `beach`, `futsal`

**`shoeSize`**: یه عدد ساده بین ۳۶ تا ۴۸

**`stockStatus`**:
`available` (موجود), `out_of_stock` (ناموجود), `pre_order` (پیش‌سفارش), `limited` (موجودی محدود)

---

## ❌ حذف یک محصول

کافیه اون آبجکت (یا ردیف اکسل) رو کامل پاک کنید.

---

## 🛠 اگه یه اشتباهی تو JSON پیش بیاد چی میشه؟

اگه فرمت JSON خراب بشه (مثلاً یه ویرگول کم/زیاد باشه)، سایت لیست محصولات رو خالی نشون میده و تو
Console مرورگر (F12) یه پیغام خطا می‌بینید. برای جلوگیری از این مشکل:
- بعد از ادیت، فایل رو تو یه ابزار آنلاین مثل [jsonlint.com](https://jsonlint.com) چک کنید، یا
- از همون مسیر Excel استفاده کنید (کمتر جا برای اشتباه داره).

---

## 📁 فایل‌های مرتبط

- `data/products.json` — منبع اصلی داده (همینو ادیت کنید)
- `data/products.xlsx` — همون دیتا به فرمت اکسل (اختیاری، برای راحتی ادیت)
- `tools/excel-json-converter.html` — ابزار تبدیل بین این دوتا
- `js/services/ProductFactory.js` — کدی که JSON رو به محصول واقعی تبدیل می‌کنه (لازم نیست دستش بزنید)
