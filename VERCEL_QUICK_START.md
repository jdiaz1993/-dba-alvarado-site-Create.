# ⚡ Deploy to Vercel - Quick Start (10 Minutes)

## 🎯 Super Quick Version

### 1️⃣ Push to GitHub (3 minutes)

```bash
cd "c:\Users\diazj\OneDrive\Desktop\projects\DBA Personalizations\dba-personalization"

git init
git add .
git commit -m "Ready to deploy"
git remote add origin https://github.com/YOUR_USERNAME/dba-personalizations.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

### 2️⃣ Deploy to Vercel (3 minutes)

1. **Go to** [vercel.com](https://vercel.com)
2. **Sign in** with GitHub
3. **Click** "Add New..." → "Project"
4. **Import** your repository
5. **Add Environment Variables**:

```
STRIPE_SECRET_KEY = sk_test_your_key_here
NEXT_PUBLIC_SITE_URL = https://your-project.vercel.app
NOTIFICATION_EMAIL = DBA.alvarado@gmail.com
```

6. **Click** "Deploy"
7. **Wait** 2-3 minutes
8. **Done!** 🎉

---

### 3️⃣ Test Your Live Site (2 minutes)

1. **Click** "Visit" on Vercel
2. **Browse** your site
3. **Test** custom order flow
4. **Verify** cart works

---

## ⚠️ Important Notes

### Database Won't Work on Vercel

Your SQLite cart backend won't work on Vercel (serverless environment).

**Quick Fix**: Cart will work in browser only (no persistence between devices)

**Better Fix Later**: Use Vercel Postgres or Vercel KV for cart persistence

### For Now:

✅ **What Works**:
- All pages
- Navigation
- Custom orders
- Stripe checkout
- Contact form
- Images

⚠️ **What Needs Update** (optional):
- Cart persistence across devices
- Order logging

**Don't worry!** Your site will work fine. Stripe Dashboard shows all orders anyway.

---

## 🔑 Environment Variables You Need

Copy these to Vercel:

```
STRIPE_SECRET_KEY=sk_test_51...your_actual_key
NEXT_PUBLIC_SITE_URL=https://your-vercel-url.vercel.app
NOTIFICATION_EMAIL=DBA.alvarado@gmail.com
```

(You can skip RESEND_API_KEY for now since email isn't working yet)

---

## 🎉 After Deployment

### Your Live Site:
```
https://dba-personalizations.vercel.app
```
(or whatever name you chose)

### Share With Customers:
- Put on business cards
- Share on social media
- Add to email signature

### Monitor:
- Vercel Dashboard for errors
- Stripe Dashboard for payments
- Your email for contact forms

---

## 🔄 Making Updates

After deployment, to update your site:

```bash
# Make your changes locally
git add .
git commit -m "Updated prices"
git push

# Vercel automatically redeploys!
```

Takes 30 seconds to go live.

---

## 💰 Switching to Live Payments

When ready for real customers:

### 1. In Stripe Dashboard:
- Switch to Live mode
- Complete verification
- Get live API key

### 2. In Vercel:
- Update `STRIPE_SECRET_KEY` to live key (`sk_live_...`)
- Redeploy

### 3. Test:
- Make small test purchase with real card
- Verify payment received

---

## 📱 Custom Domain (Optional)

### Add Your Domain:

1. **Buy domain** (dbaalvarado.com)
2. **Vercel** → Domains → Add
3. **Update DNS** records
4. **Wait** for verification
5. **Your site** now at dbaalvarado.com

---

## ✅ Final Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables added
- [ ] First deployment successful
- [ ] Site loads correctly
- [ ] Stripe checkout tested
- [ ] Ready to accept customers!

---

**Let's deploy!** 🚀

Your DBA Personalizations website will be live in 10 minutes!
