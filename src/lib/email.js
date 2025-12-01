import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderNotification(orderData) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn('⚠️ RESEND_API_KEY not configured. Email will not be sent.');
      return { success: false, error: 'Email service not configured' };
    }

    if (!process.env.NOTIFICATION_EMAIL) {
      console.warn('⚠️ NOTIFICATION_EMAIL not configured. Email will not be sent.');
      return { success: false, error: 'Notification email not configured' };
    }

    const { data, error } = await resend.emails.send({
      from: 'DBA Alvarado Orders <onboarding@resend.dev>', // Use resend's test domain for now
      to: process.env.NOTIFICATION_EMAIL,
      subject: `🎉 New Order #${orderData.orderNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
              .section { background: white; padding: 20px; margin-bottom: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
              .section h3 { margin-top: 0; color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px; }
              table { width: 100%; border-collapse: collapse; margin-top: 15px; }
              th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
              th { background-color: #f3f4f6; font-weight: 600; }
              .total { font-size: 24px; font-weight: bold; color: #667eea; text-align: right; margin-top: 20px; }
              .info-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
              .info-label { font-weight: 600; color: #6b7280; }
              .info-value { color: #111827; }
              .footer { text-align: center; color: #6b7280; padding: 20px; font-size: 14px; }
              .badge { display: inline-block; padding: 5px 15px; background: #10b981; color: white; border-radius: 20px; font-size: 12px; font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 32px;">🎉 New Custom Order!</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Order #${orderData.orderNumber}</p>
              </div>
              
              <div class="content">
                <div class="section">
                  <h3>📋 Customer Information</h3>
                  <div class="info-row">
                    <span class="info-label">Name:</span>
                    <span class="info-value">${orderData.customerName}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Email:</span>
                    <span class="info-value"><a href="mailto:${orderData.customerEmail}">${orderData.customerEmail}</a></span>
                  </div>
                  ${orderData.customerPhone ? `
                  <div class="info-row">
                    <span class="info-label">Phone:</span>
                    <span class="info-value"><a href="tel:${orderData.customerPhone}">${orderData.customerPhone}</a></span>
                  </div>
                  ` : ''}
                  <div class="info-row" style="border-bottom: none;">
                    <span class="info-label">Order Time:</span>
                    <span class="info-value">${new Date(orderData.timestamp).toLocaleString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</span>
                  </div>
                </div>

                <div class="section">
                  <h3>🛒 Order Items</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th style="text-align: center;">Quantity</th>
                        <th style="text-align: right;">Unit Price</th>
                        <th style="text-align: right;">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${orderData.items.map((item) => `
                        <tr>
                          <td><strong>${item.name}</strong></td>
                          <td style="text-align: center;">${item.quantity}</td>
                          <td style="text-align: right;">$${(item.price / 100).toFixed(2)}</td>
                          <td style="text-align: right;"><strong>$${(item.price / 100 * item.quantity).toFixed(2)}</strong></td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                  <div class="total">
                    Total: $${(orderData.total / 100).toFixed(2)}
                  </div>
                </div>

                <div class="section" style="background: #eff6ff; border-left: 4px solid #3b82f6;">
                  <h3 style="color: #3b82f6; border-bottom-color: #3b82f6;">📝 Next Steps</h3>
                  <ol style="margin: 15px 0; padding-left: 20px;">
                    <li style="margin-bottom: 10px;">
                      <strong>Review order details</strong> and verify all information is correct
                    </li>
                    <li style="margin-bottom: 10px;">
                      <strong>Contact the customer</strong> within 24 hours to confirm details
                    </li>
                    <li style="margin-bottom: 10px;">
                      <strong>Start production</strong> once all details are confirmed
                    </li>
                    <li>
                      <strong>Update customer</strong> on progress and completion
                    </li>
                  </ol>
                </div>

                <div style="text-align: center; margin-top: 30px;">
                  <a href="mailto:${orderData.customerEmail}" style="display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">
                    📧 Contact Customer
                  </a>
                </div>
              </div>

              <div class="footer">
                <p>This is an automated notification from your DBA Alvarado order system.</p>
                <p style="color: #9ca3af; font-size: 12px; margin-top: 10px;">
                  Questions? Check your admin dashboard at <a href="http://localhost:3001/admin/orders">localhost:3001/admin/orders</a>
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('❌ Email send error:', error);
      return { success: false, error };
    }

    console.log('✅ Order notification sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    return { success: false, error };
  }
}

export async function sendCustomerConfirmation(orderData) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return { success: false, error: 'Email service not configured' };
    }

    // Skip customer confirmation if customer email is the same as notification email (test mode)
    if (orderData.customerEmail === process.env.NOTIFICATION_EMAIL) {
      console.log('⚠️ Skipping customer confirmation (test mode - same as notification email)');
      return { success: true, skipped: true, reason: 'Test mode - same email' };
    }

    const { data, error } = await resend.emails.send({
      from: 'DBA Alvarado <onboarding@resend.dev>',
      to: orderData.customerEmail,
      subject: `Order Confirmation #${orderData.orderNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9fafb; padding: 30px; }
              .section { background: white; padding: 20px; margin-bottom: 20px; border-radius: 8px; }
              table { width: 100%; border-collapse: collapse; margin-top: 15px; }
              th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
              .total { font-size: 20px; font-weight: bold; color: #667eea; text-align: right; margin-top: 15px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">Thank You for Your Order!</h1>
                <p style="margin: 10px 0 0 0;">Order #${orderData.orderNumber}</p>
              </div>
              <div class="content">
                <div class="section">
                  <h3>Hi ${orderData.customerName},</h3>
                  <p>Thank you for your custom order! We've received your request and will start working on it within 2-3 business days.</p>
                  <p>We'll contact you if we have any questions about your design or specifications.</p>
                </div>
                <div class="section">
                  <h3>Order Summary</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Qty</th>
                        <th style="text-align: right;">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${orderData.items.map((item) => `
                        <tr>
                          <td>${item.name}</td>
                          <td>${item.quantity}</td>
                          <td style="text-align: right;">$${(item.price / 100 * item.quantity).toFixed(2)}</td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                  <div class="total">Total: $${(orderData.total / 100).toFixed(2)}</div>
                </div>
                <div class="section" style="background: #eff6ff;">
                  <p><strong>Questions?</strong></p>
                  <p>Contact us at: <a href="mailto:${process.env.NOTIFICATION_EMAIL}">${process.env.NOTIFICATION_EMAIL}</a></p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Error sending customer confirmation:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Failed to send customer confirmation:', error);
    return { success: false, error };
  }
}
