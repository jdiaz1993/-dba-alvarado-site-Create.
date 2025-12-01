const orders = [];

export function addOrder(order) {
	orders.unshift(order);
}

export function listOrders() {
	return orders;
}
