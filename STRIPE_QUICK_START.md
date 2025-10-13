# ⚡ Stripe Quick Start (5 Minutes)

## 🎯 What You Need

Just **ONE thing**: Your Stripe Secret Key

---

## 📝 Step-by-Step

### 1️⃣ Go to Stripe (1 minute)

**Visit**: [stripe.com](https://stripe.com)

**Sign up** if you haven't already

---

### 2️⃣ Find Your Secret Key (2 minutes)

Once logged in:

1. Look at **top-right corner** - make sure **"Test mode"** is ON (orange/purple toggle)
2. Click **"Developers"** in left sidebar
3. Click **"API keys"**
4. Find **"Secret key"** section
5. Click **"Reveal test key"** button
6. **Copy the entire key** (it's very long!)

**Your key looks like this**:
```
sk_test_51ABC123def456GHI789jkl012MNO345pqr678STU901vwx...
```

---

### 3️⃣ Add to Your Project (1 minute)

**Open file**: `.env.local` (in your project root)

**Add this line** (paste your actual key):

```bash
STRIPE_SECRET_KEY=sk_test_51ABC123def456GHI789jkl012MNO345pqr678...
```

**Your complete `.env.local` should look like**:

```bash
STRIPE_SECRET_KEY=sk_test_your_actual_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3001
NOTIFICATION_EMAIL=DBA.alvarado@gmail.com
RESEND_API_KEY=re_your_key_here
```

---

### 4️⃣ Restart Server (30 seconds)

In your terminal:

1. Press **Ctrl + C** (stop server)
2. Run **`npm run dev`** (start server)
3. Wait for "Ready in X.Xs"

---

### 5️⃣ Test It! (1 minute)

**Visit**: http://localhost:3001/test-checkout

1. Click **"Add Test Item"** buttons
2. Click **"Test Checkout"**
3. **Should see**: Success message with Stripe URL

Or visit the test URL directly in response

---

## 💳 Test Card for Checkout

When you get to Stripe checkout page:

```
Card Number:  4242 4242 4242 4242
Expiry Date:  12/25 (any future date)
CVC:          123 (any 3 digits)
ZIP Code:     12345 (any 5 digits)
Email:        test@example.com (any email)
```

Click **"Pay"** → Should redirect to success page!

---

## ✅ You're Done!

That's it! Your checkout is now working.

### What Works Now:

- ✅ Customers can add items to cart
- ✅ Customers can checkout with Stripe
- ✅ You get paid (test mode for now)
- ✅ Orders tracked in Stripe dashboard
- ✅ Cart clears after payment

---

## 🎉 Next Steps

1. **Test the full flow**:
   - Add product to cart
   - Checkout
   - Use test card
   - See success page

2. **Check Stripe Dashboard**:
   - See your test payment
   - View customer details
   - Review transaction

3. **When ready for real payments**:
   - Complete Stripe verification
   - Switch to live keys
   - Start accepting real payments!

---

## 🆘 Having Issues?

### "Stripe not configured" error
→ Make sure you added the key to `.env.local`
→ Restart your server

### "Invalid API key" error  
→ Copy the key again from Stripe
→ Make sure it starts with `sk_test_`
→ No extra spaces

### Still stuck?
→ Check `STRIPE_COMPLETE_SETUP.md` for detailed guide
→ Visit http://localhost:3001/admin/settings to check status

---

**Ready to test?** 🚀

http://localhost:3001/test-checkout
