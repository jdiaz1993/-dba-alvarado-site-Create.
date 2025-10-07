"use client";

import { useEffect, useState } from "react";
import type { SavedOrder } from "../../lib/ordersStore";

export default function OrdersPage() {
	const [orders, setOrders] = useState<SavedOrder[]>([]);

	useEffect(() => {
		async function load() {
			try {
				const res = await fetch("/api/orders");
				const data = await res.json();
				if (Array.isArray(data)) setOrders(data);
			} catch {
				// ignore
			}
		}
		load();
	}, []);

	return (
		<div className="min-h-screen bg-gray-50 py-10">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-6">Recent Orders (in-memory)</h1>
				<div className="space-y-4">
					{orders.length === 0 && (
						<div className="bg-white rounded-lg shadow p-6 text-gray-600">No orders yet.</div>
					)}
					{orders.map((o) => (
						<div key={o.id} className="bg-white rounded-lg shadow p-6">
							<div className="flex justify-between">
								<div>
									<div className="font-semibold">{o.customerEmail || "Unknown customer"}</div>
									<div className="text-gray-600 text-sm">{new Date(o.createdAt).toLocaleString()}</div>
								</div>
								<div className="font-semibold">{o.totalCents ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(o.totalCents / 100) : "-"}</div>
							</div>
							<div className="text-gray-500 text-sm mt-2">Session: {o.stripeSessionId}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
