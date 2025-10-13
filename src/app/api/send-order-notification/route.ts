import { NextRequest, NextResponse } from 'next/server';
import { sendOrderNotification, sendCustomerConfirmation } from '../../../lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderDetails, customerInfo, items } = body;

    console.log('📦 New Order Received:');
    console.log('Customer:', customerInfo);
    console.log('Items:', items);
    console.log('Order Details:', orderDetails);

    // Prepare order data
    const orderData = {
      orderNumber: orderDetails.orderNumber || `ORD-${Date.now()}`,
      customerName: customerInfo.name,
      customerEmail: customerInfo.email,
      customerPhone: customerInfo.phone,
      items: items.map((item: any) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: orderDetails.total,
      timestamp: new Date(),
    };

    // Send notification to business owner
    const notificationResult = await sendOrderNotification(orderData);
    
    // Send confirmation to customer
    const confirmationResult = await sendCustomerConfirmation(orderData);

    if (notificationResult.success) {
      console.log('✅ Business notification sent successfully');
    } else {
      console.warn('⚠️ Business notification failed:', notificationResult.error);
    }

    if (confirmationResult.success) {
      console.log('✅ Customer confirmation sent successfully');
    } else {
      console.warn('⚠️ Customer confirmation failed:', confirmationResult.error);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Order received and notifications sent',
      emailsSent: {
        businessNotification: notificationResult.success,
        customerConfirmation: confirmationResult.success,
      }
    });

  } catch (error) {
    console.error('❌ Error processing order notification:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process order' },
      { status: 500 }
    );
  }
}
