import { NextResponse } from 'next/server';
import { saveOrder } from '../../../lib/ordersLogger';

export async function POST(request) {
  try {
    const body = await request.json();
    const { orderNumber, customer, items, total, status, timestamp } = body;

    // Create order log with ALL details including preview images
    const order = {
      orderNumber: orderNumber || `ORD-${Date.now()}`,
      timestamp: timestamp || new Date().toISOString(),
      status: status || 'pending',
      customer: customer ? {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
      } : null,
      // Include ALL item details: preview images, custom text, design data, etc.
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        // Full order details
        imageUrl: item.imageUrl, // Preview image PNG (base64 data URL)
        productType: item.productType,
        color: item.color,
        size: item.size,
        placement: item.placement,
        customTexts: item.customTexts || [],
        isRushOrder: item.isRushOrder || false,
        rushOrderFee: item.rushOrderFee || 0,
        shippingAddress: item.shippingAddress || null,
        timeline: item.timeline || null,
        designData: item.designData || null
      })),
      total: total || items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    };

    // Save order to JSON file
    saveOrder(order);

    console.log('📦 Order saved successfully:', order.orderNumber);
    console.log('Customer:', customer.name, '-', customer.email);
    console.log('Total:', `$${(total / 100).toFixed(2)}`);

    return NextResponse.json({
      success: true,
      message: 'Order saved successfully',
      orderNumber: order.orderNumber,
    });
  } catch (error) {
    console.error('❌ Error saving order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save order' },
      { status: 500 }
    );
  }
}
