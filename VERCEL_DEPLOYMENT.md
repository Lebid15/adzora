# 🚀 دليل النشر على Vercel

## الخطوة 1: حذف المشروع القديم من Vercel

1. افتح [Vercel Dashboard](https://vercel.com/dashboard)
2. اذهب إلى المشروع القديم (adzora)
3. اذهب إلى **Settings** → **General**
4. اسحب للأسفل وانقر على **Delete Project**
5. اكتب اسم المشروع للتأكيد واحذف

---

## الخطوة 2: دفع الكود الجديد إلى GitHub

```powershell
# من مجلد D:\adzora
git add .
git commit -m "✨ Complete Next.js migration with professional structure"
git push origin main
```

---

## الخطوة 3: إنشاء مشروع جديد في Vercel

1. افتح [Vercel Dashboard](https://vercel.com/new)
2. انقر على **Import Git Repository**
3. اختر **Lebid15/adzora** من GitHub
4. Vercel سيكتشف Next.js تلقائياً ✨

### الإعدادات المطلوبة:
- **Framework Preset**: Next.js ✅ (تلقائي)
- **Root Directory**: `./` ✅ (تلقائي)
- **Build Command**: `npm run build` ✅ (تلقائي)
- **Output Directory**: `.next` ✅ (تلقائي)

5. انقر على **Deploy** 🚀

---

## الخطوة 4: ربط النطاق (adzora.net)

بعد نجاح النشر:

1. اذهب إلى **Settings** → **Domains**
2. انقر على **Add Domain**
3. اكتب `adzora.net`
4. Vercel سيعطيك DNS Records للإضافة في Namecheap:

### إعدادات DNS في Namecheap:

| Type  | Host | Value                        | TTL       |
|-------|------|------------------------------|-----------|
| A     | @    | 76.76.21.21                  | Automatic |
| CNAME | www  | cname.vercel-dns.com         | Automatic |

5. انتظر من 5-30 دقيقة حتى ينتشر DNS
6. ✅ الموقع سيعمل على https://adzora.net

---

## الخطوة 5: إعداد GitHub Actions (اختياري)

إذا أردت نشر تلقائي مع كل push:

1. احصل على **Vercel Token**:
   - اذهب إلى [Vercel Tokens](https://vercel.com/account/tokens)
   - أنشئ Token جديد
   - انسخ القيمة

2. احصل على **Project IDs**:
   ```bash
   npx vercel link
   # ستجد القيم في .vercel/project.json
   ```

3. أضف Secrets في GitHub:
   - اذهب إلى `Settings` → `Secrets and variables` → `Actions`
   - أضف:
     - `VERCEL_TOKEN` - من الخطوة 1
     - `VERCEL_ORG_ID` - من .vercel/project.json
     - `VERCEL_PROJECT_ID` - من .vercel/project.json

4. ✅ الآن كل push للـ main سينشر تلقائياً!

---

## 🎉 النتيجة النهائية

- ✅ موقع Next.js على https://adzora.net
- ✅ SSL مجاني من Vercel
- ✅ CDN عالمي سريع
- ✅ نشر تلقائي مع كل push
- ✅ معاينات تلقائية للـ Pull Requests

---

## 🆘 المساعدة

إذا واجهتك مشاكل:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Contact Support](https://vercel.com/support)

---

**تاريخ آخر تحديث:** 18 أكتوبر 2025
