import { NextResponse } from "next/server";
import { getAllOrders } from "../../../lib/ordersLogger";

export async function GET() {
	try {
		const orders = getAllOrders();
		return NextResponse.json(orders);
	} catch (error) {
		console.error('Error fetching orders:', error);
		return NextResponse.json(
			[],
			{ status: 500 }
		);
	}
}
