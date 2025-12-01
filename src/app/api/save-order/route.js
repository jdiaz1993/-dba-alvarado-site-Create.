import { NextResponse } from 'next/server';
import { saveOrder } from '../../../lib/ordersLogger';

export async function POST(request) {
  try {
    const body = await request.json();
    const { orderNumber, customer, items, total } = body;

    // Create order log
    const order = {
      orderNumber: orderNumber || `ORD-${Date.now()}`,
      timestamp: new Date().toISOString(),
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
      },
      items: items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: total,
      status: 'pending',
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
