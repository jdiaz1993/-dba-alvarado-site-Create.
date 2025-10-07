export type SavedOrder = {
	id: string;
	createdAt: number;
	customerEmail?: string;
	totalCents?: number;
	stripeSessionId: string;
	metadata?: Record<string, unknown>;
};

const orders: SavedOrder[] = [];

export function addOrder(order: SavedOrder) {
	orders.unshift(order);
}

export function listOrders(): SavedOrder[] {
	return orders;
}
