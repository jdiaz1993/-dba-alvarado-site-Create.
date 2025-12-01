import { NextResponse } from 'next/server';

// GET /api/cart - Retrieve user's cart (simplified for Vercel)
export async function GET() {
  try {
    // For Vercel: Cart is managed client-side only
    // Return empty cart - actual cart state is in browser
    const response = NextResponse.json({
      success: true,
      cart: { id: 'browser-cart', userId: 'local', items: [], createdAt: '', updatedAt: '' }
    });

    return response;
  } catch (error) {
    console.error('Error getting cart:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve cart' },
      { status: 500 }
    );
  }
}

// POST /api/cart - Save user's cart (simplified for Vercel)
export async function POST(request) {
  try {
    const body = await request.json();
    const { items } = body;

    if (!Array.isArray(items)) {
      return NextResponse.json(
        { success: false, error: 'Items must be an array' },
        { status: 400 }
      );
    }

    // For Vercel: Just acknowledge the save, cart is managed client-side
    const response = NextResponse.json({
      success: true,
      cart: { id: 'browser-cart', userId: 'local', items, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
    });

    return response;
  } catch (error) {
    console.error('Error saving cart:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save cart' },
      { status: 500 }
    );
  }
}

// DELETE /api/cart - Clear user's cart (simplified for Vercel)
export async function DELETE() {
  try {
    // For Vercel: Cart is managed client-side
    return NextResponse.json({
      success: true,
      message: 'Cart cleared successfully'
    });
  } catch (error) {
    console.error('Error clearing cart:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to clear cart' },
      { status: 500 }
    );
  }
}
