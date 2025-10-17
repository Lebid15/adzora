# Adzora

## Backend (Django)
- `cd backend`
- إنشاء بيئة افتراضية: `python -m venv .venv`
- تفعيل البيئة (PowerShell): `.\.venv\Scripts\Activate.ps1`
- تثبيت الاعتمادات: `pip install -r requirements.txt`
- تطبيق الهجرات: `python manage.py migrate`
- تشغيل الخادم: `python manage.py runserver`
- لوحة التحكم الإدارية: `http://127.0.0.1:8000/admin/`

### متغيرات البيئة المقترحة
- `DJANGO_DEBUG` (اختياري) لتغيير وضع التصحيح
- `DJANGO_ALLOWED_HOSTS` مفصولة بفواصل عند التحضير للنشر
- `DJANGO_SECRET_KEY` عند الخروج من بيئة التطوير

## Frontend (React + Vite)
- `cd frontend`
- تثبيت الاعتمادات: `npm install`
- تشغيل طور التطوير: `npm run dev` (سيتوفر على `http://127.0.0.1:3000`)
- تغيير عنوان الـAPI عبر ملف `.env.local` (أنشئه إن لزم) مثال: `VITE_API_BASE_URL=http://127.0.0.1:8000/api`
- بناء نسخة الإنتاج: `npm run build`

## الأوامر المفيدة
- اختبارات Django: `python manage.py test`
- فحص ESLint: `npm run lint`

## ملاحظات
- قاعدة البيانات الافتراضية موجودة في `backend/db.sqlite3`
- تأكد من رفع ملفات البيئة الحساسة إلى `.gitignore`