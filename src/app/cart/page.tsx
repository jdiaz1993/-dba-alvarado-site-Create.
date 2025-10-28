"use client";

import { useCart } from "../../context/CartContext";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, Suspense } from "react";

function formatUSD(cents: number): string {
	return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

function CartContent() {
	const { items, updateQuantity, removeItem, totalCents, clear, isLoading, isSaving, syncError } = useCart();
	const searchParams = useSearchParams();
	const [hasCleared, setHasCleared] = useState(false);
	const [rushShipping, setRushShipping] = useState(false);

	const status = useMemo(() => {
		if (searchParams.get("success")) return "success" as const;
		if (searchParams.get("canceled")) return "canceled" as const;
		return null;
	}, [searchParams]);

	useEffect(() => {
		if (status === "success" && !hasCleared && items.length > 0) {
			clear();
			setHasCleared(true);
		}
	}, [status, hasCleared, items.length, clear]);

	// Standard domestic shipping costs $3
	const standardShippingFee = 300; // $3.00 in cents
	// Rush shipping costs extra on top of standard
	const rushShippingFee = rushShipping ? 1500 : 0; // +$15 for rush shipping
	const shippingFee = standardShippingFee + rushShippingFee;
	const grandTotal = totalCents + shippingFee;

	async function onCheckout() {
		try {
		// Add shipping as line items
		const checkoutItems = [
			...items.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
		];
		
		// Always add standard shipping
		checkoutItems.push({
			id: 'standard-shipping',
			name: 'Standard Shipping (5-7 days)',
			price: standardShippingFee,
			quantity: 1
		});
		
		// Add rush shipping fee if selected
		if (rushShipping && rushShippingFee > 0) {
			checkoutItems.push({
				id: 'rush-shipping',
				name: 'Rush Shipping (2-3 days)',
				price: rushShippingFee,
				quantity: 1
			});
		}

			const res = await fetch("/api/checkout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ items: checkoutItems }),
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data?.error || "Checkout failed");
			if (data?.url) {
				window.location.href = data.url;
			}
		} catch (e) {
			alert(e instanceof Error ? e.message : "Checkout failed");
		}
	}

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<h1 className="text-4xl font-bold text-gray-900 mb-6">Your Cart</h1>

				{status && (
					<div className={`mb-6 rounded-md p-4 ${status === "success" ? "bg-green-50 border border-green-200 text-green-800" : "bg-yellow-50 border border-yellow-200 text-yellow-800"}`}>
						{status === "success" ? "Payment successful! Thank you for your order." : "Checkout canceled. Your items are still in the cart."}
					</div>
				)}

				{syncError && (
					<div className="mb-6 rounded-md p-4 bg-red-50 border border-red-200 text-red-800">
						{syncError}. Your cart changes may not be saved.
					</div>
				)}

				{isSaving && (
					<div className="mb-6 rounded-md p-4 bg-blue-50 border border-blue-200 text-blue-800">
						💾 Saving cart...
					</div>
				)}

				{isLoading ? (
					<div className="bg-white rounded-lg shadow p-8 text-center text-gray-600">Loading your cart...</div>
				) : items.length === 0 ? (
					<div className="bg-white rounded-lg shadow p-8 text-center text-gray-600">Your cart is empty.</div>
				) : (
					<div className="grid lg:grid-cols-3 gap-8">
						<div className="lg:col-span-2 space-y-4">
							{items.map(item => (
								<div key={item.id} className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
									<div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center text-gray-500">
										{item.imageUrl ? (
											// eslint-disable-next-line @next/next/no-img-element
											<img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover rounded" />
										) : (
											<span>No image</span>
										)}
									</div>
									<div className="flex-1">
										<h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
										<p className="text-gray-600">{formatUSD(item.price)}</p>
									</div>
									<div className="flex items-center gap-2">
										<button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 border rounded">-</button>
										<input
											value={item.quantity}
											onChange={(e) => updateQuantity(item.id, Number(e.target.value) || 1)}
											type="number"
											min={1}
											className="w-16 text-center border rounded py-1"
										/>
										<button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 border rounded">+</button>
									</div>
									<div className="w-24 text-right font-semibold">{formatUSD(item.price * item.quantity)}</div>
									<button onClick={() => removeItem(item.id)} className="text-red-600 hover:underline ml-4">Remove</button>
								</div>
							))}
						</div>

						<div className="bg-white rounded-lg shadow p-6 h-fit">
							<h2 className="text-2xl font-bold mb-4">Order Summary</h2>
							<div className="flex justify-between text-gray-700 mb-2">
								<span>Subtotal</span>
								<span>{formatUSD(totalCents)}</span>
							</div>
							
							{/* Shipping Selection */}
							<div className="my-4 pt-4 border-t">
								<p className="text-sm text-gray-600 mb-3">
									📦 Standard shipping: $3.00 (5-7 business days)
								</p>
								<label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
									<input
										type="checkbox"
										checked={rushShipping}
										onChange={() => setRushShipping(!rushShipping)}
										className="mr-3 w-5 h-5"
									/>
									<div className="flex-1 flex justify-between items-center">
										<div>
											<span className="font-medium">Rush Shipping</span>
											<p className="text-xs text-gray-500">2-3 business days</p>
										</div>
										<span className="text-gray-700 font-semibold">+$15.00</span>
									</div>
								</label>
							</div>

							<div className="flex justify-between text-gray-700 mb-2 pt-4 border-t">
								<span>Shipping</span>
								<span>{formatUSD(shippingFee)}</span>
							</div>
							<div className="flex justify-between text-gray-700 mb-2">
								<span>Estimated Tax</span>
								<span>Calculated at checkout</span>
							</div>
							<div className="flex justify-between text-xl font-bold text-gray-900 mb-6 pt-4 border-t">
								<span>Total</span>
								<span>{formatUSD(grandTotal)}</span>
							</div>
							<div className="space-y-3">
								<button onClick={onCheckout} className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 font-semibold">Checkout</button>
								<button onClick={clear} className="w-full border border-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-50">Clear Cart</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default function CartPage() {
	return (
		<Suspense fallback={<div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">Loading...</div>}>
			<CartContent />
		</Suspense>
	);
}
