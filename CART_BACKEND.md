# Cart Backend System

This document describes the cart backend system implemented for the DBA Personalizations application.

## Overview

The cart backend provides persistent storage for user shopping carts using SQLite database. It includes:

- User session management
- Cart persistence across browser sessions
- Real-time cart synchronization
- Error handling and loading states

## Architecture

### Database Schema

The system uses SQLite with two main tables:

#### Users Table
```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  session_id TEXT UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### Carts Table
```sql
CREATE TABLE carts (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  items TEXT NOT NULL,  -- JSON string of cart items
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### API Endpoints

#### GET /api/cart
Retrieves the current user's cart.

**Response:**
```json
{
  "success": true,
  "cart": {
    "id": "cart_123",
    "userId": "user_456",
    "items": [
      {
        "id": "tshirt-basic",
        "name": "Custom T-Shirts",
        "price": 1599,
        "quantity": 2,
        "imageUrl": "optional-image-url"
      }
    ],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST /api/cart
Saves the current user's cart.

**Request Body:**
```json
{
  "items": [
    {
      "id": "tshirt-basic",
      "name": "Custom T-Shirts",
      "price": 1599,
      "quantity": 2,
      "imageUrl": "optional-image-url"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "cart": {
    "id": "cart_123",
    "userId": "user_456",
    "items": [...],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### DELETE /api/cart
Clears the current user's cart.

**Response:**
```json
{
  "success": true,
  "message": "Cart cleared successfully"
}
```

## Session Management

The system uses HTTP cookies for session management:

- Session IDs are stored in `session_id` cookie
- Cookies are HTTP-only for security
- 30-day expiration for persistent carts
- Automatic session creation for new users

## Frontend Integration

### CartContext Updates

The `CartContext` has been enhanced with:

- `isLoading`: Boolean indicating if cart is being loaded
- `syncError`: String containing any synchronization errors
- Automatic cart loading on component mount
- Automatic cart saving on item changes
- Error handling and user feedback

### Usage Example

```tsx
import { useCart } from '../context/CartContext';

function MyComponent() {
  const { items, addItem, isLoading, syncError } = useCart();

  if (isLoading) {
    return <div>Loading cart...</div>;
  }

  if (syncError) {
    return <div>Error: {syncError}</div>;
  }

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
      <button onClick={() => addItem({ id: 'product-1', name: 'Product', price: 1000 })}>
        Add Product
      </button>
    </div>
  );
}
```

## Error Handling

The system includes comprehensive error handling:

- Database connection errors
- Invalid cart data validation
- Network request failures
- User feedback for all error states

## File Structure

```
src/
├── lib/
│   └── database.ts          # Database connection and operations
├── app/
│   └── api/
│       └── cart/
│           └── route.ts     # Cart API endpoints
├── context/
│   └── CartContext.tsx      # Enhanced cart context
└── data/
    └── cart.db              # SQLite database (gitignored)
```

## Security Considerations

- HTTP-only cookies prevent XSS attacks
- Session validation on all requests
- Input validation for all cart operations
- SQL injection prevention through parameterized queries

## Future Enhancements

Potential improvements for the cart system:

1. **User Authentication**: Integrate with proper user accounts
2. **Cart Sharing**: Allow users to share cart links
3. **Cart Analytics**: Track cart abandonment and conversion
4. **Multiple Carts**: Support for wishlists and saved carts
5. **Cart Expiration**: Automatic cleanup of old carts
6. **Database Migration**: Move to PostgreSQL for production

## Testing

To test the cart backend:

1. Start the development server: `npm run dev`
2. Navigate to `/products` and add items to cart
3. Check `/cart` to verify items persist
4. Close browser and reopen to test session persistence
5. Test error states by stopping the server temporarily

## Environment Variables

No additional environment variables are required for the cart backend. The system uses:

- `NODE_ENV`: Automatically set by Next.js
- Database file: Created automatically in `data/cart.db`
