# 🌐 إعداد DNS في Namecheap لـ Vercel

## 📋 الخطوات التفصيلية

### الخطوة 1: الوصول إلى إعدادات DNS

1. اذهب إلى [Namecheap Dashboard](https://ap.www.namecheap.com/dashboard)
2. اذهب إلى **Domain List**
3. انقر على **Manage** بجانب `adzora.net`
4. انتقل إلى تبويب **Advanced DNS**

---

### الخطوة 2: حذف السجلات القديمة

**احذف فقط السجلات التالية إذا وجدتها:**

❌ سجلات A Record القديمة (التي تشير للاستضافة القديمة)
❌ سجلات CNAME للـ www القديمة
❌ أي سجلات خاصة بـ cPanel أو الاستضافة المشتركة

**⚠️ لا تحذف هذه:**

✅ MX Records (سجلات البريد الإلكتروني)
✅ TXT Records (خاصة بالتحقق)
✅ NS Records (خوادم الأسماء)

---

### الخطوة 3: إضافة سجلات Vercel

بعد نشر المشروع على Vercel، أضف هذه السجلات:

#### **A Record للدومين الرئيسي**

| Type | Host | Value         | TTL       |
|------|------|---------------|-----------|
| A    | @    | 76.76.21.21   | Automatic |

#### **CNAME Record للـ www**

| Type  | Host | Value                | TTL       |
|-------|------|----------------------|-----------|
| CNAME | www  | cname.vercel-dns.com | Automatic |

---

### الخطوة 4: التحقق من الإعدادات

بعد حفظ التغييرات:

1. انتظر 5-30 دقيقة لانتشار DNS
2. تحقق من الإعدادات باستخدام:

```powershell
# في PowerShell
nslookup adzora.net
nslookup www.adzora.net
```

**النتيجة المتوقعة:**
- `adzora.net` يجب أن يشير إلى `76.76.21.21`
- `www.adzora.net` يجب أن يشير إلى Vercel

---

## 📊 مثال على الإعدادات النهائية

### ما يجب أن يظهر في Advanced DNS:

```
HOST RECORDS
┌──────┬──────────┬──────────────────────┬───────────┐
│ Type │ Host     │ Value                │ TTL       │
├──────┼──────────┼──────────────────────┼───────────┤
│ A    │ @        │ 76.76.21.21          │ Automatic │
│ CNAME│ www      │ cname.vercel-dns.com │ Automatic │
└──────┴──────────┴──────────────────────┴───────────┘

MAIL SETTINGS (إذا كانت موجودة - لا تحذفها)
┌──────┬──────────┬──────────────────────┬──────────┬───────────┐
│ Type │ Host     │ Value                │ Priority │ TTL       │
├──────┼──────────┼──────────────────────┼──────────┼───────────┤
│ MX   │ @        │ mail.adzora.net      │ 10       │ Automatic │
└──────┴──────────┴──────────────────────┴──────────┴───────────┘
```

---

## 🔧 إعدادات إضافية (اختيارية)

### إعادة التوجيه من www إلى non-www

في Vercel (بعد النشر):
- اذهب إلى **Settings** → **Domains**
- أضف كل من `adzora.net` و `www.adzora.net`
- اختر أيهما Domain رئيسي
- Vercel ستحول تلقائياً من الآخر

---

## ⚠️ ملاحظات مهمة

### **لا تغير:**
- ❌ Nameservers (خوادم الأسماء)
- ❌ Domain Lock
- ❌ Auto-Renew (التجديد التلقائي)

### **يمكنك تعديل:**
- ✅ A Records
- ✅ CNAME Records
- ✅ إضافة TXT Records للتحقق

---

## 🆘 استكشاف الأخطاء

### المشكلة: الموقع لا يعمل بعد تغيير DNS

**الحل:**
1. تأكد من مرور 30 دقيقة على الأقل
2. امسح DNS Cache:
   ```powershell
   ipconfig /flushdns
   ```
3. جرب في متصفح خفي (Incognito)
4. تحقق من الإعدادات في Vercel

### المشكلة: SSL Certificate Error

**الحل:**
- انتظر حتى 24 ساعة
- Vercel تصدر SSL تلقائياً بعد التحقق من DNS
- تأكد من إضافة Domain في Vercel Dashboard

### المشكلة: "DNS_PROBE_FINISHED_NXDOMAIN"

**الحل:**
- السجلات غير صحيحة
- راجع قيم A Record و CNAME
- تأكد من استخدام `@` للـ host وليس `adzora.net`

---

## ✅ قائمة التحقق النهائية

قبل إغلاق الصفحة، تأكد من:

- [ ] A Record (`@` → `76.76.21.21`)
- [ ] CNAME Record (`www` → `cname.vercel-dns.com`)
- [ ] حفظ التغييرات (Save All Changes)
- [ ] سجلات البريد (MX) لم تُحذف
- [ ] Domain في Vercel مضاف ومُفعّل

---

## 🚀 الخطوة التالية

بعد إعداد DNS:
1. انتظر 5-30 دقيقة
2. افتح https://adzora.net
3. تحقق من عمل HTTPS
4. جرب www.adzora.net أيضاً
5. 🎉 استمتع بموقعك السريع!

---

**تاريخ آخر تحديث:** 18 أكتوبر 2025
**المرجع:** [Vercel Custom Domains Guide](https://vercel.com/docs/concepts/projects/custom-domains)
