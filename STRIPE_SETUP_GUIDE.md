# 🛒 Stripe Checkout Setup Guide

This guide will help you get your checkout system working with Stripe payments.

## 🔧 Step 1: Create Stripe Account

1. **Visit** [stripe.com](https://stripe.com)
2. **Sign up** for a free account
3. **Complete** business verification
4. **Get your API keys** from the dashboard

## 🔑 Step 2: Get Your Stripe Keys

### Test Mode (Recommended for Development)
1. **Go to** Stripe Dashboard → Developers → API Keys
2. **Copy** your **Publishable Key** (starts with `pk_test_`)
3. **Copy** your **Secret Key** (starts with `sk_test_`)

### Live Mode (For Production)
- Use keys that start with `pk_live_` and `sk_live_`

## ⚙️ Step 3: Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3001

# Optional: For webhook handling
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### Example .env.local file:
```bash
STRIPE_SECRET_KEY=sk_test_51ABC123...your_actual_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3001
```

## 🧪 Step 4: Test Your Checkout

1. **Add items** to your cart at http://localhost:3001/products
2. **Go to cart** at http://localhost:3001/cart
3. **Click Checkout** button
4. **Use test card** numbers:
   - **Success**: `4242 4242 4242 4242`
   - **Declined**: `4000 0000 0000 0002`
   - **Any future date** for expiry
   - **Any 3 digits** for CVC

## 🔍 Step 5: Troubleshooting

### Common Issues:

#### "Stripe not configured" Error
- ✅ Check `.env.local` file exists
- ✅ Verify `STRIPE_SECRET_KEY` is set correctly
- ✅ Restart your development server after adding env vars

#### "Invalid API Key" Error
- ✅ Ensure you're using test keys for development
- ✅ Check for extra spaces or characters in the key
- ✅ Verify the key starts with `sk_test_`

#### Checkout Not Redirecting
- ✅ Check browser console for errors
- ✅ Verify `NEXT_PUBLIC_SITE_URL` matches your local URL
- ✅ Ensure cart has items before checkout

## 📱 Step 6: Test Different Scenarios

### Test Cards to Use:
```
✅ Success: 4242 4242 4242 4242
❌ Declined: 4000 0000 0000 0002
🔒 Insufficient funds: 4000 0000 0000 9995
🚫 Lost card: 4000 0000 0000 9987
🔒 Stolen card: 4000 0000 0000 9979
```

### Test Flow:
1. **Add products** to cart
2. **Click checkout**
3. **Enter test card** details
4. **Complete payment**
5. **Verify redirect** to success page
6. **Check cart** is cleared

## 🌐 Step 7: Production Setup

### For Live Payments:
1. **Switch to live mode** in Stripe dashboard
2. **Update environment variables** with live keys
3. **Set up webhooks** for order processing
4. **Update success/cancel URLs** to your domain

### Environment Variables for Production:
```bash
STRIPE_SECRET_KEY=sk_live_your_live_secret_key
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## 📊 Step 8: Monitor Payments

### Stripe Dashboard:
- **View payments** in real-time
- **Check transaction** details
- **Monitor** failed payments
- **Export** payment data

### Your Application:
- **Success page** shows completed orders
- **Cart clears** after successful payment
- **Error handling** for failed payments

## 🚀 Quick Start Checklist

- [ ] Create Stripe account
- [ ] Get API keys from dashboard
- [ ] Create `.env.local` file
- [ ] Add `STRIPE_SECRET_KEY` to env file
- [ ] Add `NEXT_PUBLIC_SITE_URL=http://localhost:3001`
- [ ] Restart development server
- [ ] Test with `4242 4242 4242 4242` card
- [ ] Verify redirect to success page

## 💡 Pro Tips

1. **Use test mode** during development
2. **Test all scenarios** (success, failure, etc.)
3. **Keep keys secure** - never commit to git
4. **Set up webhooks** for production
5. **Monitor dashboard** for payment issues

## 🆘 Need Help?

If you're still having issues:

1. **Check console** for error messages
2. **Verify env variables** are loaded
3. **Test with simple cart** (1 item)
4. **Check Stripe dashboard** for API errors
5. **Restart server** after env changes

Your checkout system is already built - you just need to configure Stripe! 🎉
