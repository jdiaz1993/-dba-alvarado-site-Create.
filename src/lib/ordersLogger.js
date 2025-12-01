import fs from 'fs';
import path from 'path';

const ORDERS_FILE = path.join(process.cwd(), 'data', 'orders.json');

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Read all orders
export function getAllOrders() {
  try {
    ensureDataDir();
    if (!fs.existsSync(ORDERS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(ORDERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading orders:', error);
    return [];
  }
}

// Save an order
export function saveOrder(order) {
  try {
    ensureDataDir();
    const orders = getAllOrders();
    orders.push(order);
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
    console.log('✅ Order saved to file:', order.orderNumber);
  } catch (error) {
    console.error('❌ Error saving order:', error);
    throw error;
  }
}

// Get orders by status
export function getOrdersByStatus(status) {
  const orders = getAllOrders();
  return orders.filter(order => order.status === status);
}

// Update order status
export function updateOrderStatus(orderNumber, status) {
  try {
    const orders = getAllOrders();
    const updated = orders.map(order => 
      order.orderNumber === orderNumber 
        ? { ...order, status }
        : order
    );
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(updated, null, 2));
    console.log(`✅ Order ${orderNumber} status updated to ${status}`);
  } catch (error) {
    console.error('❌ Error updating order status:', error);
    throw error;
  }
}
