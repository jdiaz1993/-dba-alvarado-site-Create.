import { NextResponse } from "next/server";
import { getAllOrders } from "../../../lib/ordersLogger";

export async function GET() {
	try {
		const orders = getAllOrders();
		return NextResponse.json({
			success: true,
			orders: orders,
			count: orders.length
		});
	} catch (error) {
		console.error('Error fetching orders:', error);
		return NextResponse.json(
			{ success: false, error: 'Failed to fetch orders' },
			{ status: 500 }
		);
	}
}
