import sqlite3 from 'sqlite3';
import { promisify } from 'util';
import path from 'path';

// Create database connection
const dbPath = path.join(process.cwd(), 'data', 'cart.db');
const db = new sqlite3.Database(dbPath);

// Promisify database methods
const dbRun = promisify(db.run.bind(db));
const dbGet = promisify(db.get.bind(db));
const dbAll = promisify(db.all.bind(db));

// Initialize database tables
export async function initDatabase() {
  try {
    // Create carts table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS carts (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        items TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create users table for session management
    await dbRun(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        session_id TEXT UNIQUE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
}

// Cart operations
export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
}

export interface Cart {
  id: string;
  userId?: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

// Generate unique cart ID
function generateCartId(): string {
  return `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Generate unique user ID
function generateUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Create or get user by session ID
export async function createOrGetUser(sessionId: string): Promise<string> {
  try {
    // Check if user exists
    const existingUser = await dbGet('SELECT id FROM users WHERE session_id = ?', [sessionId]);
    
    if (existingUser) {
      return existingUser.id;
    }

    // Create new user
    const userId = generateUserId();
    await dbRun('INSERT INTO users (id, session_id) VALUES (?, ?)', [userId, sessionId]);
    return userId;
  } catch (error) {
    console.error('Error creating/getting user:', error);
    throw error;
  }
}

// Get cart by user ID
export async function getCartByUserId(userId: string): Promise<Cart | null> {
  try {
    const row = await dbGet('SELECT * FROM carts WHERE user_id = ? ORDER BY updated_at DESC LIMIT 1', [userId]);
    
    if (!row) {
      return null;
    }

    return {
      id: row.id,
      userId: row.user_id,
      items: JSON.parse(row.items),
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  } catch (error) {
    console.error('Error getting cart:', error);
    throw error;
  }
}

// Save cart
export async function saveCart(userId: string, items: CartItem[]): Promise<Cart> {
  try {
    // Check if cart exists
    const existingCart = await getCartByUserId(userId);
    
    if (existingCart) {
      // Update existing cart
      await dbRun(
        'UPDATE carts SET items = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [JSON.stringify(items), existingCart.id]
      );
      
      return {
        ...existingCart,
        items,
        updatedAt: new Date().toISOString()
      };
    } else {
      // Create new cart
      const cartId = generateCartId();
      await dbRun(
        'INSERT INTO carts (id, user_id, items) VALUES (?, ?, ?)',
        [cartId, userId, JSON.stringify(items)]
      );
      
      return {
        id: cartId,
        userId,
        items,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }
  } catch (error) {
    console.error('Error saving cart:', error);
    throw error;
  }
}

// Clear cart
export async function clearCart(userId: string): Promise<void> {
  try {
    await dbRun('DELETE FROM carts WHERE user_id = ?', [userId]);
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
}

// Clean up old carts (optional - for maintenance)
export async function cleanupOldCarts(daysOld: number = 30): Promise<void> {
  try {
    await dbRun(
      'DELETE FROM carts WHERE updated_at < datetime("now", "-" || ? || " days")',
      [daysOld]
    );
  } catch (error) {
    console.error('Error cleaning up old carts:', error);
    throw error;
  }
}

export { db };
