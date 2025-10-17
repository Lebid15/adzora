# دليل التخصيص السريع - Adzora

## 🎨 تغيير ألوان الموقع

افتح الملف: `frontend/src/App.css`

ابحث عن:
```css
:root {
  --color-background: #ffffff;  /* لون الخلفية */
  --color-surface: #f3f4f6;     /* لون الأسطح (Header, Cards) */
  --color-text: #111827;         /* لون النص */
  --color-accent: #f97316;       /* اللون المميز (Buttons, Links) */
}
```

**أمثلة:**

### ثيم أزرق:
```css
--color-background: #f0f9ff;
--color-surface: #e0f2fe;
--color-text: #0c4a6e;
--color-accent: #0ea5e9;
```

### ثيم داكن:
```css
--color-background: #0f172a;
--color-surface: #1e293b;
--color-text: #f1f5f9;
--color-accent: #38bdf8;
```

---

## 🔗 تغيير روابط القائمة (Header)

افتح الملف: `frontend/src/App.jsx`

ابحث عن (السطور 6-11):
```javascript
const FIXED_NAV_LINKS = [
  { label: 'Home', url: '#home' },
  { label: 'About', url: '#about' },
  { label: 'Services', url: '#services' },
  { label: 'Contact', url: '#contact' },
]
```

**للتعديل:**
```javascript
const FIXED_NAV_LINKS = [
  { label: 'الرئيسية', url: '/' },
  { label: 'من نحن', url: '/about' },
  { label: 'خدماتنا', url: '/services' },
  { label: 'المعرض', url: '#gallery' },
  { label: 'تواصل معنا', url: '/contact' },
]
```

---

## 📝 تغيير نص الفوتر

افتح الملف: `frontend/src/App.jsx`

ابحث عن (السطر 14):
```javascript
const FIXED_FOOTER_TEXT = '© 2025 Adzora. All rights reserved.'
```

**للتعديل:**
```javascript
const FIXED_FOOTER_TEXT = '© 2025 شركة أدزورا. جميع الحقوق محفوظة.'
```

---

## 🎬 تغيير عنوان القسم المميز

افتح الملف: `frontend/src/App.jsx`

ابحث عن (السطر ~62):
```javascript
<h1>Featured Showcase</h1>
```

**للتعديل:**
```javascript
<h1>أحدث أعمالنا</h1>
```

وأيضاً ابحث عن (السطر ~64):
```javascript
<p>
  {featuredVideo?.description ||
    "Adzora crafts immersive media activations blending film and interactive storytelling."}
</p>
```

**للتعديل:**
```javascript
<p>
  {featuredVideo?.description ||
    "نقدم حلول إعلامية مبتكرة تجمع بين الفيديو والتصميم التفاعلي."}
</p>
```

---

## 🖼️ تغيير عنوان المعرض

افتح الملف: `frontend/src/App.jsx`

ابحث عن (السطر ~100):
```javascript
<h2 id="gallery-heading">Recent visuals</h2>
<p>Highlight posters, visuals, and infographics from your creative archive.</p>
```

**للتعديل:**
```javascript
<h2 id="gallery-heading">معرض الأعمال</h2>
<p>مجموعة مختارة من تصاميمنا وملصقاتنا الإبداعية.</p>
```

---

## 📱 إضافة روابط التواصل الاجتماعي

1. افتح المتصفح واذهب إلى: `http://127.0.0.1:8000/admin/`
2. سجّل الدخول
3. اذهب إلى: **Content** → **Social Links**
4. اضغط **Add Social Link**
5. املأ البيانات:
   - **Platform**: اسم المنصة (مثل: WhatsApp)
   - **URL**: الرابط الكامل (مثل: https://wa.me/966500000000)
   - **Icon**: (اختياري) CSS class للأيقونة
   - **Order**: ترتيب الظهور (0, 1, 2, ...)

**أمثلة:**
- Instagram: `https://instagram.com/username`
- Facebook: `https://facebook.com/pagename`
- WhatsApp: `https://wa.me/966500000000`
- Telegram: `https://t.me/username`
- Twitter/X: `https://twitter.com/username`
- LinkedIn: `https://linkedin.com/company/name`

---

## 🎥 إدارة الفيديوهات

1. من لوحة التحكم، اذهب إلى: **Media Library** → **Videos**
2. اضغط **Add Video**
3. املأ البيانات:
   - **Title**: عنوان الفيديو
   - **Description**: وصف مختصر
   - **Thumbnail**: صورة مصغرة
   - **Embed URL**: رابط YouTube/Vimeo (مثال: `https://www.youtube.com/embed/VIDEO_ID`)
   - **Video File**: أو رفع ملف فيديو مباشرة
   - **Featured**: ✓ لجعله الفيديو المميز (يظهر في الصفحة الرئيسية)

---

## 🖼️ إدارة معرض الصور

1. من لوحة التحكم، اذهب إلى: **Media Library** → **Image Assets**
2. اضغط **Add Image Asset**
3. املأ البيانات:
   - **Title**: عنوان الصورة
   - **File**: ارفع الصورة
   - **Category**: اختر تصنيف (أو أنشئ جديد)
   - **Tags**: أضف وسوم للبحث
   - **Featured**: ✓ لجعلها مميزة (تظهر أولاً)

---

## 💾 حفظ التعديلات

### بعد تعديل ملفات Frontend:
```bash
# لا يتطلب إعادة تشغيل - التغييرات تطبق تلقائياً
# إذا لم تظهر التغييرات، أعد تحميل الصفحة (F5)
```

### بعد تعديل لوحة التحكم:
```bash
# التغييرات تظهر مباشرة على الموقع
# أعد تحميل الصفحة لرؤية التحديثات
```

---

## 🔍 نصائح سريعة

1. **استخدم ألوان متناسقة**: استخدم أدوات مثل [coolors.co](https://coolors.co) لاختيار لوحة ألوان
2. **احفظ نسخة احتياطية**: قبل التعديلات الكبيرة، احفظ الملفات الأصلية
3. **اختبر التغييرات**: بعد كل تعديل، تحقق من المظهر على الموقع
4. **استخدم Git**: احفظ التغييرات بانتظام باستخدام Git

---

## ❓ المساعدة

إذا واجهت مشكلة، راجع ملف `CHANGES.md` للتفاصيل التقنية الكاملة.
