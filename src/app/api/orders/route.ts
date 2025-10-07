import { listOrders } from "../../../lib/ordersStore";
import { NextResponse } from "next/server";

export async function GET() {
	return NextResponse.json(listOrders());
}
