import { NextResponse } from "next/server";
import { saveOrder } from "../../../lib/ordersLogger";

export async function GET() {
	return NextResponse.json({ error: "Not Implemented. Use POST to create a Stripe Checkout session." }, { status: 501 });
}

export async function POST(request) {
	const secretKey = process.env.STRIPE_SECRET_KEY;
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
	if (!secretKey) {
		return NextResponse.json({ error: "Stripe not configured. Set STRIPE_SECRET_KEY." }, { status: 501 });
	}

	let items = [];
	let fullOrderData = null;
	try {
		const body = await request.json();
		items = Array.isArray(body?.items) ? body.items : [];
		fullOrderData = body?.fullOrderData || null;
	} catch {
		return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
	}

	if (items.length === 0) {
		return NextResponse.json({ error: "No items provided" }, { status: 400 });
	}

	// Save full order data to backend before creating Stripe session
	// This ensures we have all details even if Stripe webhook fails
	let orderId = undefined;
	if (fullOrderData && fullOrderData.length > 0) {
		try {
			orderId = `ORD-${Date.now()}`;
			const order = {
				orderNumber: orderId,
				timestamp: new Date().toISOString(),
				status: 'pending_payment',
				items: fullOrderData,
				total: fullOrderData.reduce((sum, item) => sum + (item.price * item.quantity), 0)
			};
			saveOrder(order);
			console.log('📦 Order saved before checkout:', orderId);
		} catch (error) {
			console.error('Error saving order before checkout:', error);
		}
	}

	// Lazy import to avoid requiring Stripe when not configured at build time
	const Stripe = (await import("stripe")).default;
	const stripe = new Stripe(secretKey);

	try {
		// Create Stripe session with metadata containing order reference
		const session = await stripe.checkout.sessions.create({
			mode: "payment",
			payment_method_types: ["card"],
			line_items: items.map((it) => ({
				price_data: {
					currency: "usd",
					product_data: { name: it.name },
					unit_amount: it.price,
				},
				quantity: it.quantity,
			})),
			success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${siteUrl}/cart?canceled=1`,
			metadata: {
				orderId: fullOrderData ? `ORD-${Date.now()}` : undefined,
				hasFullData: fullOrderData ? 'true' : 'false'
			}
		});

		return NextResponse.json({ url: session.url }, { status: 200 });
	} catch (err) {
		const message = err instanceof Error ? err.message : "Unknown error creating session";
		return NextResponse.json({ error: message }, { status: 500 });
	}
}
