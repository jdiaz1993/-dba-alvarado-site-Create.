import { NextResponse } from 'next/server';
import { getAllOrders } from '../../../lib/ordersLogger';

// GET /api/orders - Get all orders
export async function GET() {
  try {
    const orders = getAllOrders();
    
    // Sort by timestamp (newest first)
    const sortedOrders = orders.sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return dateB - dateA;
    });
    
    return NextResponse.json({
      success: true,
      orders: sortedOrders
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
