import { NextRequest, NextResponse } from 'next/server';
import { initDatabase, createOrGetUser, getCartByUserId, saveCart, clearCart, CartItem } from '../../../lib/database';

// Initialize database on first import
let dbInitialized = false;
if (!dbInitialized) {
  await initDatabase();
  dbInitialized = true;
}

// Helper function to get session ID from request
function getSessionId(request: NextRequest): string {
  // Try to get session from cookie
  const sessionCookie = request.cookies.get('session_id');
  if (sessionCookie) {
    return sessionCookie.value;
  }

  // Try to get session from Authorization header
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  // Generate new session ID
  const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  return newSessionId;
}

// GET /api/cart - Retrieve user's cart
export async function GET(request: NextRequest) {
  try {
    const sessionId = getSessionId(request);
    const userId = await createOrGetUser(sessionId);
    const cart = await getCartByUserId(userId);

    const response = NextResponse.json({
      success: true,
      cart: cart || { id: '', userId, items: [], createdAt: '', updatedAt: '' }
    });

    // Set session cookie if it's new
    if (!request.cookies.get('session_id')) {
      response.cookies.set('session_id', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30 // 30 days
      });
    }

    return response;
  } catch (error) {
    console.error('Error getting cart:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve cart' },
      { status: 500 }
    );
  }
}

// POST /api/cart - Save user's cart
export async function POST(request: NextRequest) {
  try {
    const sessionId = getSessionId(request);
    const userId = await createOrGetUser(sessionId);
    
    const body = await request.json();
    const { items } = body;

    if (!Array.isArray(items)) {
      return NextResponse.json(
        { success: false, error: 'Items must be an array' },
        { status: 400 }
      );
    }

    // Validate items structure
    for (const item of items) {
      if (!item.id || !item.name || typeof item.price !== 'number' || typeof item.quantity !== 'number') {
        return NextResponse.json(
          { success: false, error: 'Invalid item structure' },
          { status: 400 }
        );
      }
    }

    const cart = await saveCart(userId, items as CartItem[]);

    const response = NextResponse.json({
      success: true,
      cart
    });

    // Set session cookie if it's new
    if (!request.cookies.get('session_id')) {
      response.cookies.set('session_id', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30 // 30 days
      });
    }

    return response;
  } catch (error) {
    console.error('Error saving cart:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save cart' },
      { status: 500 }
    );
  }
}

// DELETE /api/cart - Clear user's cart
export async function DELETE(request: NextRequest) {
  try {
    const sessionId = getSessionId(request);
    const userId = await createOrGetUser(sessionId);
    
    await clearCart(userId);

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
