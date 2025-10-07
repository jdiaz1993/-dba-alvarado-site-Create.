import { NextResponse } from "next/server";

export async function GET() {
	return NextResponse.json({ error: "Not Implemented. Use POST to create a Stripe Checkout session." }, { status: 501 });
}

type CheckoutItem = {
	id: string;
	name: string;
	price: number; // cents
	quantity: number;
};

export async function POST(request: Request) {
	const secretKey = process.env.STRIPE_SECRET_KEY;
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
	if (!secretKey) {
		return NextResponse.json({ error: "Stripe not configured. Set STRIPE_SECRET_KEY." }, { status: 501 });
	}

	let items: CheckoutItem[] = [];
	try {
		const body = await request.json();
		items = Array.isArray(body?.items) ? body.items : [];
	} catch {
		return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
	}

	if (items.length === 0) {
		return NextResponse.json({ error: "No items provided" }, { status: 400 });
	}

	// Lazy import to avoid requiring Stripe when not configured at build time
	const Stripe = (await import("stripe")).default;
	const stripe = new Stripe(secretKey);

	try {
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
			success_url: `${siteUrl}/success`,
			cancel_url: `${siteUrl}/cart?canceled=1`,
		});

		return NextResponse.json({ url: session.url }, { status: 200 });
	} catch (err: unknown) {
		const message = err instanceof Error ? err.message : "Unknown error creating session";
		return NextResponse.json({ error: message }, { status: 500 });
	}
}
