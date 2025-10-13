# 🚀 Deploy to Vercel - Complete Guide

## ✅ Pre-Deployment Checklist

Before deploying, make sure you have:

- [x] Stripe API keys ready
- [x] Your email address (DBA.alvarado@gmail.com)
- [x] GitHub account (or create one)
- [x] All your images in the project
- [x] Tested checkout locally

---

## 📋 Step-by-Step Deployment

### Step 1: Push to GitHub (5 minutes)

#### 1.1 Create GitHub Repository

1. **Go to** [github.com](https://github.com)
2. **Click** "+" icon → "New repository"
3. **Repository name**: `dba-personalizations` (or any name)
4. **Description**: "Custom shirt printing and engraving business website"
5. **Make it Private** (recommended for business)
6. **Don't** initialize with README (you already have files)
7. **Click** "Create repository"

#### 1.2 Push Your Code

In your terminal, run these commands:

```bash
cd "c:\Users\diazj\OneDrive\Desktop\projects\DBA Personalizations\dba-personalization"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - DBA Personalizations website"

# Add GitHub as remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Note**: Replace `YOUR_USERNAME` and `REPO_NAME` with your actual GitHub username and repository name.

---

### Step 2: Deploy to Vercel (3 minutes)

#### 2.1 Sign Up for Vercel

1. **Go to** [vercel.com](https://vercel.com)
2. **Click** "Sign Up"
3. **Choose** "Continue with GitHub"
4. **Authorize** Vercel to access GitHub

#### 2.2 Import Your Project

1. **Click** "Add New..." → "Project"
2. **Find** your repository (dba-personalizations)
3. **Click** "Import"
4. **Vercel auto-detects** Next.js settings
5. **Don't click Deploy yet!** - We need to add environment variables first

---

### Step 3: Add Environment Variables (2 minutes)

In the Vercel import screen:

#### 3.1 Click "Environment Variables"

Add these variables:

**Variable 1: STRIPE_SECRET_KEY**
```
Name:  STRIPE_SECRET_KEY
Value: sk_test_your_stripe_test_key_here
```
(Later change to `sk_live_` for production)

**Variable 2: NEXT_PUBLIC_SITE_URL**
```
Name:  NEXT_PUBLIC_SITE_URL
Value: https://your-project-name.vercel.app
```
(Vercel will tell you this URL, you can update it later)

**Variable 3: NOTIFICATION_EMAIL**
```
Name:  NOTIFICATION_EMAIL
Value: DBA.alvarado@gmail.com
```

**Variable 4: RESEND_API_KEY** (optional for now)
```
Name:  RESEND_API_KEY
Value: re_your_resend_key_here
```

#### 3.2 Environment for All

- Make sure "Production", "Preview", and "Development" are ALL checked
- This ensures variables work in all environments

---

### Step 4: Deploy! (1 minute)

1. **Click** "Deploy"
2. **Wait** 2-3 minutes for build to complete
3. **You'll see** confetti when done! 🎉
4. **Click** "Visit" to see your live site

---

## 🌐 Your Live Site

Your website will be at:
```
https://your-project-name.vercel.app
```

Example:
```
https://dba-personalizations.vercel.app
```

---

## ⚙️ Important: Update Stripe URLs

After deployment, you need to update your Stripe redirect URLs:

### In Your Vercel Project:

1. **Go to** Project Settings → Environment Variables
2. **Edit** `NEXT_PUBLIC_SITE_URL`
3. **Change to** your actual Vercel URL
4. **Example**: `https://dba-personalizations.vercel.app`
5. **Save and redeploy**

### In Your Stripe Dashboard:

Your checkout URLs are automatically set in code, but verify they work:
- Success URL: `https://your-site.vercel.app/success`
- Cancel URL: `https://your-site.vercel.app/cart?canceled=1`

---

## 🗄️ Database Considerations

### SQLite Issue:

Your current SQLite database **won't work** on Vercel (serverless environment).

### Solution Options:

#### Option 1: Use Vercel Postgres (Recommended)

1. **In Vercel Dashboard** → Your Project → Storage
2. **Click** "Create Database" → "Postgres"
3. **Copy connection string**
4. **Update your database code** (I can help with this)

#### Option 2: Use Vercel KV (Simple Key-Value)

- Good for cart storage
- Simple setup
- Works immediately

#### Option 3: Keep Cart in Browser Only

- For now, cart can work with localStorage
- No database needed
- Works fine for testing

**Recommendation**: Start without database on Vercel, use Stripe Dashboard to track orders.

---

## 🔧 Post-Deployment Updates

### Update Environment Variables:

1. **Vercel Dashboard** → Your Project
2. **Click** "Settings" → "Environment Variables"
3. **Add/Edit** variables
4. **Redeploy** (automatic or manual)

### Update Code:

1. **Make changes** locally
2. **Commit**: `git add . && git commit -m "Update description"`
3. **Push**: `git push`
4. **Vercel auto-deploys** (30 seconds)

---

## 🎯 Custom Domain (Optional)

### Add Your Own Domain:

1. **Buy domain** (GoDaddy, Namecheap, etc.)
2. **Vercel Dashboard** → Domains
3. **Click** "Add Domain"
4. **Enter** your domain (dbaalvarado.com)
5. **Update DNS** records as instructed
6. **Wait** 24-48 hours for DNS propagation

---

## 📊 Monitor Your Site

### Vercel Analytics:

- **Free analytics** included
- See visitor counts
- Page performance
- Error tracking

### Access:

1. **Vercel Dashboard** → Your Project
2. **Click** "Analytics"
3. **See** real-time data

---

## 🐛 Troubleshooting

### Build Failed

**Check**:
- All dependencies in package.json
- No syntax errors (run `npm run build` locally first)
- Environment variables set correctly

### Site Loads but Features Don't Work

**Check**:
- Environment variables are set
- Stripe keys are correct
- Database considerations (SQLite won't work)

### Images Not Showing

**Check**:
- Images are in `/public` folder
- Paths start with `/` (e.g., `/assets/images/...`)
- Images are pushed to GitHub

---

## 🎨 What Works on Vercel

✅ **Working Now**:
- All pages and navigation
- Product listings
- Custom order forms
- Image uploads (client-side)
- Contact form (mailto)
- Stripe checkout
- Cart (with localStorage)

⚠️ **Needs Update**:
- Cart persistence (need cloud database)
- Order logging (use Stripe webhook instead)

---

## 📝 Quick Commands Reference

### Deploy Updates:

```bash
# Make changes to your code
git add .
git commit -m "Description of changes"
git push

# Vercel automatically deploys!
```

### Roll Back to Previous Version:

1. **Vercel Dashboard** → Deployments
2. **Find** previous working deployment
3. **Click** "..." → "Promote to Production"

### View Logs:

1. **Vercel Dashboard** → Your Project
2. **Click** "Deployments" → Select deployment
3. **Click** "Runtime Logs" to see errors

---

## 🎉 Launch Checklist

Before going live:

- [ ] All pages tested
- [ ] Stripe in TEST mode working
- [ ] Images uploaded
- [ ] Prices correct
- [ ] Contact info updated
- [ ] Deployed to Vercel
- [ ] Environment variables set
- [ ] Custom domain added (optional)
- [ ] Switch Stripe to LIVE mode
- [ ] Test real purchase
- [ ] Share link with customers!

---

## 💰 Costs

### Vercel:
- **Free tier**: Perfect for small businesses
- **Includes**: 
  - Unlimited deployments
  - SSL certificate
  - Global CDN
  - 100GB bandwidth/month
  - Basic analytics

### When to Upgrade:
- Only if you exceed free tier limits
- Most small businesses never need to

---

## 🚀 Next Steps

1. **Push code to GitHub**
2. **Import to Vercel**
3. **Add environment variables**
4. **Deploy**
5. **Test your live site**
6. **Share with customers**

Your DBA Personalizations website will be live in less than 15 minutes! 🎉

---

## 🆘 Need Help?

### Common Issues:

**"Repository not found"**
→ Make sure repo is public or Vercel has access

**"Build failed"**
→ Run `npm run build` locally first
→ Check error logs in Vercel

**"Environment variables not working"**
→ Make sure they're added to Vercel
→ Click "Redeploy" after adding variables

**Database errors**
→ SQLite won't work on Vercel
→ Use Vercel Postgres or another solution
→ Or remove database features for now

---

**Ready to deploy?** Let's go live! 🚀
