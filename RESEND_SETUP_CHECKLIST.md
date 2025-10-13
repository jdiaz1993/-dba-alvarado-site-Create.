# ✅ Resend Email Setup Checklist

## 📋 Quick Setup (5 Minutes)

### Step 1: Get Your Resend API Key

1. **Go to** [resend.com](https://resend.com)
2. **Sign up** for free account
3. **Verify your email**
4. **Go to** "API Keys" in the dashboard
5. **Click** "Create API Key"
6. **Copy** the key (starts with `re_`)

### Step 2: Add to Environment Variables

Edit your `.env.local` file:

```bash
# Resend Email Configuration
RESEND_API_KEY=re_your_actual_api_key_here
NOTIFICATION_EMAIL=your-business-email@gmail.com

# Existing configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_key
NEXT_PUBLIC_SITE_URL=http://localhost:3001
```

**Example:**
```bash
RESEND_API_KEY=re_abc123def456ghi789
NOTIFICATION_EMAIL=jose.diaz@gmail.com
STRIPE_SECRET_KEY=sk_test_51xyz...
NEXT_PUBLIC_SITE_URL=http://localhost:3001
```

### Step 3: Restart Your Server

1. **Stop server**: Press `Ctrl + C` in terminal
2. **Start server**: Run `npm run dev`
3. **Wait** for "Ready in X.Xs" message

### Step 4: Test Email Sending

**Visit**: http://localhost:3001/api/test-email

**You should see:**
```json
{
  "success": true,
  "message": "✅ Test email sent successfully!",
  "details": {
    "sentTo": "your-email@gmail.com",
    "orderNumber": "TEST-xxxxx"
  }
}
```

**Check your email inbox** (and spam folder) for the test email!

---

## 🎯 What You've Set Up

### ✅ Features Now Working:

1. **Order Notifications**
   - You get an email when customer places order
   - Beautiful HTML template
   - Order details included
   - Customer contact info

2. **Customer Confirmations**
   - Customer gets confirmation email
   - Order summary included
   - Professional branding

3. **Test Endpoint**
   - `/api/test-email` to test anytime
   - Verifies configuration
   - Shows troubleshooting info

---

## 📧 Email Templates Include:

### Business Notification (To You):
- 🎉 Order number
- 👤 Customer name, email, phone
- 🛒 All order items with quantities
- 💰 Total price
- ⏰ Order timestamp
- 📝 Next steps checklist
- 📧 Direct "Contact Customer" button

### Customer Confirmation (To Customer):
- ✅ Order received message
- 📋 Order summary
- 💵 Total amount
- 📞 Your contact information
- ⏱️ Expected timeline

---

## 🔍 Verify Configuration

**Visit**: http://localhost:3001/admin/settings

You'll see:
- ✅ Your notification email
- ✅ Email service status
- ✅ Stripe configuration
- ✅ All settings in one place

---

## 🧪 Testing Checklist

- [ ] Added RESEND_API_KEY to .env.local
- [ ] Added NOTIFICATION_EMAIL to .env.local  
- [ ] Restarted development server
- [ ] Visited /api/test-email
- [ ] Received test email in inbox
- [ ] Checked spam folder if not in inbox
- [ ] Verified admin/settings shows configuration

---

## 🚨 Troubleshooting

### "Email service not configured"
✅ Add RESEND_API_KEY to .env.local
✅ Restart server with Ctrl+C then npm run dev

### "Notification email not configured"
✅ Add NOTIFICATION_EMAIL to .env.local
✅ Restart server

### "Test email not received"
✅ Check spam/junk folder
✅ Verify email address is correct
✅ Check Resend dashboard for send logs
✅ Make sure API key is correct

### "Invalid API key"
✅ Copy API key again from Resend dashboard
✅ Make sure it starts with `re_`
✅ No extra spaces in .env.local file
✅ API key is on one line

---

## 🎨 Customizing Emails

### Change "From" Name:
In `src/lib/email.ts`, update:
```typescript
from: 'Your Business Name <onboarding@resend.dev>'
```

### Add Your Domain (Optional):
1. Add domain in Resend dashboard
2. Verify DNS records
3. Update from address:
```typescript
from: 'orders@yourdomain.com'
```

---

## 📊 Resend Dashboard

**Access**: [resend.com/emails](https://resend.com/emails)

**You can see:**
- 📧 All sent emails
- ✅ Delivery status
- 📈 Open rates (if enabled)
- ❌ Failed sends
- 📊 Usage statistics

---

## 💰 Resend Free Tier

- ✅ 100 emails per day
- ✅ Perfect for starting out
- ✅ No credit card required
- ✅ Test domain included
- ✅ Professional templates

**When you grow:**
- $20/month = 50,000 emails
- Custom domains
- Priority support

---

## 🔗 Integration with Stripe

The email notification system will automatically work when:
1. Customer completes Stripe checkout
2. Payment is successful
3. Webhook triggers notification
4. Emails sent to you and customer

---

## ✨ Next Steps

1. ✅ Test the email system
2. ✅ Place a real test order
3. ✅ Verify you receive notification
4. ✅ Check customer receives confirmation
5. ✅ Start accepting real orders!

---

## 📱 Mobile Notifications

**Pro Tip**: Set up email forwarding to your phone!

**Gmail Users:**
- Gmail app → Settings → Notifications
- Enable for your notification email

**iPhone Users:**
- Mail app → Fetch New Data
- Set to Push for instant notifications

Now you'll get instant mobile alerts for every order! 📲

---

**You're all set!** 🎉

Your email notification system is ready to send beautiful order notifications!

Test it now: http://localhost:3001/api/test-email
