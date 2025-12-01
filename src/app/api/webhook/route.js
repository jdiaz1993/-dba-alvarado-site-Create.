import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { addOrder } from "../../../lib/ordersStore";

// Optional: set your endpoint secret here or via env var
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
	const sig = (await headers()).get("stripe-signature");
	if (!webhookSecret) {
		return NextResponse.json({ error: "Webhook not configured" }, { status: 501 });
	}
	if (!sig) {
		return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
	}

	const buf = await request.text();
	try {
		const Stripe = (await import("stripe")).default;
		const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
		const event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);

		if (event.type === "checkout.session.completed") {
			const session = event.data.object;
			addOrder({
				id: session.id,
				stripeSessionId: session.id,
				createdAt: Date.now(),
				customerEmail: session.customer_details?.email || undefined,
				totalCents: session.amount_total ?? undefined,
				metadata: session.metadata ?? undefined,
			});
		}

		return NextResponse.json({ received: true });
	} catch (err) {
		const message = err instanceof Error ? err.message : "Webhook error";
		return NextResponse.json({ error: message }, { status: 400 });
	}
}
