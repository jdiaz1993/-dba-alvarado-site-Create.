import { NextResponse } from 'next/server';
import { sendOrderNotification } from '../../../lib/email';

export async function GET() {
  try {
    // Create test order data
    // Using your email as customer email for testing (Resend free tier requirement)
    const testOrder = {
      orderNumber: 'TEST-' + Date.now(),
      customerName: 'Test Customer',
      customerEmail: process.env.NOTIFICATION_EMAIL || 'dba.alvarado@gmail.com',
      customerPhone: '555-1234',
      items: [
        { name: 'Custom T-Shirt Printing', quantity: 2, price: 1599 },
        { name: 'Engraved Water Bottle', quantity: 1, price: 2499 }
      ],
      total: 5697, // $56.97
      timestamp: new Date(),
    };

    console.log('🧪 Sending test email...');
    console.log('Test order data:', testOrder);

    const result = await sendOrderNotification(testOrder);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: '✅ Test email sent successfully!',
        details: {
          sentTo: process.env.NOTIFICATION_EMAIL,
          orderNumber: testOrder.orderNumber,
          emailId: result.data?.id,
        },
        result
      });
    } else {
      return NextResponse.json({
        success: false,
        message: '❌ Failed to send test email',
        error: result.error,
        troubleshooting: {
          resendApiKey: process.env.RESEND_API_KEY ? '✅ Set' : '❌ Not set',
          notificationEmail: process.env.NOTIFICATION_EMAIL || '❌ Not set',
          suggestion: 'Make sure RESEND_API_KEY and NOTIFICATION_EMAIL are set in your .env.local file',
        }
      }, { status: 500 });
    }
  } catch (error) {
    console.error('❌ Test email error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to send test email',
      error: error instanceof Error ? error.message : 'Unknown error',
      troubleshooting: {
        resendApiKey: process.env.RESEND_API_KEY ? '✅ Set' : '❌ Not set',
        notificationEmail: process.env.NOTIFICATION_EMAIL || '❌ Not set',
        suggestion: 'Check your .env.local file and restart the server',
      }
    }, { status: 500 });
  }
}
