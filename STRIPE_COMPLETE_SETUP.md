# 💳 Complete Stripe Setup Guide

## 🎯 Goal
Get your checkout system working so customers can pay for custom orders.

---

## 📋 Step-by-Step Setup

### Step 1: Create Stripe Account (5 minutes)

1. **Go to** [stripe.com](https://stripe.com)
2. **Click** "Start now" or "Sign up"
3. **Enter your information**:
   - Email address
   - Full name
   - Country (United States)
   - Password
4. **Verify your email** (check inbox for verification link)
5. **You're in!** Welcome to Stripe Dashboard

---

### Step 2: Get Your Test API Keys (2 minutes)

#### Find Your Keys:

1. **In Stripe Dashboard**, look at the top-right corner
2. **Make sure** "Test mode" toggle is ON (should show orange/purple)
3. **Click** "Developers" in the left sidebar
4. **Click** "API keys" under Developers
5. **You'll see two keys**:

**Publishable key** (starts with `pk_test_`):
```
pk_test_51ABC123...
```
- This goes in your frontend (public)
- Safe to share
- Not secret

**Secret key** (starts with `sk_test_`) - **CLICK "Reveal test key"**:
```
sk_test_51XYZ789...
```
- This goes in your .env.local (private)
- NEVER share this
- Keep it secret

---

### Step 3: Add Keys to Your Project (1 minute)

#### Edit your `.env.local` file:

**Location**: `dba-personalization/.env.local`

**Add this line** (replace with your actual key):

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_51XYZ789your_actual_secret_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3001

# Your notification email (already set)
NOTIFICATION_EMAIL=DBA.alvarado@gmail.com

# Resend (already set)
RESEND_API_KEY=re_your_key_here
```

**Example** (with fake key):
```bash
STRIPE_SECRET_KEY=sk_test_51ABC123def456GHI789jkl012MNO345pqr678STU901vwx234
NEXT_PUBLIC_SITE_URL=http://localhost:3001
NOTIFICATION_EMAIL=DBA.alvarado@gmail.com
```

---

### Step 4: Restart Your Server (30 seconds)

1. **Go to your terminal**
2. **Press** `Ctrl + C` to stop the server
3. **Run**: `npm run dev`
4. **Wait for** "Ready in X.Xs" message

---

### Step 5: Test Checkout (2 minutes)

#### Option A: Use Test Checkout Page

1. **Visit**: http://localhost:3001/test-checkout
2. **Click** "Add Test Item" buttons
3. **Click** "Test Checkout" button
4. **You should see**: Success message with Stripe URL

#### Option B: Real Flow Test

1. **Visit**: http://localhost:3001/products
2. **Click** "Custom Order" on any product
3. **Select project type** (price will show)
4. **Enter quantity**
5. **Fill out form** (use fake info for testing)
6. **Click** "Add to Cart & Continue"
7. **Click** "Checkout" in cart
8. **Should redirect to Stripe checkout page**

---

### Step 6: Complete Test Payment

When redirected to Stripe checkout page:

#### Use Test Card Numbers:

**Successful Payment**:
```
Card: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/25)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)
```

**Declined Card** (to test errors):
```
Card: 4000 0000 0000 0002
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

**More Test Cards**:
- Insufficient funds: `4000 0000 0000 9995`
- Card stolen: `4000 0000 0000 9979`
- Card expired: `4000 0000 0000 0069`

#### Enter Email:
- Use any email (test@example.com works)
- This is just for testing

#### Click "Pay":
- Should process successfully
- Redirects to success page
- Cart should be cleared

---

## ✅ Verify It's Working

### Check 1: Test Checkout Response

Visit: http://localhost:3001/test-checkout

**Expected**:
```json
{
  "success": true,
  "url": "https://checkout.stripe.com/c/pay/cs_test_..."
}
```

### Check 2: Stripe Dashboard

1. **Go to** Stripe Dashboard → Payments
2. **You should see** your test payment
3. **Details include**:
   - Amount paid
   - Customer email
   - Payment status (Succeeded)
   - Product items

### Check 3: Success Page

After completing checkout:
- **Redirected to**: http://localhost:3001/success
- **Cart cleared**
- **Order complete**

---

## 🎨 What You Have Now

### ✅ Working Features:

1. **Product Selection**
   - View products at /products
   - Click "Custom Order"
   - See prices dynamically

2. **Custom Order Form**
   - Select project type
   - See base price
   - Enter quantity
   - Upload designs
   - Calculate total

3. **Shopping Cart**
   - Add items with prices
   - Update quantities
   - See totals
   - Cart persists on refresh

4. **Stripe Checkout**
   - Secure payment processing
   - Test mode for development
   - Success/cancel handling
   - Order confirmation

---

## 💰 Test vs Live Mode

### Test Mode (What You're Using Now):

✅ Free to test
✅ No real money
✅ Use test card numbers
✅ Perfect for development
✅ Keys start with `pk_test_` and `sk_test_`

### Live Mode (For Real Customers):

⚠️ Requires business verification
⚠️ Real credit cards
⚠️ Real money transfers
⚠️ Keys start with `pk_live_` and `sk_live_`

**When to switch**: After testing everything thoroughly

---

## 🔍 Troubleshooting

### "Stripe not configured" Error

**Problem**: Secret key not set

**Solution**:
1. Check `.env.local` has `STRIPE_SECRET_KEY=sk_test_...`
2. Make sure key starts with `sk_test_`
3. No extra spaces or quotes
4. Restart server after adding

### "Invalid API Key" Error

**Problem**: Wrong key or typo

**Solution**:
1. Go back to Stripe Dashboard → Developers → API keys
2. Click "Reveal test key" button
3. Copy the ENTIRE key
4. Paste into `.env.local`
5. Should be very long (starts with `sk_test_51...`)

### Checkout Button Does Nothing

**Problem**: No items in cart or configuration issue

**Solution**:
1. Make sure cart has items
2. Check browser console for errors (F12)
3. Verify Stripe key is set
4. Try test checkout page first

### Redirects but Shows Error

**Problem**: Network or Stripe issue

**Solution**:
1. Check Stripe Dashboard → Logs
2. Look for error messages
3. Verify test card number is correct
4. Try different browser

---

## 📊 Monitoring Orders

### Stripe Dashboard

**See All Payments**:
1. Go to [dashboard.stripe.com](https://dashboard.stripe.com)
2. Click "Payments" in sidebar
3. See all transactions

**Payment Details**:
- Customer email
- Amount
- Date & time
- Product description
- Payment method

**Export Data**:
- Click "Export" button
- Download CSV
- Use for accounting

---

## 🚀 Going Live (Future)

### When Ready for Real Customers:

1. **Complete Stripe Verification**
   - Business information
   - Bank account
   - Tax ID

2. **Switch to Live Keys**
   - Get live keys from dashboard
   - Update `.env.local`:
     ```bash
     STRIPE_SECRET_KEY=sk_live_your_live_key_here
     ```

3. **Update Domain**
   ```bash
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   ```

4. **Test with Real Card** (small amount)

5. **Go Live!** 🎉

---

## 🎯 Quick Reference

### Your Environment Variables:

```bash
# Stripe (for payments)
STRIPE_SECRET_KEY=sk_test_your_key_here

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3001

# Email notifications
NOTIFICATION_EMAIL=DBA.alvarado@gmail.com
RESEND_API_KEY=re_your_key_here
```

### Test Card (Success):
```
4242 4242 4242 4242
12/25  |  123  |  12345
```

### Test URLs:
- Test checkout: http://localhost:3001/test-checkout
- Products: http://localhost:3001/products
- Cart: http://localhost:3001/cart
- Admin: http://localhost:3001/admin/settings

---

## ✅ Checklist

- [ ] Created Stripe account
- [ ] Verified email
- [ ] Found API keys in dashboard
- [ ] Added `STRIPE_SECRET_KEY` to `.env.local`
- [ ] Restarted development server
- [ ] Tested checkout with 4242 card
- [ ] Saw payment in Stripe dashboard
- [ ] Cart cleared after successful payment

---

## 🆘 Need Help?

### Common Issues:

1. **Can't find API keys**
   → Stripe Dashboard → Developers → API keys

2. **Server won't start**
   → Check for typos in `.env.local`

3. **Checkout not working**
   → Check browser console (F12) for errors

4. **Payment not showing in Stripe**
   → Make sure test mode is ON (orange toggle)

---

**You're ready to accept payments!** 💳✨

Test it now: http://localhost:3001/test-checkout
