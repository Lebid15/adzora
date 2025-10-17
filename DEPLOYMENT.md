# دليل النشر - Adzora Deployment Guide

## 🌐 إعدادات الدومين الحالية

### معلومات الدومين:
- **Domain:** `adzora.net`
- **Registrar:** Namecheap
- **Hosting:** Namecheap Shared Hosting
- **Server:** server196.web-hosting.com

### DNS Settings (مفترض):
```
A Record:    @         →  [IP من Namecheap]
CNAME:       www       →  adzora.net
```

---

## 📦 البنية الحالية

```
Frontend (React + Vite)
    ↓
    يحتاج Backend API
    ↓
Backend (Django) → حالياً محلي فقط!
```

---

## ⚠️ المشكلة الحالية

**Frontend منشور على:** `https://adzora.net`
**Backend موجود على:** `http://127.0.0.1:8000` (محلي فقط!)

**النتيجة:** الموقع لن يعمل لأن API غير متاح على الإنترنت!

---

## 🔧 الحلول المقترحة

### الحل الأول: Backend على PythonAnywhere (مجاني) ⭐

#### الخطوات:

1. **إنشاء حساب على PythonAnywhere**
   - اذهب إلى: https://www.pythonanywhere.com
   - أنشئ حساب مجاني (Beginner Account)
   - Username مثال: `adzora`

2. **رفع Backend**
   ```bash
   # على PythonAnywhere Console
   git clone https://github.com/Lebid15/adzora.git
   cd adzora/backend
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py createsuperuser
   ```

3. **إعداد Web App**
   - WSGI file: `/var/www/adzora_pythonanywhere_com_wsgi.py`
   - Working directory: `/home/adzora/adzora/backend`
   - Python version: 3.10+

4. **إعدادات Django**
   ```python
   # في settings.py
   ALLOWED_HOSTS = ['adzora.pythonanywhere.com', 'adzora.net']
   
   CORS_ALLOWED_ORIGINS = [
       'https://adzora.net',
       'https://www.adzora.net',
   ]
   ```

5. **تعديل Frontend API URL**
   ```javascript
   // في frontend/src/api/client.js
   const API_BASE_URL = 'https://adzora.pythonanywhere.com/api'
   ```

6. **النتيجة النهائية:**
   - Frontend: `https://adzora.net`
   - Backend API: `https://adzora.pythonanywhere.com/api`
   - Admin: `https://adzora.pythonanywhere.com/admin`

---

### الحل الثاني: كل شيء على Namecheap

#### المتطلبات:
✅ يجب أن يدعم Namecheap Python/Django
✅ الوصول إلى SSH
✅ إمكانية إعداد Python App

#### الخطوات:
1. تحقق من دعم Python في cPanel
2. إذا كان مدعوم:
   - Setup Python App (version 3.10+)
   - رفع كل المشروع
   - إعداد Virtual Environment
   - تشغيل Django

---

### الحل الثالث: استخدام Vercel للـ Frontend

#### الخطوات:
1. ربط GitHub مع Vercel
2. استيراد المشروع
3. Root directory: `frontend`
4. Build command: `npm run build`
5. Output directory: `dist`
6. Environment Variables:
   ```
   VITE_API_BASE_URL=https://your-backend.com/api
   ```

---

## 🚀 الحل الموصى به (خطوة بخطوة)

### المرحلة 1: نشر Backend على PythonAnywhere

1. **إنشاء حساب:**
   - https://www.pythonanywhere.com/registration/register/beginner/

2. **من Dashboard → Files → Upload a file:**
   - أو استخدم Git:
   ```bash
   git clone https://github.com/Lebid15/adzora.git
   ```

3. **من Dashboard → Consoles → Bash:**
   ```bash
   cd adzora/backend
   mkvirtualenv --python=/usr/bin/python3.10 adzora-env
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py createsuperuser
   python manage.py collectstatic
   ```

4. **من Dashboard → Web → Add a new web app:**
   - Manual configuration
   - Python 3.10
   - WSGI file location: تعديله ليشير إلى مشروعك

5. **تعديل WSGI file:**
   ```python
   import os
   import sys
   
   path = '/home/YOURUSERNAME/adzora/backend'
   if path not in sys.path:
       sys.path.append(path)
   
   os.environ['DJANGO_SETTINGS_MODULE'] = 'adzora_backend.settings'
   
   from django.core.wsgi import get_wsgi_application
   application = get_wsgi_application()
   ```

6. **Reload Web App**

### المرحلة 2: تعديل Frontend للاتصال بـ Backend الجديد

في ملف `frontend/src/api/client.js`:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
                    'https://YOURUSERNAME.pythonanywhere.com/api'
```

### المرحلة 3: نشر Frontend على Namecheap

الملف `.github/workflows/deploy-frontend.yml` جاهز!

عند `git push`، سيتم:
1. بناء Frontend تلقائياً
2. رفعه على `https://adzora.net`

---

## 📋 Checklist قبل النشر

### Backend (Django):
- [ ] تغيير `DEBUG = False`
- [ ] تغيير `SECRET_KEY`
- [ ] إعداد `ALLOWED_HOSTS`
- [ ] إعداد `CORS_ALLOWED_ORIGINS`
- [ ] تشغيل `collectstatic`
- [ ] تشغيل `migrate`
- [ ] إنشاء superuser

### Frontend (React):
- [ ] تحديث `API_BASE_URL`
- [ ] اختبار `npm run build`
- [ ] التأكد من `.env.production`

### GitHub Actions:
- [ ] التأكد من Secrets:
  - `SFTP_HOST`
  - `SFTP_USER`
  - `SFTP_PASS`

---

## 🔐 GitHub Secrets المطلوبة

في GitHub Repository → Settings → Secrets:

```
SFTP_HOST     = server196.web-hosting.com
SFTP_USER     = deploy@adzora.net
SFTP_PASS     = [كلمة المرور من Namecheap]
```

---

## 🧪 الاختبار

### Backend:
```bash
curl https://YOURUSERNAME.pythonanywhere.com/api/homepage/
```

### Frontend:
```bash
# افتح المتصفح
https://adzora.net
```

---

## 📞 الدعم

**PythonAnywhere:**
- Forums: https://www.pythonanywhere.com/forums/
- Help: https://help.pythonanywhere.com/

**Namecheap:**
- Support: https://www.namecheap.com/support/

---

## 📅 تاريخ التحديث
17 أكتوبر 2025
