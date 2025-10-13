# 📧 Email Notifications Setup Guide

This guide will help you set up email notifications for custom orders so you get notified when customers place orders.

## 🎯 What You'll Get

When a customer completes checkout, you'll receive an email with:
- Customer contact information
- Order items and quantities
- Total price
- Order timestamp
- Any custom requirements or notes

## 🚀 Quick Start Options

### Option 1: Resend (Recommended - Easiest)

**Why Resend?**
- ✅ Free tier (100 emails/day)
- ✅ Simple setup (5 minutes)
- ✅ Great for developers
- ✅ No credit card required for testing

**Setup Steps:**

1. **Create Account**
   - Go to [resend.com](https://resend.com)
   - Sign up for free

2. **Get API Key**
   - Dashboard → API Keys
   - Create a new API key
   - Copy the key (starts with `re_`)

3. **Add to Environment Variables**
   ```bash
   # In your .env.local file
   RESEND_API_KEY=re_your_api_key_here
   NOTIFICATION_EMAIL=your-business-email@example.com
   ```

4. **Install Package**
   ```bash
   npm install resend
   ```

5. **Update API Route** (I'll provide the code below)

### Option 2: Gmail + Nodemailer (Free)

**Setup Steps:**

1. **Enable 2-Factor Authentication** on your Gmail account

2. **Create App Password**
   - Go to Google Account → Security
   - 2-Step Verification → App passwords
   - Generate app password for "Mail"
   - Copy the 16-character password

3. **Add to Environment Variables**
   ```bash
   # In your .env.local file
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   NOTIFICATION_EMAIL=your-business-email@example.com
   ```

4. **Install Package**
   ```bash
   npm install nodemailer @types/nodemailer
   ```

### Option 3: SendGrid (Popular Choice)

**Setup Steps:**

1. **Create Account** at [sendgrid.com](https://sendgrid.com)
2. **Verify Email** sender
3. **Get API Key** from Settings → API Keys
4. **Add to .env.local**:
   ```bash
   SENDGRID_API_KEY=SG.your_api_key_here
   NOTIFICATION_EMAIL=your-business-email@example.com
   ```

## 📝 Implementation Code

### For Resend (Recommended):

Create/update this file: `src/lib/email.ts`

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderNotification(orderData: any) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'orders@yourdomain.com', // Use your verified domain
      to: process.env.NOTIFICATION_EMAIL!,
      subject: `New Order #${orderData.orderNumber}`,
      html: `
        <h2>🎉 New Custom Order!</h2>
        <h3>Order #${orderData.orderNumber}</h3>
        
        <h4>📋 Customer Info:</h4>
        <ul>
          <li><strong>Name:</strong> ${orderData.customerName}</li>
          <li><strong>Email:</strong> ${orderData.customerEmail}</li>
          <li><strong>Phone:</strong> ${orderData.customerPhone}</li>
        </ul>
        
        <h4>🛒 Order Items:</h4>
        <table style="border-collapse: collapse; width: 100%;">
          <thead>
            <tr style="background-color: #f3f4f6;">
              <th style="padding: 8px; border: 1px solid #ddd;">Item</th>
              <th style="padding: 8px; border: 1px solid #ddd;">Quantity</th>
              <th style="padding: 8px; border: 1px solid #ddd;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${orderData.items.map((item: any) => `
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd;">${item.name}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${item.quantity}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">$${(item.price / 100 * item.quantity).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <h4>💰 Total: $${(orderData.total / 100).toFixed(2)}</h4>
        
        <p><strong>⏰ Order Time:</strong> ${new Date(orderData.timestamp).toLocaleString()}</p>
        
        <hr style="margin: 20px 0;">
        <p style="color: #6b7280;">Please contact the customer to confirm details and start production.</p>
      `,
    });

    if (error) {
      console.error('Email send error:', error);
      return { success: false, error };
    }

    console.log('✅ Order notification sent:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
}
```

### For Gmail + Nodemailer:

```typescript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendOrderNotification(orderData: any) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFICATION_EMAIL,
      subject: `New Order #${orderData.orderNumber}`,
      html: `
        <!-- Same HTML template as above -->
      `,
    });

    console.log('✅ Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
}
```

## 🔗 Integrate with Stripe Webhook

To automatically send notifications after successful payments:

1. **Set up Stripe Webhook** (see `src/app/api/webhook/route.ts`)
2. **On successful payment**, call the notification function
3. **Include order details** from the Stripe session

Example webhook integration:

```typescript
// In your webhook handler
if (event.type === 'checkout.session.completed') {
  const session = event.data.object;
  
  // Send notification
  await sendOrderNotification({
    orderNumber: session.id,
    customerName: session.customer_details?.name,
    customerEmail: session.customer_details?.email,
    customerPhone: session.customer_details?.phone,
    items: session.line_items,
    total: session.amount_total,
    timestamp: new Date(),
  });
}
```

## 📱 Alternative: Simple Form Submission

If you don't want to set up email immediately, you can use a simple form submission service:

### Formspree (Easiest - No Coding)

1. **Go to** [formspree.io](https://formspree.io)
2. **Create form** and get form ID
3. **Add to .env.local**: `FORMSPREE_ID=your_form_id`
4. **Submit order data** as form post

### Google Forms

1. **Create Google Form** for order notifications
2. **Get form action URL**
3. **Post order data** to form
4. **View responses** in Google Sheets

## 🧪 Testing

### Test Email Sending:

Create a test route: `src/app/api/test-email/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { sendOrderNotification } from '@/lib/email';

export async function GET() {
  const testOrder = {
    orderNumber: 'TEST-001',
    customerName: 'Test Customer',
    customerEmail: 'test@example.com',
    customerPhone: '555-1234',
    items: [
      { name: 'Custom T-Shirt', quantity: 2, price: 1599 }
    ],
    total: 3198,
    timestamp: new Date(),
  };

  const result = await sendOrderNotification(testOrder);
  return NextResponse.json(result);
}
```

Visit: `http://localhost:3001/api/test-email`

## 📊 What You'll Track

With email notifications, you can:
- ✅ See all orders in your inbox
- ✅ Respond to customers quickly
- ✅ Keep order history in email
- ✅ Forward orders to production team
- ✅ Archive completed orders

## 🔔 Advanced: Multiple Notifications

You can also notify:
- **Customer**: Order confirmation
- **You**: New order alert
- **Production team**: Order details
- **Shipping**: When ready to ship

## 🆘 Troubleshooting

### Emails not sending?
- ✅ Check API key is correct
- ✅ Verify .env.local has correct values
- ✅ Restart development server after env changes
- ✅ Check email service dashboard for errors
- ✅ Verify sender email is verified

### Emails going to spam?
- ✅ Use verified domain
- ✅ Set up SPF/DKIM records
- ✅ Use professional email service
- ✅ Test with different email providers

## 💡 Recommended Setup

**For Getting Started:**
- Use **Resend** - easiest setup, free tier
- Takes 5 minutes to configure
- Professional email templates
- Good for development and production

**For Production:**
- Set up custom domain
- Use transactional email service
- Monitor delivery rates
- Keep backup notification method

---

**Next Steps:**
1. Choose your email service (Resend recommended)
2. Get API key
3. Add to .env.local
4. Test with test route
5. Integrate with checkout

Your orders will be automatically emailed to you! 📧
