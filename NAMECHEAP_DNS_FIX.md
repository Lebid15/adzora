# 🔧 حل مشكلة "Invalid Configuration" في Vercel + Namecheap DNS

## المشكلة
- النطاقات `adzora.net` و `www.adzora.net` تظهر "Invalid Configuration" في Vercel
- تبويب Advanced DNS في Namecheap فارغ ويطلب إعادة DNS إلى BasicDNS

---

## ✅ الحل: خطوات مفصلة

### الخطوة 1: إعادة DNS إلى Namecheap BasicDNS

1. سجّل دخول إلى Namecheap
2. اذهب إلى **Domain List** → انقر على `adzora.net`
3. اذهب إلى تبويب **Domain** (أو **Details**)
4. في قسم **NAMESERVERS**:
   - ستجد خيارات مثل:
     - ☑️ **Namecheap BasicDNS** ← اختر هذا
     - ⬜ Custom DNS
     - ⬜ Namecheap PremiumDNS
5. انقر **✓ Save** أو **Confirm**
6. انتظر 1-2 دقيقة

---

### الخطوة 2: إضافة سجلات DNS في Advanced DNS

بعد تفعيل BasicDNS، ارجع إلى تبويب **Advanced DNS**:

#### ✅ إضافة A Record للنطاق الجذر (adzora.net)

1. انقر **+ ADD NEW RECORD**
2. املأ:
   - **Type**: `A Record`
   - **Host**: `@`
   - **Value**: `76.76.21.21` (IP الخاص بـ Vercel)
   - **TTL**: `Automatic` (أو 1 min)
3. انقر **✓ Save**

#### ✅ إضافة CNAME Record للنطاق الفرعي (www.adzora.net)

1. انقر **+ ADD NEW RECORD**
2. املأ:
   - **Type**: `CNAME Record`
   - **Host**: `www`
   - **Value**: `cname.vercel-dns.com` (أو السجل المحدد من Vercel مثل `c30aa31d386008da.vercel-dns.com`)
   - **TTL**: `Automatic`
3. انقر **✓ Save**

---

### الخطوة 3: التحقق في Vercel

1. اذهب إلى [Vercel Dashboard](https://vercel.com/dashboard)
2. افتح مشروع `adzora`
3. اذهب إلى **Settings** → **Domains**
4. ستجد:
   - `adzora.net` → بعد 5-10 دقائق ستتحول إلى ✅ Valid Configuration
   - `www.adzora.net` → ستتحول إلى ✅ Valid Configuration

---

## 📋 جدول السجلات النهائي

| Type    | Host | Value                              | TTL       |
|---------|------|------------------------------------|-----------|
| A       | @    | `76.76.21.21`                      | Automatic |
| CNAME   | www  | `cname.vercel-dns.com`             | Automatic |

---

## 🧪 اختبار الربط

بعد الإعداد، افتح PowerShell واختبر:

```powershell
# اختبار A Record للنطاق الجذر
nslookup adzora.net

# اختبار CNAME للنطاق الفرعي
nslookup www.adzora.net
```

**النتيجة المتوقعة:**
```
Name:    adzora.net
Address: 76.76.21.21

www.adzora.net
canonical name = cname.vercel-dns.com
```

---

## ⏱️ الجدول الزمني

- **فوراً (1-2 دقيقة)**: إعادة DNS إلى BasicDNS
- **5-10 دقائق**: Vercel يكتشف السجلات ويُظهر ✅ Valid
- **30 دقيقة - 2 ساعة**: الموقع يعمل على النطاق
- **حتى 48 ساعة**: انتشار DNS كامل عالمياً (نادراً)

---

## 🎯 النتيجة النهائية

بعد اكتمال الخطوات:
- ✅ https://adzora.net → يعمل
- ✅ https://www.adzora.net → يعمل (يُعاد توجيهه من Vercel)
- ✅ https://adzora-mu.vercel.app → يعمل (النطاق الافتراضي)

---

## 🆘 استكشاف الأخطاء

### "Invalid Configuration" لم تختفِ بعد 15 دقيقة؟

1. **تحقق من قيم السجلات:**
   - A Record: يجب أن يكون `76.76.21.21` بالضبط
   - CNAME: يجب أن يكون `cname.vercel-dns.com` أو السجل الخاص الذي قدمته Vercel

2. **احذف وأعد إضافة النطاقات في Vercel:**
   ```
   Settings → Domains → Remove Domain
   ثم Add Domain مجدداً
   ```

3. **تحقق من Nameservers:**
   ```powershell
   nslookup -type=NS adzora.net
   ```
   يجب أن يُظهر nameservers من Namecheap مثل:
   - `dns1.registrar-servers.com`
   - `dns2.registrar-servers.com`

---

## 📚 مصادر إضافية

- [Vercel Custom Domains Guide](https://vercel.com/docs/concepts/projects/domains)
- [Namecheap DNS Setup](https://www.namecheap.com/support/knowledgebase/article.aspx/767/10/how-to-change-dns-for-a-domain/)

---

**آخر تحديث:** 18 أكتوبر 2025
