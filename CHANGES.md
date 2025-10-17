# تغييرات البنية - Adzora Project

## 📋 ملخص التعديلات

تم تحويل المشروع من **موقع قابل للتخصيص بالكامل** إلى **موقع بتصميم ثابت** مع إمكانية إدارة المحتوى فقط.

---

## ✅ ما هو قابل للتخصيص من لوحة التحكم

### 1. **إعدادات الموقع** (`Site Configuration`)
- اسم الموقع (Site Name)
- اللوغو (Logo)
- الشعار/العبارة (Tagline)

### 2. **روابط التواصل الاجتماعي** (`Social Links`)
- إضافة/تعديل/حذف روابط (Instagram, Facebook, WhatsApp, Telegram, etc.)
- ترتيب الروابط
- اختيار أيقونة لكل رابط

### 3. **مكتبة الفيديوهات** (`Videos`)
- رفع فيديوهات أو إضافة روابط embed
- تحديد فيديو مميز
- إضافة عناوين ووصف
- تصنيف الفيديوهات

### 4. **معرض الصور** (`Image Gallery`)
- رفع الصور والملصقات
- تصنيف الصور
- إضافة وسوم (Tags)
- تحديد صور مميزة

---

## ❌ ما هو ثابت في الكود (غير قابل للتخصيص)

### 1. **روابط الـ Header/Navigation**
- موجودة في: `frontend/src/App.jsx`
- السطور: 6-11
```javascript
const FIXED_NAV_LINKS = [
  { label: 'Home', url: '#home' },
  { label: 'About', url: '#about' },
  { label: 'Services', url: '#services' },
  { label: 'Contact', url: '#contact' },
]
```

**لتعديلها:** قم بتعديل هذا الثابت مباشرة في الكود.

### 2. **نص الـ Footer**
- موجود في: `frontend/src/App.jsx`
- السطر: 14
```javascript
const FIXED_FOOTER_TEXT = '© 2025 Adzora. All rights reserved.'
```

**لتعديله:** قم بتعديل هذا الثابت مباشرة في الكود.

### 3. **عنوان القسم المميز**
- موجود في: `frontend/src/App.jsx`
- السطر: 62
```javascript
<h1>Featured Showcase</h1>
```

**لتعديله:** قم بتعديل النص مباشرة في الكود.

### 4. **ألوان الموقع والثيم**
- موجودة في: `frontend/src/App.css`
- السطور: 8-12
```css
:root {
  --color-background: #ffffff;
  --color-surface: #f3f4f6;
  --color-text: #111827;
  --color-accent: #f97316;
}
```

**لتعديلها:** قم بتعديل قيم الألوان مباشرة في CSS.

---

## 🔧 التعديلات التقنية

### Backend (Django)
✅ **تم حذف:**
- نموذج `NavigationLink` - لأن الروابط ثابتة الآن
- نموذج `ThemeSettings` - لأن الألوان ثابتة الآن
- حقول `featured_video_heading` و `footer_text` من `SiteConfiguration`

✅ **تم الإبقاء على:**
- نموذج `SiteConfiguration` (مبسّط)
- نموذج `SocialLink` (كامل)
- نماذج `Video`, `ImageAsset`, `Category`, `Tag`

### Frontend (React)
✅ **تم حذف:**
- نظام الثيم الديناميكي (light/dark mode toggle)
- سحب Navigation من API
- سحب Theme colors من API
- سحب Footer text من API

✅ **تم إضافة:**
- روابط Navigation ثابتة في الكود
- نص Footer ثابت
- ألوان ثابتة في CSS

### API Changes
**نقطة النهاية `/api/`** الآن ترجع فقط:
```json
{
  "site": {
    "site_name": "...",
    "tagline": "...",
    "logo_url": "..."
  },
  "social": [...],
  "featured_video": {...},
  "gallery": [...]
}
```

---

## 📝 كيفية التخصيص المستقبلي

### لتغيير روابط Header:
1. افتح: `frontend/src/App.jsx`
2. عدّل `FIXED_NAV_LINKS`
3. احفظ الملف

### لتغيير ألوان الموقع:
1. افتح: `frontend/src/App.css`
2. عدّل متغيرات CSS في `:root`
3. احفظ الملف

### لتغيير نص Footer:
1. افتح: `frontend/src/App.jsx`
2. عدّل `FIXED_FOOTER_TEXT`
3. احفظ الملف

### لإضافة روابط تواصل اجتماعي:
1. ادخل إلى: `http://127.0.0.1:8000/admin/`
2. اذهب إلى: `Content` → `Social Links`
3. اضغط `Add Social Link`
4. املأ البيانات واحفظ

---

## 🚀 التشغيل بعد التعديلات

### Backend:
```bash
cd backend
python manage.py runserver
```

### Frontend:
```bash
cd frontend
npm run dev
```

---

## ⚠️ ملاحظات مهمة

1. **قاعدة البيانات:** تم تطبيق Migration لحذف الجداول غير المستخدمة
2. **الكود القديم:** البيانات القديمة للـ Navigation و Theme تم حذفها من قاعدة البيانات
3. **التوافق:** الموقع الآن أبسط وأسهل في الصيانة
4. **الأداء:** تحسن الأداء لأن البيانات الثابتة لا تُسحب من API

---

## 📊 البنية الجديدة

```
┌─────────────────────────────────────────┐
│          Django Admin Panel             │
│  (يمكن التعديل من هنا فقط)              │
├─────────────────────────────────────────┤
│  ✓ Site Name, Logo, Tagline            │
│  ✓ Social Links                         │
│  ✓ Videos (with featured)               │
│  ✓ Images/Gallery (with tags)           │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│            React Frontend               │
│  (روابط وألوان ثابتة في الكود)          │
├─────────────────────────────────────────┤
│  ✗ Navigation (hardcoded)               │
│  ✗ Footer Text (hardcoded)              │
│  ✗ Colors/Theme (hardcoded)             │
│  ✗ Section Titles (hardcoded)           │
└─────────────────────────────────────────┘
```

---

تاريخ التعديل: 17 أكتوبر 2025
